# Guia de Testes - Sistema de Gerenciamento

## 🧪 Cenários de Teste

### 1. Teste de Login

#### ✅ Casos de Sucesso
```
Email: teste@email.com
Senha: 1234
Resultado: Login bem-sucedido, redirecionado para menu
```

```
Email: usuario@empresa.com
Senha: senha123
Resultado: Login bem-sucedido, redirecionado para menu
```

#### ❌ Casos de Erro
```
Email: invalido
Senha: 1234
Erro: "Por favor, insira um email válido"
```

```
Email: teste@email.com
Senha: 12
Erro: "Senha deve ter pelo menos 4 caracteres"
```

```
Email: 
Senha: 
Erro: "Por favor, preencha todos os campos"
```

---

### 2. Teste de Menu Principal

#### Verificar Informações
- [ ] Nome do usuário exibido corretamente
- [ ] Email do usuário exibido corretamente
- [ ] Total de registros está correto
- [ ] Contagem de ativos está correta

#### Verificar Navegação
- [ ] "Listar Registros" navega para a lista
- [ ] "Cadastrar Novo" navega para formulário em modo criar
- [ ] "Gerenciar Dados" navega para a lista
- [ ] "Sair" faz logout e volta para login

---

### 3. Teste de Listagem

#### Dados Iniciais (Pré-populados)
```json
[
  {
    "id": "1",
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 98765-4321",
    "status": "Ativo"
  },
  {
    "id": "2",
    "name": "Maria Santos",
    "email": "maria@email.com",
    "phone": "(11) 99876-5432",
    "status": "Ativo"
  },
  {
    "id": "3",
    "name": "Pedro Oliveira",
    "email": "pedro@email.com",
    "phone": "(11) 97654-3210",
    "status": "Inativo"
  }
]
```

#### Teste de Filtros
- [ ] Filtro "Ativos" mostra apenas 2 registros
- [ ] Filtro "Inativos" mostra apenas 1 registro
- [ ] Ambos filtros desativados mostra 0 registros
- [ ] Reativar ambos mostra 3 registros

#### Teste de Ações
- [ ] Botão "Editar" navega para formulário com dados preenchidos
- [ ] Botão "Deletar" mostra confirmação
- [ ] Confirmação de delete remove o item
- [ ] Cancelação preserva o item

#### Teste de Contadores
- [ ] Total exibido no rodapé corresponde aos filtrados
- [ ] Contador na barra de filtros atualiza após ações

---

### 4. Teste de Cadastro

#### Teste de Validação
```
Nome: (vazio)
Resultado: Erro "O nome é obrigatório"
```

```
Nome: João Silva
Email: (vazio)
Resultado: Erro "O email é obrigatório"
```

```
Nome: João Silva
Email: joaogmail.com (sem @)
Resultado: Erro "Email inválido"
```

```
Nome: João Silva
Email: joao@gmail.com
Phone: (vazio)
Resultado: Erro "O telefone é obrigatório"
```

#### Teste de Criação com Sucesso
```
Nome: Carlos Eduardo
Email: carlos@email.com
Phone: (11) 91234-5678
Status: Ativo
Resultado: 
- Mensagem "Registro criado com sucesso!"
- Retorna para lista
- Novo registro aparece na listagem
```

---

### 5. Teste de Edição

#### Pré-condição: Estar na listagem, ter clicado em "Editar" para João Silva

#### Validações são as mesmas do cadastro

#### Teste de Atualização com Sucesso
```
Nome: João Silva Atualizado
Email: joao.novo@email.com
Phone: (11) 98888-7777
Status: Inativo
Resultado:
- Mensagem "Registro atualizado com sucesso!"
- Retorna para lista
- Dados atualizados aparecem na listagem
```

---

### 6. Teste de Deleção

#### Fluxo Completo
1. Na listagem, clique em "Deletar" para um registro
2. Confirme o alerta "Tem certeza que deseja deletar?"
3. Resultado: Registro removido da lista

#### Teste de Cancelamento
1. Na listagem, clique em "Deletar"
2. Clique em "Cancelar" no alerta
3. Resultado: Registro continua na lista

---

### 7. Teste de Fluxo Completo

#### Cenário: Criar, Editar e Deletar um Registro

1. **Login**
   ```
   Email: teste@email.com
   Senha: 1234
   ```

2. **Criar novo registro**
   - Clique em "Cadastrar Novo"
   - Preencha: Nome: "Ana Silva", Email: "ana@email.com", Phone: "(11) 96666-5555"
   - Clique em "Criar Registro"
   - Verifique se aparece na lista

3. **Editar o registro**
   - Clique em "Editar"
   - Altere o nome para "Anamaria Silva"
   - Clique em "Atualizar"
   - Verifique a atualização na lista

4. **Deletar o registro**
   - Clique em "Deletar"
   - Confirme
   - Verifique se foi removido

5. **Logout**
   - Clique em "Sair"
   - Verifique volta para login

---

### 8. Teste de Persistência

**Nota**: Os dados são perdidos ao recarregar a aplicação (em memória)

#### Simulação
1. Crie um novo registro
2. Recarregue a aplicação (Ctrl+R ou Command+R)
3. Resultado esperado: Os dados não persistem (comportamento normal)
4. **Quando conectado a API**: Os dados persistirão no banco

---

### 9. Teste de Responsividade

- [ ] Layout em tela pequena (iPhone SE)
- [ ] Layout em tela grande (iPad)
- [ ] Orientação retrato e paisagem
- [ ] Texto não fica cortado
- [ ] Botões acessíveis

---

### 10. Teste de Acessibilidade

- [ ] Todos os inputs têm labels
- [ ] Cores com contraste adequado
- [ ] Tamanho de fonte legível
- [ ] Espaçamento suficiente entre elementos
- [ ] Feedback visual em todas as ações

---

## 📋 Checklist Final

### Funcionalidades Críticas
- [ ] Login funciona
- [ ] Menu exibe informações corretas
- [ ] Listar mostra todos os dados
- [ ] Filtros funcionam
- [ ] Criar novo registro funciona
- [ ] Editar registro funciona
- [ ] Deletar registro funciona
- [ ] Logout funciona

### Validações
- [ ] Email validado
- [ ] Senha com mínimo de caracteres
- [ ] Campos obrigatórios validados
- [ ] Mensagens de erro claras

### UX/UI
- [ ] Navegação fluida
- [ ] Cores consistentes
- [ ] Ícones representativos
- [ ] Feedback em ações
- [ ] Sem erros de console

---

## 🐛 Relatório de Bugs (se encontrados)

Formato:
```
Data: [dd/mm/yyyy]
Severidade: [Crítica | Alta | Média | Baixa]
Descrição: [descrição do bug]
Passos para Reproduzir:
1. ...
2. ...
3. ...
Resultado Esperado: [...]
Resultado Obtido: [...]
```

---

## 🚀 Próximos Testes (com API)

- [ ] Teste de conexão com API
- [ ] Teste de persistência em banco de dados
- [ ] Teste de autenticação com JWT
- [ ] Teste de requisições HTTP
- [ ] Teste de tratamento de erros de rede
- [ ] Teste de performance com muitos registros
- [ ] Teste de sincronização entre dispositivos

