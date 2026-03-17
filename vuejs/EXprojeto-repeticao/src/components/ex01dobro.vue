<template>
  <div class="card">
    <h2>Dobro</h2>

    <input
      type="number"
      v-model.number="numero"
      placeholder="Digite um número"
      @keyup.enter="adicionarDobro"
    />
    <button @click="adicionarDobro">Gerar</button>
    <ul v-if="lista.length > 0">
      <li v-for="(dobro, index) in lista" :key="index">
        {{ dobro }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"> 
import { ref } from "vue"; 
 
const numero = ref<number>(0); 
const lista = ref<number[]>([]); 
 
function adicionarDobro(): void { 
  lista.value.push(numero.value * 2); 
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
