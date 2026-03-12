<template>
  <div class="container">
    <h1>Verificador de Número</h1>

    <input type="number" v-model="numero" placeholder="Digite um número" />

    <button @click="verificarNumero">Verificar</button>

    <p v-if="resultado !== ''" :class="classeResultado">
      {{ resultado }}
    </p>
  </div>
</template>
<!-- js -->
<!-- <script>
export default {
  data() {
    return {
      numero: 0,
      resultado: "",
      classeResultado: "",
    };
  },
  methods: {
    verificarNumero() {
      if (this.numero % 2 === 0) {
        this.resultado = "O número é PAR";
        this.classeResultado = "par";
      } else {
        this.resultado = "O número é ÍMPAR";
        this.classeResultado = "impar";
      }
    },
  },
};
</script> -->

<!-- ts -->
<!-- <script lang="ts"> 
import { defineComponent } from "vue"; 
 
type ClasseResultado = "par" | "impar" | ""; 
 
export default defineComponent({ 
  name: "App", 
  data() { 
    return { 
      numero: 0 as number, 
      resultado: "" as string, 
      classeResultado: "" as ClasseResultado 
    }; 
  }, 
  methods: { 
    verificarNumero(): void { 
      if (this.numero % 2 === 0) { 
        this.resultado = "O número é PAR"; 
        this.classeResultado = "par"; 
      } else { 
        this.resultado = "O número é ÍMPAR"; 
        this.classeResultado = "impar"; 
      } 
    } 
  } 
}); 
</script>  -->

<!-- ts moderno -->
<script setup lang="ts">
import { ref } from "vue";
type ClasseResultado = "par" | "impar" | "";
const numero = ref<number>(0);
const resultado = ref<string>("");
const classeResultado = ref<ClasseResultado>("");
function verificarNumero(): void {
  if (numero.value % 2 === 0) {
    resultado.value = "O número é PAR";
    classeResultado.value = "par";
  } else {
    resultado.value = "O número é ÍMPAR";
    classeResultado.value = "impar";
  }
}
</script>

<style>
.container {
  text-align: center;
  margin-top: 50px;
  font-family: Arial;
}

input {
  padding: 8px;
  margin: 10px;
}

button {
  padding: 8px 15px;
  cursor: pointer;
  background-color: blue;
}

.par {
  color: green;
  font-weight: bold;
}

.impar {
  color: red;
  font-weight: bold;
}
</style>
