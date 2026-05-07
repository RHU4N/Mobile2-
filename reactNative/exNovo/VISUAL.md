# 🌳 ESTRUTURA VISUAL COMPLETA DO PROJETO

## 📂 Hierarquia de Arquivos

```
exNovo/
│
├── 📦 RAIZ
│   ├── package.json              (Dependências)
│   ├── app.json                  (Config Expo)
│   ├── tsconfig.json             (TypeScript)
│   ├── eslint.config.js          (Linting)
│   └── .gitignore               (Git)
│
├── 🔐 app/context/  (State Management)
│   ├── authContext.tsx          ⭐ Autenticação
│   │   ├── State: isSignedIn, user
│   │   ├── Functions: login(), logout()
│   │   └── Hook: useAuth()
│   │
│   └── dataContext.tsx          ⭐ Dados (CRUD)
│       ├── State: items[]
│       ├── Functions: add, update, delete, get
│       └── Hook: useData()
│
├── 🔑 app/(auth)/  (Não Autenticado)
│   ├── _layout.tsx              📄 Layout auth
│   │   └── Stack navigator simples
│   │
│   └── login.tsx                ⭐ TELA DE LOGIN
│       ├── Email input
│       ├── Senha input
│       ├── Validação
│       └── Botão Login
│
├── 🏠 app/(app)/  (Autenticado)
│   ├── _layout.tsx              📄 Layout app
│   │   └── Stack com header customizado
│   │
│   ├── index.tsx                ⭐ MENU PRINCIPAL
│   │   ├── Boas-vindas
│   │   ├── Stats (total, ativos)
│   │   ├── 4 Opções do menu
│   │   └── Links para outras telas
│   │
│   ├── list.tsx                 ⭐ LISTAGEM
│   │   ├── Filtros (Ativo/Inativo)
│   │   ├── FlatList com cards
│   │   ├── Botão Editar
│   │   ├── Botão Deletar
│   │   └── Contador
│   │
│   └── form.tsx                 ⭐ FORMULÁRIO
│       ├── Nome input
│       ├── Email input
│       ├── Telefone input
│       ├── Status picker
│       ├── Validação completa
│       └── Botões Salvar/Cancelar
│
├── 🛣️  app/_layout.tsx           ⭐ ROOT LAYOUT
│   ├── AuthProvider
│   ├── DataProvider
│   ├── RootLayoutNav
│   └── Navegação Condicional
│
├── 📖 app/index.tsx             📄 Home (redirect)
│
├── 🎨 assets/
│   └── images/                  (Imagens Expo)
│
└── 📚 DOCUMENTAÇÃO (6 arquivos)
    ├── INDEX.md                 📘 Índice geral
    ├── RESUMO.md                📄 Resumo executivo
    ├── SISTEMA.md               📘 Guia de uso completo
    ├── ARQUITETURA.md           🏗️ Diagramas e estrutura
    ├── TESTES.md                🧪 Cenários de teste
    ├── TROUBLESHOOTING.md       🔧 Problemas e soluções
    └── API_INTEGRACAO.md        🔌 Integração com Node.js
```

---

## 🔄 Fluxo de Navegação Visual

```
                            ┌─────────────────┐
                            │  ROOT LAYOUT    │
                            │ (_layout.tsx)   │
                            └────────┬────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
            isSignedIn = false                  isSignedIn = true
                    │                                 │
         ┌──────────▼──────────┐         ┌──────────▼──────────┐
         │  (auth) LAYOUT      │         │  (app) LAYOUT       │
         └──────────┬──────────┘         └──────────┬──────────┘
                    │                                │
              ┌─────▼─────┐                 ┌───────┴───────┐
              │            │                 │               │
           LOGIN          404         ┌──────▼───┐      ┌──▼──────┐
        SCREEN                        │           │      │         │
        (login.tsx)            MENU          LIST        FORM
                            (index.tsx)  (list.tsx)   (form.tsx)
                            
        [Credentials]           [Dashboard]      [Filtros]    [Criar/Edit]
        Email+Pass             Stats+Links      Listar       Validação
        Validação              Navegação        Editar/Del   Sucesso
        ─────────►             ───────────►     ───────────  ──────────
        Dashboard              CRUD Ops         CRUD Ops     CRUD Ops
```

---

## 🧠 Fluxo de Estado Global

