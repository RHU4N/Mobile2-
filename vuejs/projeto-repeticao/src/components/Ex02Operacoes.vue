<template>
  <div class="card">
    <h2>4 Operações</h2>

    <div class="linha">
      <input type="number" v-model.number="a" placeholder="Valor A" />
      <input type="number" v-model.number="b" placeholder="Valor B" />
    </div>

    <div class="botoes">
      <button @click="somar">Somar</button>
      <button @click="subtrair">Subtrair</button>
      <button @click="multiplicar">Multiplicar</button>
      <button @click="dividir">Dividir</button>
      <button class="neutro" @click="limpar">Limpar</button>
    </div>

    <p v-if="mensagem" :class="tipoMensagem">{{ mensagem }}</p>
  </div>
</template>

<script>
export default {
  name: "Ex02Operacoes",
  data() {
    return {
      a: 0,
      b: 0,
      mensagem: "",
      tipoMensagem: "ok", // ok | erro
    };
  },

  methods: {
    setOk(msg) {
      this.mensagem = msg;
      this.tipoMensagem = "ok";
    },
    setErro(msg) {
      this.mensagem = msg;
      this.tipoMensagem = "erro";
    },
    somar() {
      this.setOk(`Resultado: ${this.a + this.b}`);
    },
    subtrair() {
      this.setOk(`Resultado: ${this.a - this.b}`);
    },
    multiplicar() {
      this.setOk(`Resultado: ${this.a * this.b}`);
    },
    dividir() {
      if (this.b === 0) return this.setErro("Erro: divisão por zero.");
      this.setOk(`Resultado: ${(this.a / this.b).toFixed(2)}`);
    },
    limpar() {
      this.a = 0;
      this.b = 0;
      this.mensagem = "";
      this.tipoMensagem = "ok";
    },
  },
};
</script>

<style scoped>
.card {
  width: 420px;
  border: 2px solid #42b883;
  border-radius: 10px;
  padding: 18px;
}
.linha {
  display: flex;
  gap: 10px;
  justify-content: center;
}
input {
  padding: 8px;
  width: 45%;
}
.botoes {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
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
}
.erro {
  color: #b00020;
  font-weight: bold;
}
</style>
