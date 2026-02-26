<template> 
  <div class="container"> 
    <h1>Projeto Soma</h1> 
 
    <div class="formulario"> 
      <label>Digite o primeiro valor:</label> 
      <input type="number" v-model="valor1" /> 
 
      <label>Digite o segundo valor:</label> 
      <input type="number" v-model="valor2" /> 
 
      <button @click="calcularSoma">Calcular Soma</button> 
 
      <div class="resultado"> 
        <h2>Resultado: {{ resultado }}</h2> 
      </div> 
    </div> 
  </div> 
</template> 
 
<script> 
export default { 
  name: "App", 
  data() { 
    return { 
      valor1: 0, 
      valor2: 0, 
      resultado: 0 
    }; 
  }, 
  methods: { 
    calcularSoma() { 
      this.resultado = Number(this.valor1) + Number(this.valor2); 
    } 
  } 
}; 
</script> 
 
<style> 
.container { 
  text-align: center; 
  margin-top: 50px; 
  font-family: Arial, sans-serif; 
} 
 
.formulario { 
  display: flex; 
  flex-direction: column; 
  width: 300px; 
  margin: auto; 
  gap: 10px; 
} 
 
input { 
  padding: 8px; 
  font-size: 16px; 
} 
 
button { 
  padding: 10px; 
  background-color: #42b883; 
  color: white; 
  border: none; 
  cursor: pointer; 
  font-size: 16px; 
} 
 
 
button:hover { 
  background-color: #2f8f6f; 
} 
 
.resultado { 
  margin-top: 20px; 
  font-weight: bold; 
} 
</style> 