```
                    ┌──────────────────────────────┐
                    │    ROOT LAYOUT               │
                    │   (_layout.tsx)              │
                    └──────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                        │
        ┌───────▼────────┐      ┌───────▼────────┐
        │  AuthProvider  │      │ DataProvider   │
        │                │      │                │
        │ State:         │      │ State:         │
        │ • isSignedIn   │      │ • items[]      │
        │ • user         │      │                │
        │                │      │ Functions:     │
        │ Functions:     │      │ • addItem()    │
        │ • login()      │      │ • updateItem() │
        │ • logout()     │      │ • deleteItem() │
        │                │      │ • getItem()    │
        │ Hook:          │      │                │
        │ useAuth()      │      │ Hook:          │
        └────────┬───────┘      │ useData()      │
                 │              └────────┬───────┘
                 │                      │
        ┌────────▴──────────┬───────────┴────────┐
        │                   │                    │
   (auth) Routes      Menu (index)          list + form
   [login usable]     [todos usable]        [todos usable]
   
   • useAuth()        • useAuth()           • useData()
   • Logout → true    • useData()           • useAuth()
              ↓       • Navega
            false
```

---

## 📊 Matriz de Dados

```
┌────────────────────────────────────────────────────────────┐
│               DataContext.items[]                          │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ DataItem {                                          │  │
│  │   id: string            (único, timestamp)          │  │
│  │   name: string          (nome completo)            │  │
│  │   email: string         (email@mail.com)           │  │
│  │   phone: string         ((XX) XXXXX-XXXX)          │  │
│  │   status: string        ("Ativo" | "Inativo")      │  │
│  │ }                                                   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  Exemplo 1:  { id: "1", name: "João Silva", ... }         │
│  Exemplo 2:  { id: "2", name: "Maria Santos", ... }       │
│  Exemplo 3:  { id: "3", name: "Pedro Oliveira", ... }     │
│                                                             │
│  [CRUD Operations]                                         │
│  ├─ CREATE: addItem(newItem) → items.push(newItem)       │
│  ├─ READ:   items.filter(), getItem(id)                 │
│  ├─ UPDATE: updateItem(id, data) → items[id] = data     │
│  └─ DELETE: deleteItem(id) → items.splice()             │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design System

```
CORES
├── Primária:     #0A7EA4 (Azul)         [Headers, Botões principais]
├── Secundária:   #4CAF50 (Verde)        [Botão criar, status ativo]
├── Aviso:        #FF9800 (Laranja)      [Editar]
├── Erro:         #f44336 (Vermelho)     [Deletar]
├── Background:   #E6F4FE (Azul claro)   [Container geral]
└── Neutra:       #fff (Branco)          [Cards]

TIPOGRAFIA
├── Título:       fontSize: 28, bold     [Screens principais]
├── Heading:      fontSize: 20, bold     [Seções]
├── Subtítulo:    fontSize: 16, 600      [Labels e valores]
├── Corpo:        fontSize: 14, 400      [Descrições]
└── Pequeno:      fontSize: 12, 400      [Info secundária]

ESPAÇAMENTO
├── Padding Container:  15-20px           [Margens principais]
├── Padding Card:       16px              [Dentro de cards]
├── Gap entre items:    10-12px           [Espaço entre elementos]
└── Border Radius:      8-12px            [Cantos arredondados]

