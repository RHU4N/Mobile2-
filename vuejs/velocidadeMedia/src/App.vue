<template> 
  <div class="container"> 
    <h1>Projeto Velocidade Media</h1> 
 
    <div class="formulario"> 
      <label>Digite a distancia:</label> 
      <input type="number" v-model="dis" /> 
 
      <label>Digite o tempo:</label> 
      <input type="number" v-model="temp" /> 
 
      <button @click="calcularVelM">Calcular velocidade</button> 
 
      <div class="resultado"> 
        <h2>A velocidade media é: {{ resultado }} m/s</h2> 
      </div> 
    </div> 
  </div> 
</template> 
 
<script> 
export default { 
  name: "App", 
  data() { 
    return { 
      dis: 0, 
      temp: 0, 
      resultado: 0 
    }; 
  }, 
  methods: { 
    calcularVelM() { 
      this.resultado = Number(this.dis) / Number(this.temp); 
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