import { StyleSheet } from 'react-native'; 
 
const styles = StyleSheet.create({ 
  container: {  
    flex: 1,  
    padding: 16,  
    paddingTop: 48,  
    backgroundColor: '#f7f7f7'  
  }, 
  titulo: {  
    fontSize: 20,  
    fontWeight: 'bold',  
    marginBottom: 12  
  }, 
  subtitulo: {  
    marginTop: 16,  
    fontSize: 16,  
    fontWeight: '600'  
  }, 
  form: {  
    backgroundColor: 'white',  
    padding: 12,  
    borderRadius: 8,  
    elevation: 2  
  }, 
  input: { 
    backgroundColor: '#eee', 
    borderRadius: 6, 
    padding: 10, 
    marginBottom: 8, 
  }, 
  botao: {  
    padding: 12,  
    borderRadius: 6,  
    alignItems: 'center'  
  }, 
  botaoTxt: {  
    color: 'white',  
    fontWeight: '700'  
  }, 
  card: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    padding: 12, 
    borderRadius: 8, 
    marginTop: 10, 
    alignItems: 'center',
    gap: 10,    elevation: 1, 
  }, 
  cardTitulo: {  
    fontSize: 16,  
    fontWeight: '700'  
  }, 
  cardLinha: {  
    color: '#555',  
    marginTop: 4  
  }, 
  acoes: {  
    flexDirection: 'row',  
    gap: 8  
  }, 
  acao: {  
    paddingVertical: 8,  
    paddingHorizontal: 10,  
    borderRadius: 6  
  }, 
  acaoTxt: {  
    color: 'white',  
    fontWeight: '700'  
  }, 
});

export default styles;