SOMBRAS
├── Card:   shadowOpacity: 0.1, radius: 4
├── Ativo:  borderLeftWidth: 5, borderLeftColor
└── Hover:  opacity: 0.7 ao tocar
```

---

## 🔄 CRUD Workflow Visual

```
┌─────────────────────────────────────────────────────────────────┐
│                        LIST SCREEN                              │
│                      (list.tsx)                                 │
│ ┌──────────────────────────────────────────────────────────────┐│
│ │ [Filtro: Ativo] [Filtro: Inativo]                           ││
│ │                                                              ││
│ │ ┌─────────────────────────────────────────────────────────┐││
│ │ │ João Silva    [Ativo]                                   │││
│ │ │ joao@email.com   (11) 98765-4321                        │││
│ │ │ [✏️  Editar]  [🗑️ Deletar]                               │││
│ │ └─────────────────────────────────────────────────────────┘││
│ │                                                              ││
│ │ ┌─────────────────────────────────────────────────────────┐││
│ │ │ Maria Santos  [Ativo]                                   │││
│ │ │ maria@email.com  (11) 99876-5432                        │││
│ │ │ [✏️  Editar]  [🗑️ Deletar]                               │││
│ │ └─────────────────────────────────────────────────────────┘││
│ │                                                              ││
│ │ ┌─────────────────────────────────────────────────────────┐││
│ │ │ Pedro Oliveira [Inativo]                                │││
│ │ │ pedro@email.com  (11) 97654-3210                        │││
│ │ │ [✏️  Editar]  [🗑️ Deletar]                               │││
│ │ └─────────────────────────────────────────────────────────┘││
│ │                                                              ││
│ │ Total: 3 de 3 registros                                    ││
│ └──────────────────────────────────────────────────────────────┘│
│       │                           │                            │
│       │ Clica Editar              │ Clica Deletar             │
│       │ (passa ID)                │ (confirma)                │
│       ▼                           ▼                            ▼
│ ┌──────────────────┐      ┌────────────────┐      ┌──────────────┐
│ │  FORM SCREEN     │      │ ALERT Dialog   │      │ Item Removido│
│ │  (form.tsx)      │      │ "Tem certeza?" │      │ Re-renderiza │
│ │  Modo: EDIT      │      │ [Cancel][OK]   │      │              │
│ │                  │      │                │      │              │
│ │ Nome: [____]     │      └────────────────┘      └──────────────┘
│ │ Email: [____]    │              │
│ │ Phone: [____]    │              │ Confirma
│ │ Status: [v]      │              ▼
│ │                  │      deleteItem(id)
│ │ [Atualizar] [X]  │      items.filter()
│ │                  │      Re-render list
│ └──────────────────┘
│       │
│       │ Salva alterações
│       ▼
│   updateItem(id)
│   items[id] = newData
│   Re-render list
│
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Componentes Principais

```
LOGIN SCREEN
├── 🎨 Styles
│   ├── container (flex, bg-azul-claro)
│   ├── title (font-28, bold, azul)
│   ├── input (border, border-radius)
│   └── button (bg-azul, color-white)
│
├── 📝 Elements
│   ├── Email TextInput
│   ├── Senha TextInput
│   ├── Login Button
│   └── Test Credentials Box
│
└── 🧠 Logic
    ├── validate()
    ├── handleLogin()
    └── useAuth()

MENU SCREEN
├── 🎨 Styles
│   ├── header (bg-azul, color-white)
│   ├── stats-container (row)
│   ├── stats-box (flex-1)
│   └── menu-item (row, border-left)
│
├── 📝 Elements
│   ├── Welcome Text
│   ├── Stats Boxes (2x)
│   ├── Menu Items (4x)
│   └── Navigation Links
│
└── 🧠 Logic
    ├── useAuth()
    ├── useData()
    └── handleLogout()

LIST SCREEN
├── 🎨 Styles
│   ├── filter-button (active/inactive)
│   ├── item-card (padding, shadow)
│   ├── status-badge (color-based)
│   └── action-button (orange/red)
│
├── 📝 Elements
│   ├── Filter Buttons
│   ├── FlatList
│   ├── Item Cards
│   ├── Action Buttons (2x)
│   └── Empty State
│
└── 🧠 Logic
    ├── toggleFilter()
    ├── handleEdit()
    ├── handleDelete()
    ├── filteredItems
    └── useData()

FORM SCREEN
├── 🎨 Styles
│   ├── form-container (padding, bg-white)
│   ├── form-group (margin-bottom)
│   ├── input (border, border-radius)
│   ├── button-container (row)
│   └── button (padding, bg-color)
│
├── 📝 Elements
│   ├── Nome Input
│   ├── Email Input
│   ├── Telefone Input
│   ├── Status Picker
│   ├── Save Button
│   ├── Cancel Button
│   └── Info Box
│
└── 🧠 Logic
    ├── validateForm()
    ├── handleInputChange()
    ├── handleSave()
    ├── isEditMode logic
    ├── useData()
    └── useRouter()
```

---

## 🔐 Fluxo de Segurança (Atual)

