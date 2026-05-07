# Integração com API Node.js - Guia para Próximas Atividades

Este documento mostra como o sistema será adaptado para usar uma API Node.js real na atividade final.

## 🔄 Fluxo Atual vs Futuro

### Arquitetura Atual (Em Memória)
```
React Native App
    ↓
Context API (Estado Local)
    ↓
Dados em Memória
```

### Arquitetura Futura (Com API)
```
React Native App
    ↓
Context API + Custom Hooks
    ↓
HTTP Requests (Axios/Fetch)
    ↓
Node.js API (Express)
    ↓
Banco de Dados (MongoDB/PostgreSQL)
```

---

## 📝 Mudanças Necessárias

### 1. Criar Hook customizado para API

Arquivo: `app/hooks/useApi.ts`

```typescript
import { useState, useCallback } from 'react';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = 'http://seu-servidor:3000/api'; // Configurar URL da API

  const request = useCallback(async <T,>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any,
    token?: string
  ): Promise<ApiResponse<T>> => {
    try {
      setLoading(true);
      setError(null);

      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: data ? JSON.stringify(data) : undefined,
      };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
}
```

---

### 2. Atualizar AuthContext para usar API

Arquivo: `app/context/authContext.tsx` (versão com API)

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '@/app/hooks/useApi';

interface AuthContextType {
  isSignedIn: boolean;
  user: { email: string; name: string; id: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string; id: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { request } = useApi();

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await request('POST', '/auth/login', { email, password });
      
      if (response.success && response.data) {
        const { user: userData, token: authToken } = response.data;
        setUser(userData);
        setToken(authToken);
        setIsSignedIn(true);
      } else {
        throw new Error(response.error || 'Erro ao fazer login');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

---

### 3. Atualizar DataContext para usar API

Arquivo: `app/context/dataContext.tsx` (versão com API)

```typescript
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useApi } from '@/app/hooks/useApi';
import { useAuth } from '@/app/context/authContext';

export interface DataItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
}

interface DataContextType {
  items: DataItem[];
  loading: boolean;
  addItem: (item: Omit<DataItem, 'id'>) => Promise<void>;
  updateItem: (id: string, item: Omit<DataItem, 'id'>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  getItem: (id: string) => DataItem | undefined;
  fetchItems: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { request } = useApi();
  const { token } = useAuth();

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await request('GET', '/items', undefined, token);
      
      if (response.success && response.data) {
        setItems(response.data);
      }
    } catch (err) {
      console.error('Erro ao buscar itens:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchItems();
    }
  }, [token]);

  const addItem = async (item: Omit<DataItem, 'id'>) => {
    try {
      const response = await request('POST', '/items', item, token);
      
      if (response.success) {
        await fetchItems();
      } else {
        throw new Error(response.error || 'Erro ao criar item');
      }
    } catch (err) {
      throw err;
    }
  };

  const updateItem = async (id: string, item: Omit<DataItem, 'id'>) => {
    try {
      const response = await request('PUT', `/items/${id}`, item, token);
      
      if (response.success) {
        await fetchItems();
      } else {
        throw new Error(response.error || 'Erro ao atualizar item');
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const response = await request('DELETE', `/items/${id}`, undefined, token);
      
      if (response.success) {
        await fetchItems();
      } else {
        throw new Error(response.error || 'Erro ao deletar item');
      }
    } catch (err) {
      throw err;
    }
  };

  const getItem = (id: string) => {
    return items.find(item => item.id === id);
  };

  return (
    <DataContext.Provider value={{
      items,
      loading,
      addItem,
      updateItem,
      deleteItem,
      getItem,
      fetchItems,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
```

---

## 🛠️ API Node.js - Exemplo de Endpoints

### Estrutura recomendada:

```javascript
// server.js - Express
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ============ AUTH ROUTES ============
app.post('/api/auth/login', async (req, res) => {
  // Validar credenciais
  // Gerar JWT token
  // Retornar user + token
});

app.post('/api/auth/logout', (req, res) => {
  // Invalidar token
});

// ============ ITEMS ROUTES ============
app.get('/api/items', authenticateToken, async (req, res) => {
  // Retornar todos os items do usuário
});

app.get('/api/items/:id', authenticateToken, async (req, res) => {
  // Retornar item específico
});

app.post('/api/items', authenticateToken, async (req, res) => {
  // Criar novo item
  // req.body: { name, email, phone, status }
});

app.put('/api/items/:id', authenticateToken, async (req, res) => {
  // Atualizar item
});

app.delete('/api/items/:id', authenticateToken, async (req, res) => {
  // Deletar item
});

// Middleware de autenticação
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

---

## 📦 Pacotes Necessários

### React Native
```bash
npm install axios  # OU usar fetch (nativo)
# Fetch é nativo e recomendado, mas axios é mais simples
```

### Node.js
```bash
npm install express cors dotenv jsonwebtoken
npm install -D nodemon
```

### Banco de Dados
```bash
# MongoDB
npm install mongoose

# OU PostgreSQL
npm install pg sequelize
```

---

## 🔑 Variáveis de Ambiente

### `.env` (Node.js)
```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/gerenciamento
ACCESS_TOKEN_SECRET=sua_chave_secreta_aqui
```

### Configuração (React Native)
```typescript
// app/config/api.ts
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000,
};
```

---

## 🧪 Teste de Integração

### Fluxo de Login com API
```
1. App envia POST /api/auth/login { email, password }
2. API valida credenciais no banco
3. API gera JWT token
4. API retorna { user: {...}, token: "jwt..." }
5. App armazena token no Context
6. App usa token para requisições futuras
```

### Fluxo de CRUD com API
```
1. App envia GET /api/items (com token no header)
2. API busca items do usuário no banco
3. API retorna array de items
4. App atualiza estado com items
5. UI renderiza items da API
```

---

## 🔒 Segurança

- ✅ JWT token no header Authorization
- ✅ Validação no backend de todas as requisições
- ✅ Usuário só vê seus próprios dados
- ✅ Senha nunca é retornada para o frontend
- ✅ HTTPS em produção

---

## 📊 Modelo de Dados Sugerido

### User (MongoDB)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Item (MongoDB)
```javascript
{
  _id: ObjectId,
  userId: ObjectId (referência a User),
  name: String,
  email: String,
  phone: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Checklist para Integração

- [ ] Criar Hook `useApi`
- [ ] Implementar autenticação com JWT
- [ ] Criar endpoints no Node.js
- [ ] Conectar banco de dados
- [ ] Testar login com API
- [ ] Testar listar items
- [ ] Testar criar item
- [ ] Testar editar item
- [ ] Testar deletar item
- [ ] Tratamento de erros
- [ ] Loading states
- [ ] Refresh token (opcional)

---

## 📚 Recursos Úteis

- [Expo Fetch API](https://docs.expo.dev/versions/latest/sdk/fetch/)
- [Express.js](https://expressjs.com/)
- [JWT.io](https://jwt.io/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Native Networking](https://reactnative.dev/docs/network)

