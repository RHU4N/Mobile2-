<template>
  <div class="card">
    <h2>Conversor °C ⇄ °F</h2>

    <input type="number" v-model.number="valor" placeholder="Digite um valor" />

    <div class="botoes">
      <button @click="cParaF">C → F</button>
      <button @click="fParaC">F → C</button>
      <button class="neutro" @click="limpar">Limpar</button>
    </div>

    <p v-if="resultado !== null" class="ok">
      Resultado: {{ resultado.toFixed(2) }}
    </p>
  </div>
</template>
<script setup lang="ts"> 
import { ref } from "vue"; 
 
const valor = ref<number>(0); 
const resultado = ref<number | null>(null); 
 
function cParaF(): void { 
  resultado.value = (valor.value * 9) / 5 + 32; 
} 
 
function fParaC(): void { 
  resultado.value = ((valor.value - 32) * 5) / 9; 
} 
 
function limpar(): void { 
  valor.value = 0; 
  resultado.value = null; 
} 
</script> 

<style scoped>
.card {
  width: 420px;
  border: 2px solid #42b883;
  border-radius: 10px;
  padding: 18px;
}
input {
  padding: 8px;
  width: 70%;
  margin: 10px;
}
.botoes {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}
button {
  padding: 8px 12px;
  cursor: pointer;
}
.neutro {
  background: #e9ecef;
  border: 0;
}
.ok {
  color: #0f7a3b;
  font-weight: bold;
  margin-top: 12px;
}
</style>