```
LOGIN ATTEMPT
    ↓
┌─────────────────────────────────┐
│  CLIENT VALIDATION              │
│  • Email contém @?              │
│  • Senha >= 4 caracteres?       │
│  • Campos preenchidos?          │
└────────┬────────────────────────┘
         │
    ✗ Falhou ──► Alert("Erro") ──► Volta Login
         │
    ✓ Passou
         │
┌────────▼────────────────────────┐
│  UPDATE AUTH CONTEXT            │
│  • setUser(email, name)         │
│  • setIsSignedIn(true)          │
│  • useAuth() ativado            │
└────────┬────────────────────────┘
         │
┌────────▼────────────────────────┐
│  NAVEGAÇÃO AUTOMÁTICA           │
│  • Root Layout verifica estado  │
│  • Renderiza (app) ao invés de  │
│    (auth)                       │
└────────┬────────────────────────┘
         │
┌────────▼────────────────────────┐
│  MENU ACCESSIBLE                │
│  • Usuário autenticado          │
│  • Dados disponíveis            │
│  • CRUD operacional             │
└─────────────────────────────────┘

LOGOUT
    ↓
┌─────────────────────────────────┐
│  LIMPAR CONTEXTO                │
│  • setUser(null)                │
│  • setIsSignedIn(false)         │
│  • Items conservados (memória)  │
└────────┬────────────────────────┘
         │
┌────────▼────────────────────────┐
│  NAVEGAÇÃO VOLTA                │
│  • Root Layout detecta false    │
│  • Renderiza (auth)             │
│  • LOGIN SCREEN aparecer        │
└─────────────────────────────────┘
```

---

## 📱 Responsividade

```
Pequeno (Smartphone)        Médio (Tablet)          Grande (Desktop)
─────────────────────────────────────────────────────────────────
┌──────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
│                  │    │                      │    │                      │
│    ┌──────────┐  │    │  ┌────────────────┐  │    │  ┌─────────────────┐ │
│    │  LOGIN   │  │    │  │    LOGIN       │  │    │  │     LOGIN      │ │
│    │  SCREEN  │  │    │  │    SCREEN      │  │    │  │    SCREEN      │ │
│    └──────────┘  │    │  └────────────────┘  │    │  └─────────────────┘ │
│                  │    │                      │    │                      │
│  Padding: 20px   │    │  Padding: 40px       │    │  Padding: 60px       │
│  Font: 16px      │    │  Font: 18px          │    │  Font: 20px          │
│                  │    │                      │    │                      │
└──────────────────┘    └──────────────────────┘    └──────────────────────┘

Flexbox
│
├─ Direção: column (padrão todos)
├─ Justify: space-between / center
├─ Align: center / stretch
└─ Gap: 10-20px
```

---

## 📊 Casos de Uso

```
Use Case 1: NOVO USUÁRIO
├─ Abre app
├─ Vê tela de login
├─ Insere email e senha
├─ Clica entrar
├─ Vê menu com 3 registros
└─ Explora funcionalidades

Use Case 2: VER DADOS
├─ No menu, clica "Listar Registros"
├─ Vê lista com 3 registros
├─ Filtra por "Ativos"
├─ Vê 2 registros
└─ Clica em um para editar ou deletar

Use Case 3: CADASTRAR
├─ No menu, clica "Cadastrar Novo"
├─ Preenche formulário
├─ Clica "Criar Registro"
├─ Alerta de sucesso
└─ Volta para lista (4 registros agora)

Use Case 4: EDITAR
├─ Na lista, clica "Editar"
├─ Formulário carrega dados
├─ Altera dados
├─ Clica "Atualizar"
└─ Alterações aparecem na lista

Use Case 5: DELETAR
├─ Na lista, clica "Deletar"
├─ Confirma no alerta
├─ Registro removido
└─ Lista atualiza automaticamente

Use Case 6: LOGOUT
├─ No menu, clica "Sair"
├─ Contexto limpo
├─ Volta para login
└─ Dados em memória preservados
```

---

## 🎯 Próximos Passos

```
Agora (Fase 1) ✅
├─ Sistema em memória
├─ Sem autenticação real
└─ Sem banco de dados

Próxima (Fase 2) 🔜
├─ API Node.js com Express
├─ Banco de dados (MongoDB/PostgreSQL)
├─ JWT para autenticação real
├─ Requisições HTTP reais
└─ Persistência de dados

Futura (Fase 3) 📋
├─ Testes automatizados
├─ Performance otimization
├─ Deploy em produção
└─ Monitoramento e analytics
```

---

## ✅ Conclusão

Sistema completo, funcional e documentado!

**Próximo**: Ler [SISTEMA.md](SISTEMA.md) para começar

🚀 **Bom desenvolvimento!**

