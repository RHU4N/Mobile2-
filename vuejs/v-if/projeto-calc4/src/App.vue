<template>
  <div class="page">
    <section class="calculator-card">
      <div class="header">
        <p class="eyebrow">Calculadora Vue</p>
        <h1>Quatro Operacoes</h1>
        <p class="subtitle">
          Digite dois valores e escolha a operacao matematica que deseja executar.
        </p>
      </div>

      <div class="inputs">
        <label class="field">
          <span>Primeiro valor</span>
          <input
            type="number"
            v-model="valorA"
            placeholder="Ex.: 15"
            step="any"
          />
        </label>

        <label class="field">
          <span>Segundo valor</span>
          <input
            type="number"
            v-model="valorB"
            placeholder="Ex.: 3"
            step="any"
          />
        </label>
      </div>

      <div class="actions">
        <button class="btn soma" @click="somar">Somar</button>
        <button class="btn subtracao" @click="subtrair">Subtrair</button>
        <button class="btn multiplicacao" @click="multiplicar">Multiplicar</button>
        <button class="btn divisao" @click="dividir">Dividir</button>
      </div>

      <transition name="result-fade">
        <div v-if="divisaoPorZero" class="result-card erro">
          <div class="result-tag">Erro</div>
          <p class="result-text">Nao e permitido dividir por zero.</p>
        </div>
      </transition>

      <transition name="result-fade">
        <div v-if="!divisaoPorZero && resultado !== ''" :class="['result-card', classeResultado]">
          <div class="result-tag">{{ operacaoAtual }}</div>
          <p class="result-text">{{ resultado }}</p>
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valorA: "",
      valorB: "",
      resultado: "",
      classeResultado: "",
      operacaoAtual: "",
      divisaoPorZero: false,
    };
  },
  methods: {
    obterValores() {
      const a = parseFloat(this.valorA);
      const b = parseFloat(this.valorB);

      if (isNaN(a) || isNaN(b)) {
        this.resultado = "Informe dois valores numericos validos.";
        this.classeResultado = "aviso";
        this.operacaoAtual = "Atencao";
        this.divisaoPorZero = false;
        return null;
      }

      return { a, b };
    },
    atualizarResultado(rotulo, valor, classe) {
      this.resultado = `Resultado: ${valor.toFixed(2)}`;
      this.classeResultado = classe;
      this.operacaoAtual = rotulo;
      this.divisaoPorZero = false;
    },
    somar() {
      const valores = this.obterValores();
      if (!valores) {
        return;
      }

      this.atualizarResultado("Soma", valores.a + valores.b, "soma-resultado");
    },
    subtrair() {
      const valores = this.obterValores();
      if (!valores) {
        return;
      }

      this.atualizarResultado("Subtracao", valores.a - valores.b, "subtracao-resultado");
    },
    multiplicar() {
      const valores = this.obterValores();
      if (!valores) {
        return;
      }

      this.atualizarResultado("Multiplicacao", valores.a * valores.b, "multiplicacao-resultado");
    },
    dividir() {
      const valores = this.obterValores();
      if (!valores) {
        return;
      }

      if (valores.b === 0) {
        this.resultado = "";
        this.classeResultado = "";
        this.operacaoAtual = "";
        this.divisaoPorZero = true;
        return;
      }

      this.atualizarResultado("Divisao", valores.a / valores.b, "divisao-resultado");
    },
  },
};
</script>

<style>
:global(body) {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(34, 197, 94, 0.18), transparent 24%),
    radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.18), transparent 24%),
    linear-gradient(145deg, #f5f7eb 0%, #e7f0d4 48%, #dbe8bc 100%);
}

* {
  box-sizing: border-box;
}

.page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  font-family: "Trebuchet MS", "Segoe UI", sans-serif;
}

.calculator-card {
  width: 100%;
  max-width: 620px;
  padding: 34px 30px;
  border-radius: 30px;
  background: rgba(255, 252, 245, 0.9);
  border: 1px solid rgba(111, 135, 66, 0.2);
  box-shadow: 0 26px 50px rgba(88, 104, 48, 0.18);
}

.header {
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 10px;
  color: #4d7c0f;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.header h1 {
  margin: 0;
  color: #1f3b08;
  font-size: clamp(2rem, 5vw, 2.8rem);
  line-height: 1.05;
}

.subtitle {
  margin: 12px 0 0;
  color: #4b5d2d;
  line-height: 1.55;
}

.inputs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field span {
  color: #365314;
  font-size: 0.9rem;
  font-weight: 700;
}

input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid rgba(101, 163, 13, 0.24);
  background: #fffef8;
  color: #24340f;
  font-size: 1rem;
  transition: border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
}

input::placeholder {
  color: #93a57b;
}

input:focus {
  outline: none;
  border-color: #65a30d;
  box-shadow: 0 0 0 4px rgba(101, 163, 13, 0.14);
  transform: translateY(-1px);
}

.actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 22px;
}

.btn {
  padding: 15px 16px;
  border: none;
  border-radius: 18px;
  color: #fffdf7;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.03);
}

.soma {
  background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
  box-shadow: 0 14px 24px rgba(34, 197, 94, 0.24);
}

.subtracao {
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  box-shadow: 0 14px 24px rgba(249, 115, 22, 0.24);
}

.multiplicacao {
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  box-shadow: 0 14px 24px rgba(20, 184, 166, 0.22);
}

.divisao {
  background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
  box-shadow: 0 14px 24px rgba(37, 99, 235, 0.22);
}

.result-card {
  margin-top: 22px;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid transparent;
}

.result-tag {
  display: inline-flex;
  margin-bottom: 10px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.result-text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
}

.soma-resultado {
  background: rgba(34, 197, 94, 0.12);
  border-color: rgba(34, 197, 94, 0.22);
  color: #166534;
}

.soma-resultado .result-tag {
  background: rgba(34, 197, 94, 0.15);
  color: #15803d;
}

.subtracao-resultado {
  background: rgba(249, 115, 22, 0.12);
  border-color: rgba(249, 115, 22, 0.22);
  color: #9a3412;
}

.subtracao-resultado .result-tag {
  background: rgba(249, 115, 22, 0.15);
  color: #c2410c;
}

.multiplicacao-resultado {
  background: rgba(20, 184, 166, 0.12);
  border-color: rgba(20, 184, 166, 0.22);
  color: #115e59;
}

.multiplicacao-resultado .result-tag {
  background: rgba(20, 184, 166, 0.15);
  color: #0f766e;
}

.divisao-resultado {
  background: rgba(37, 99, 235, 0.12);
  border-color: rgba(37, 99, 235, 0.22);
  color: #1d4ed8;
}

.divisao-resultado .result-tag {
  background: rgba(37, 99, 235, 0.15);
  color: #2563eb;
}

.aviso {
  background: rgba(234, 179, 8, 0.14);
  border-color: rgba(234, 179, 8, 0.24);
  color: #854d0e;
}

.aviso .result-tag {
  background: rgba(234, 179, 8, 0.16);
  color: #a16207;
}

.erro {
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.24);
  color: #991b1b;
}

.erro .result-tag {
  background: rgba(239, 68, 68, 0.15);
  color: #b91c1c;
}

.result-fade-enter-active,
.result-fade-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.result-fade-enter-from,
.result-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 640px) {
  .calculator-card {
    padding: 26px 18px;
  }

  .inputs,
  .actions {
    grid-template-columns: 1fr;
  }
}
</style>
