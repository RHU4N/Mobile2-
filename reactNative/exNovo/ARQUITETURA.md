# 🏗️ Arquitetura do Sistema

## 📱 Estrutura do Projeto

```
exNovo/
│
├── app/
│   ├── _layout.tsx                    # Root layout com navegação condicional
│   ├── context/
│   │   ├── authContext.tsx            # Gerencia autenticação
│   │   └── dataContext.tsx            # Gerencia dados
│   │
│   ├── (auth)/                        # Telas NÃO autenticadas
│   │   ├── _layout.tsx
│   │   └── login.tsx                  # 🔐 Tela de Login
│   │
│   └── (app)/                         # Telas autenticadas
│       ├── _layout.tsx
│       ├── index.tsx                  # 🏠 Menu Principal
│       ├── list.tsx                   # 📋 Listagem de Dados
│       └── form.tsx                   # 📝 Formulário (Criar/Editar)
│
├── assets/
│   └── images/
│
├── SISTEMA.md                         # 📖 Documentação completa
├── TESTES.md                          # 🧪 Guia de testes
├── API_INTEGRACAO.md                  # 🔌 Guia de integração com API
└── package.json                       # 📦 Dependências
```

---

## 🔄 Fluxo de Navegação

```
┌─────────────────────────────────────────────────────────┐
│              APP ROOT (_layout.tsx)                      │
│           Providers: Auth + Data Contexts                │
└──────────────┬──────────────────────────────────────────┘
               │
               ├─────────────────────────────────────────┐
               │                                         │
        ┌──────▼──────┐                           ┌─────▼──────┐
        │ isSignedIn? │                           │             │
        │   false     │                           │    true     │
        └──────┬──────┘                           └─────┬──────┘
               │                                        │
        ┌──────▼────────┐                      ┌────────▼──────┐
        │  (auth) Route │                      │ (app) Route   │
        ├───────────────┤                      ├───────────────┤
        │  ├─ login.tsx │ ◄────────────────┐   │ ├─ index.tsx  │
        │  │             │   [logout]      │   │ │ [menu]      │
        │  └─────────────┘                 │   │ │             │
        │                                   │   │ ├─ list.tsx   │
        │                                   │   │ │ [listar]    │
        │                                   │   │ │             │
        │                                   │   │ ├─ form.tsx   │
        │                                   │   │ │ [criar/edit]│
        │                                   │   │ └─────────────┘
        └────────────────────────────────────┘
```

---

## 🧠 Contextos e Hooks

### AuthContext
```typescript
┌─────────────────────────────────────┐
│      AuthContext Provider            │
├─────────────────────────────────────┤
│ State:                               │
│ • isSignedIn: boolean                │
│ • user: { email, name }              │
│                                      │
│ Functions:                           │
│ • login(email, password): void       │
│ • logout(): void                     │
│                                      │
│ Hook: useAuth()                      │
│ Uso: em qualquer componente dentro   │
│      do provider                     │
└─────────────────────────────────────┘
```

### DataContext
```typescript
┌──────────────────────────────────────┐
│      DataContext Provider             │
├──────────────────────────────────────┤
│ State:                                │
│ • items: DataItem[]                   │
│                                       │
│ Functions:                            │
│ • addItem(item): void                 │
│ • updateItem(id, item): void          │
│ • deleteItem(id): void                │
│ • getItem(id): DataItem | undefined   │
│                                       │
│ Hook: useData()                       │
│ Uso: em qualquer componente dentro    │
│      do provider                      │
└──────────────────────────────────────┘
```

---

## 📊 Modelo de Dados

### DataItem
```typescript
interface DataItem {
  id: string;              // Identificador único
  name: string;            // Nome da pessoa
  email: string;           // Email da pessoa
  phone: string;           // Telefone da pessoa
  status: "Ativo" | "Inativo";  // Status do registro
}
```

### User (Autenticação)
```typescript
interface User {
  email: string;           // Email do usuário
  name: string;            // Nome extraído do email
}
```

---

## 🔐 Fluxo de Autenticação

```
┌──────────────────────────────────────────────────────────┐
│                    LOGIN SCREEN                          │
│  Input: email, password                                  │
└────┬─────────────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────────────────┐
│         VALIDAÇÃO (Client-side)                          │
│ • Email contém @?                                        │
│ • Senha tem mínimo 4 caracteres?                         │
└────┬─────────────────────────────────────────────────────┘
     │
     ├─ Inválido ─► Alert com erro ─► Volta para login
     │
     └─ Válido ─┐
               │
               ▼
┌──────────────────────────────────────────────────────────┐
│         ATUALIZAR AUTH CONTEXT                           │
│ • setUser({ email, name })                              │
│ • setIsSignedIn(true)                                    │
└────┬─────────────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────────────────┐
│         NAVEGAÇÃO AUTOMÁTICA                             │
│ Root Layout detecta isSignedIn = true                    │
│ Renderiza (app) ao invés de (auth)                      │
└────┬─────────────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────────────────┐
│              MENU PRINCIPAL                              │
│  Usuário autenticado e pronto para usar o sistema        │
└──────────────────────────────────────────────────────────┘
```

