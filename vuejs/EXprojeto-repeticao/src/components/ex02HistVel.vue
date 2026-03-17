<template>
  <div class="card">
    <h2>Velocidade</h2>

    <div class="linha">
      <input type="number" v-model.number="d" placeholder="Distância (m)" />
      <input type="number" v-model.number="t" placeholder="Tempo (s)" />
    </div>
    <button @click="calcularVelocidade">Calcular</button>
    <ul v-if="lista.length > 0">
      <li v-for="(velocidade, index) in lista" :key="index">
        {{ velocidade.toFixed(2) }} m/s
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"> 
import { ref } from "vue"; 
 
const d = ref<number>(0); 
const t = ref<number>(0); 
const lista = ref<number[]>([]); 
 
function calcularVelocidade(): void { 
  if (t.value <= 0) {
    return;
  }
  const velocidade = d.value / t.value; 
  lista.value.push(velocidade); 
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
  margin: 10px;
  width: 70%;
}
button {
  padding: 8px 14px;
  cursor: pointer;
}
ul {
  text-align: left;
  margin-top: 12px;
}
</style>
