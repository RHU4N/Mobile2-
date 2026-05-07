# 🔧 Troubleshooting e Boas Práticas

## 🐛 Problemas Comuns e Soluções

### 1. "useAuth must be used within AuthProvider"

**Problema**: Erro ao usar `useAuth()` em um componente

**Solução**:
- Certifique-se que o componente está dentro da árvore de `AuthProvider`
- Verifique `app/_layout.tsx` e confirme que `AuthProvider` envolve `RootLayoutNav`
```typescript
<AuthProvider>
  <DataProvider>
    <RootLayoutNav />  ✅ Aqui pode usar useAuth
  </DataProvider>
</AuthProvider>
```

---

### 2. "useData must be used within DataProvider"

**Problema**: Erro ao usar `useData()` em um componente

**Solução**:
- `DataProvider` deve estar dentro de `AuthProvider`
- Verifique a ordem dos providers em `app/_layout.tsx`
```typescript
<AuthProvider>
  <DataProvider>  ✅ Correto
    <RootLayoutNav />
  </DataProvider>
</AuthProvider>

// ERRADO ❌
<DataProvider>
  <AuthProvider>
    <RootLayoutNav />
  </AuthProvider>
</DataProvider>
```

---

### 3. Login não funciona

**Verificar**:
- [ ] Email contém "@"? 
- [ ] Senha tem pelo menos 4 caracteres?
- [ ] Ambos os campos foram preenchidos?

**Testando**:
```
Email: teste@email.com
Senha: 1234
```

---

### 4. Dados desaparecem ao recarregar

**Problema**: Normal! Os dados são armazenados em memória

**Solução para próxima atividade**:
- Use API Node.js com banco de dados
- Veja `API_INTEGRACAO.md` para instruções

---

### 5. Formulário não valida corretamente

**Verificar**:
- [ ] Campos vazios mostram erro?
- [ ] Email sem "@" mostra erro?
- [ ] Telefone vazio mostra erro?

**Debug**:
```typescript
// Adicione logs em form.tsx
const handleInputChange = (field: string, value: string) => {
  console.log(`${field}: "${value}"`);
  setFormData(prev => ({
    ...prev,
    [field]: value,
  }));
};
```

---

### 6. Filtros não funcionam corretamente

**Problema**: Items não filtram por status

**Solução**:
- Verifique que status é exatamente "Ativo" ou "Inativo"
- Verifique `selectedFilters` state em `list.tsx`:
```typescript
// Verificar se filter está funcionando
const filteredItems = items.filter(item => {
  console.log('Item status:', item.status, 'Filtro:', selectedFilters);
  return selectedFilters.includes(item.status);
});
```

---

### 7. Edição não atualiza os dados

**Verificar**:
- [ ] Está passando o `id` correto nos route params?
- [ ] `getItem(id)` está retornando o item?
- [ ] Formulário está preenchido com os dados?

**Debug**:
```typescript
useEffect(() => {
  if (isEditMode && itemId) {
    const item = getItem(itemId);
    console.log('Editar item:', item);
    if (item) {
      setFormData({...});
    }
  }
}, [isEditMode, itemId]);
```

---

### 8. Alert não aparece

**Problema**: `Alert.alert()` não mostra mensagens

**Solução**:
- Importe `Alert` de `react-native`:
```typescript
import { Alert } from 'react-native';

// ✅ Correto
Alert.alert('Título', 'Mensagem');

// ❌ Errado
window.alert('Mensagem');
```

---

### 9. Navegação entre telas não funciona

**Verificar**:
- [ ] Usando `useRouter()`?
- [ ] Path está correto?
- [ ] Tela existe em `app/(app)/`?

**Exemplo correto**:
```typescript
import { useRouter } from 'expo-router';

const router = useRouter();

// ✅ Correto
router.push('/(app)/list');
router.push({ pathname: '/(app)/form', params: { mode: 'edit', id } });

// Voltar
router.back();
```

---

## ✅ Boas Práticas

### 1. Validação de Entrada

```typescript
// ✅ BOM: Validar antes de processar
const validateForm = () => {
  if (!formData.name.trim()) {
    Alert.alert('Erro', 'Nome é obrigatório');
    return false;
  }
  return true;
};

if (validateForm()) {
  // Processar
}

// ❌ RUIM: Confiar no usuário
addItem(formData);
```

---

### 2. Tratamento de Erros

```typescript
// ✅ BOM: Sempre tenha um catch
try {
  await someAsyncOperation();
} catch (err) {
  const message = err instanceof Error ? err.message : 'Erro desconhecido';
  Alert.alert('Erro', message);
}

// ❌ RUIM: Sem tratamento
await someAsyncOperation();
```

---

### 3. Chaves em Listas

```typescript
// ✅ BOM: ID único e estável
<FlatList
  data={items}
  keyExtractor={item => item.id}  // ID unico
  renderItem={renderItem}
/>

// ❌ RUIM: Índice muda quando lista muda
<FlatList
  data={items}
  keyExtractor={(item, index) => index.toString()}  // Pode causar bugs
  renderItem={renderItem}
/>
```

