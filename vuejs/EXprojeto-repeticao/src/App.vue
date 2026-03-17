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
      <button @click="telaAtual = 'dobro'">Ex 01 - Dobro</button>
      <button @click="telaAtual = 'vel'">Ex 02 - Histórico de Velocidades</button>
      <button @click="telaAtual = 'ope'">Ex 03 - 4 Operações</button>
    </nav>

    <div class="conteudo">
      <ex01dobro v-if="telaAtual === 'dobro'" />
      <ex02HistVel v-else-if="telaAtual === 'vel'" />
      <ex03Ope v-else />
    </div>
  </div>
</template>

<script>
import ex01dobro from "./components/ex01dobro.vue";
import ex02HistVel from "./components/ex02HistVel.vue";
import ex03Ope from "./components/ex03Ope.vue";
import logo from "./assets/ale.png";

export default {
  components: { ex01dobro, ex02HistVel, ex03Ope },
  data() {
    return {
      telaAtual: "dobro",
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
