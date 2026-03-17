<template>
  <div class="pagina">
    <h1>Menu de Exemplos - Vue</h1>

    <div class="imagens">
      <img :src="logoProjeto" alt="Logo do Projeto" class="img-local" />
      <img
        src="https://vuejs.org/images/logo.png"
        alt="Logo Vue"
        class="img-web"
      />
    </div>

    <nav class="menu">
      <button @click="telaAtual = 'tabuada'">Ex 01 - Tabuada</button>
      <button @click="telaAtual = 'operacoes'">Ex 02 - 4 Operações</button>
      <button @click="telaAtual = 'temp'">Ex 03 - °C ⇄ °F</button>
    </nav>

    <div class="conteudo">
      <Ex01Tabuada v-if="telaAtual === 'tabuada'" />
      <Ex02Operacoes v-else-if="telaAtual === 'operacoes'" />
      <Ex03Temperatura v-else />
    </div>
  </div>
</template>

<script>
import Ex01Tabuada from "./components/Ex01Tabuada.vue";
import Ex02Operacoes from "./components/Ex02Operacoes.vue";
import Ex03Temperatura from "./components/Ex03Temperatura.vue";
import logo from "./assets/ale.png";

export default {
  components: { Ex01Tabuada, Ex02Operacoes, Ex03Temperatura },
  data() {
    return {
      telaAtual: "tabuada",
      logoProjeto: logo,
    };
  },
};
</script>

<style>
.pagina {
  max-width: 900px;
  margin: 30px auto;
  text-align: center;
  font-family: Arial;
}

.imagens {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
  align-items: center;
}

.img-local {
  width: 120px;
}
.img-web {
  width: 100px;
}

.menu {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
}

button {
  padding: 10px 14px;
  cursor: pointer;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
}

button:hover {
  background-color: #2f8f6f;
}

.conteudo {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