---

## 📋 Fluxo de CRUD

### CREATE (Cadastrar)
```
Form Screen ──► Validação ──► DataContext.addItem()
   ↓                              ↓
Preenchimento           Items atualizado em memória
de campos                         ↓
                          Retorna para List Screen
                                  ↓
                          Novo item aparece na lista
```

### READ (Listar)
```
List Screen ──► useData() ──► items do context
   ↓                              ↓
Renderiza       FlatList mostra
lista de         todos os items
items            com filtros
```

### UPDATE (Editar)
```
List Screen (clica Editar)
   ↓
Form Screen (modo edit)
   ↓
Preenchimento do formulário
   ↓
Validação
   ↓
DataContext.updateItem(id, item)
   ↓
Items atualizado em memória
   ↓
Volta para List Screen
   ↓
Alterações aparecem na lista
```

### DELETE (Deletar)
```
List Screen (clica Deletar)
   ↓
Alert de confirmação
   ├─ Cancelar ──► Volta para List (nada acontece)
   │
   └─ Confirmar ──► DataContext.deleteItem(id)
                      ↓
                   Item removido da memória
                      ↓
                   List atualizada automaticamente
```

---

## 🎨 Estrutura de Componentes

```
App Root
│
├── AuthProvider
│   └── DataProvider
│       └── RootLayoutNav
│           ├── (auth) Navigation
│           │   └── LoginScreen
│           │
│           └── (app) Navigation
│               ├── MenuScreen
│               │   ├── Stats Boxes
│               │   └── Menu Items (Links)
│               │
│               ├── ListScreen
│               │   ├── Filter Buttons
│               │   └── FlatList
│               │       └── Item Cards
│               │           ├── Item Header
│               │           ├── Item Details
│               │           └── Action Buttons
│               │
│               └── FormScreen
│                   ├── TextInputs (4x)
│                   ├── Picker (Status)
│                   └── Buttons (Salvar/Cancelar)
```

---

## 💾 Estado da Aplicação

```
Global State (Contexts)
│
├── Auth State
│   ├── isSignedIn: boolean
│   ├── user: User | null
│   └── Functions: login, logout
│
└── Data State
    ├── items: DataItem[]
    └── Functions: add, update, delete, get

Local State (Component Level)
│
├── LoginScreen
│   ├── email: string
│   └── password: string
│
├── FormScreen
│   └── formData: { name, email, phone, status }
│
└── ListScreen
    └── selectedFilters: string[]
```

---

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────┐
│           Usuário Interagi (tap, input)                 │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────┐
│         Component Local State Atualiza                   │
│      (Ex: setFormData, setEmail, etc)                    │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────┐
│    Usuário Dispara Ação (tap em botão)                   │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────┐
│     Chamada do Contexto (useAuth ou useData)            │
│    Ex: addItem, updateItem, login, logout               │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────┐
│       Estado Global Atualiza                             │
│   (Context state muda e re-renderiza)                    │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────┐
│       Components Assinantes Re-Renderizam                │
│   (useAuth, useData causam re-render)                    │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────┐
│         UI Atualiza com Novos Dados                      │
└──────────────────────────────────────────────────────────┘
```

---

## 🎯 Pontos Chave da Arquitetura

### ✅ Vantagens
- **Context API**: Gerenciamento de estado simples e nativo
- **Expo Router**: Navegação baseada em arquivo
- **Separação**: Auth e Data em contextos separados
- **Type-Safe**: Totalmente tipado com TypeScript
- **Escalável**: Fácil adicionar novas rotas e funcionalidades
- **Dados em Memória**: Simples de testar sem backend

### 🔄 Próximos Passos
- Integração com API Node.js
- Persistência em banco de dados
- Autenticação JWT
- Sincronização com servidor

---

## 📐 Diagrama de Classes (Context)

```
AuthContext
├── State
│   ├── isSignedIn: boolean
│   ├── user: User | null
│   └── functions
│
├── Methods
│   ├── login(email, password)
│   └── logout()
│
└── Hook
    └── useAuth()

DataContext
├── State
│   ├── items: DataItem[]
│   └── functions
│
├── Methods
│   ├── addItem(item)
│   ├── updateItem(id, item)
│   ├── deleteItem(id)
│   └── getItem(id)
│
└── Hook
    └── useData()
```

---

## 📚 Referências de Implementação

- **Contextos**: `app/context/authContext.tsx`, `app/context/dataContext.tsx`
- **Telas**: `app/(app)/index.tsx`, `app/(app)/list.tsx`, `app/(app)/form.tsx`
- **Navegação**: `app/_layout.tsx`, `app/(auth)/_layout.tsx`, `app/(app)/_layout.tsx`
- **Documentação**: `SISTEMA.md`, `TESTES.md`, `API_INTEGRACAO.md`