---

### 4. Context Separation

```typescript
// ✅ BOM: Contextos separados por responsabilidade
<AuthProvider>        // Autenticação
  <DataProvider>      // Dados
    <App />
  </DataProvider>
</AuthProvider>

// ❌ RUIM: Tudo em um contexto
<AppProvider>  // Mistura autenticação + dados
  <App />
</AppProvider>
```

---

### 5. Evitar Re-renders Desnecessários

```typescript
// ✅ BOM: useCallback para funções
const handleDelete = useCallback((id: string) => {
  deleteItem(id);
}, [deleteItem]);

// ✅ BOM: useMemo para cálculos pesados
const filteredItems = useMemo(
  () => items.filter(i => selectedFilters.includes(i.status)),
  [items, selectedFilters]
);
```

---

### 6. Mensagens Claras

```typescript
// ✅ BOM: Mensagens específicas e úteis
Alert.alert(
  'Erro na Validação',
  'Email deve conter "@". Exemplo: usuario@email.com'
);

// ❌ RUIM: Genérico demais
Alert.alert('Erro', 'Problema');
```

---

### 7. Feedback Visual

```typescript
// ✅ BOM: Indicar estado de carregamento
{loading && <ActivityIndicator size="large" color="#0A7EA4" />}

// ✅ BOM: Desabilitar botão durante processamento
<TouchableOpacity disabled={loading} style={[styles.button, loading && styles.buttonDisabled]}>
  <Text>{loading ? 'Processando...' : 'Enviar'}</Text>
</TouchableOpacity>
```

---

### 8. Nomenclatura Consistente

```typescript
// ✅ BOM: Nomes claros e consistentes
- handleLogin
- handleLogout
- handleDeleteItem
- validateForm
- isSignedIn
- selectedFilters

// ❌ RUIM: Nomes ambíguos
- login1
- deleteHandle
- checkForm
- signed
- filters
```

---

### 9. Organização de Arquivos

```typescript
// ✅ BOM: Estrutura clara
app/
├── context/
├── screens/        // Ou (app), (auth)
├── components/
└── utils/

// ❌ RUIM: Tudo misturado
app/
├── authContext.tsx
├── LoginScreen.tsx
├── MenuScreen.tsx
├── dataContext.tsx
└── ...
```

---

### 10. Reutilização de Código

```typescript
// ✅ BOM: Extrair lógica comum
const renderItemHeader = (item) => (
  <View>
    <Text style={styles.itemName}>{item.name}</Text>
  </View>
);

const renderItem = ({ item }) => (
  <View>
    {renderItemHeader(item)}
    {/* ... */}
  </View>
);

// ❌ RUIM: Duplicar código
const renderItem1 = () => {
  return (
    <View>
      <Text style={styles.itemName}>{item.name}</Text>
    </View>
  );
};

const renderItem2 = () => {
  return (
    <View>
      <Text style={styles.itemName}>{item.name}</Text>
    </View>
  );
};
```

---

## 🧪 Checklist de Qualidade

- [ ] Sem erros no console
- [ ] Sem warnings não resolvidos
- [ ] Todas as validações funcionam
- [ ] CRUD completo testado
- [ ] Navegação fluida
- [ ] Loading states implementados
- [ ] Mensagens de erro claras
- [ ] UI responsiva em diferentes tamanhos
- [ ] Código bem organizado
- [ ] Nomes consistentes

---

## 📚 Recursos para Aprender Mais

### React Native
- [Documentação Oficial](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)

### React
- [React Context API](https://react.dev/reference/react/useContext)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript + React](https://react.dev/learn/typescript)

### Expo Router
- [File-based Routing](https://docs.expo.dev/routing/introduction/)
- [Navigation Patterns](https://docs.expo.dev/routing/patterns/)
- [Best Practices](https://docs.expo.dev/routing/best-practices/)

---

## 💡 Dicas Extras

### Debug com Logs
```typescript
// Imprimir estado antes e depois
console.log('Antes:', items);
addItem(newItem);
console.log('Depois:', items);

// Rastrear renderizações
console.log('ListScreen renderizado');
```

### Usar React DevTools
```bash
# Instalar extensão do Chrome/Firefox
# Usar Expo DevTools para debugar
```

### Performance
```typescript
// Evitar criar funções inline em render
// Usar useCallback e useMemo
// Lazy load se necessário com React.lazy()
```

### Testing
```typescript
// Futura integração com Jest e React Native Testing Library
// Testar contextos, componentes e validações
```

---

## 🚀 Próximos Passos

1. ✅ Sistema atual com dados em memória
2. 🔄 Integrar com API Node.js
3. 💾 Conectar com banco de dados
4. 🔐 Implementar JWT
5. 📊 Melhorar performance
6. 🧪 Adicionar testes automatizados
7. 🎨 Melhorar UI/UX
8. 📱 Deploy em produção

