# Sistema de Gerenciamento - React Native

Um sistema fictício completo com autenticação, navegação estruturada e gerenciamento de dados em tempo real, desenvolvido com React Native e Expo Router.

## 🎯 Funcionalidades

### 1. **Autenticação**
- Tela de login com validação de credenciais
- Gerenciamento de sessão com React Context
- Dados armazenados localmente na aplicação

### 2. **Menu Principal**
- Bem-vindo personalizado ao usuário
- Dashboard com estatísticas (total de registros, registros ativos)
- Atalhos para as principais operações do sistema

### 3. **Gerenciamento de Dados**
- ✅ **Listar**: Visualizar todos os registros com filtros por status
- ➕ **Cadastrar**: Adicionar novos registros com validação
- ✏️ **Editar**: Atualizar dados existentes
- 🗑️ **Deletar**: Remover registros com confirmação

### 4. **Interface Intuitiva**
- Design responsivo e moderno
- Feedback visual em todas as ações
- Alertas de confirmação para operações críticas

## 🚀 Como Usar

### Credenciais de Teste
```
Email: teste@email.com
Senha: 1234
```

Ou use qualquer combinação onde:
- Email: conter "@" (válido)
- Senha: mínimo 4 caracteres

### Fluxo do Sistema

1. **Tela de Login**
   - Insira email e senha
   - Clique em "Entrar"

2. **Menu Principal**
   - Visualize estatísticas
   - Escolha uma opção do menu

3. **Listar Registros**
   - Visualize todos os dados
   - Use filtros por status (Ativo/Inativo)
   - Clique em "Editar" ou "Deletar" para gerenciar

4. **Cadastrar/Editar**
   - Preencha o formulário
   - Valide os dados
   - Clique em "Criar Registro" ou "Atualizar"

5. **Sair**
   - Clique em "Sair" no menu para fazer logout

## 📊 Estrutura de Dados

Cada registro contém:
```javascript
{
  id: string,           // ID único (timestamp)
  name: string,         // Nome completo
  email: string,        // Email do usuário
  phone: string,        // Telefone
  status: "Ativo" | "Inativo"  // Status
}
```

## 🏗️ Arquitetura

### Estrutura de Pastas
```
app/
├── _layout.tsx                 # Layout raiz com navegação condicional
├── context/
│   ├── authContext.tsx         # Contexto de autenticação
│   └── dataContext.tsx         # Contexto de dados
├── (auth)/
│   ├── _layout.tsx             # Layout das telas de autenticação
│   └── login.tsx               # Tela de login
└── (app)/
    ├── _layout.tsx             # Layout das telas autenticadas
    ├── index.tsx               # Tela de menu
    ├── list.tsx                # Tela de listagem
    └── form.tsx                # Tela de formulário
```

### Contextos Utilizados

**AuthContext**
- Gerencia autenticação
- Armazena dados do usuário
- Funções: login, logout

**DataContext**
- Gerencia dados em memória
- CRUD completo (Create, Read, Update, Delete)
- Estado compartilhado entre telas

## 📱 Telas Principais

### 1. Login
- Validação de email e senha
- Feedback de erros
- Credenciais de teste disponíveis

### 2. Menu
- Boas-vindas personalizadas
- Estatísticas do sistema
- 4 opções principais com descrições

### 3. Listar
- Listagem com cards interativas
- Filtros por status
- Ações inline (editar/deletar)

### 4. Formulário
- Modo criação e edição
- Validação de campos obrigatórios
- Feedback de sucesso

## 🔄 Navegação

- **Autenticado**: Navega para (app) com Stack Navigator
- **Não Autenticado**: Navega para (auth) com Stack Navigator
- **Transições**: Animadas entre telas
- **Parâmetros**: Passagem de dados via route params

## 💾 Armazenamento de Dados

Os dados são armazenados no **Estado React (Context)** e são perdidos ao recarregar a aplicação. Na atividade final, serão conectados a uma API Node.js com banco de dados real.

## 🎨 Temas e Cores

- **Primária**: #0A7EA4 (Azul)
- **Secundária**: #4CAF50 (Verde)
- **Aviso**: #FF9800 (Laranja)
- **Erro**: #f44336 (Vermelho)
- **Background**: #E6F4FE (Azul claro)

## 🔐 Segurança (Fictícia)

- Validação básica de credenciais
- Logout limpa todas as sessões
- Confirmação para ações destrutivas
- Sem dados sensíveis armazenados

## 📝 Próximos Passos

Para a atividade final, integrar:
- API Node.js com Express
- Banco de dados (MongoDB, PostgreSQL, etc)
- Autenticação JWT
- Requisições HTTP (fetch/axios)

## 🛠️ Tecnologias Utilizadas

- React Native 0.81
- Expo Router 6.0
- React Context API
- TypeScript
- Expo 54

---

**Desenvolvido para fins educacionais** 📚
