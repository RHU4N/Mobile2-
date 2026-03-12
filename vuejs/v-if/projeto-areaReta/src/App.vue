<template>
  <div class="page">
    <section class="card">
      <div class="header">
        <p class="eyebrow">Geometria</p>
        <h1>Area do Retangulo</h1>
        <p class="subtitle">
          Informe base e altura para calcular a area e identificar o porte da figura.
        </p>
      </div>

      <div class="fields">
        <label class="field">
          <span>Base</span>
          <input
            type="number"
            v-model="base"
            placeholder="Ex.: 8"
            min="0"
            step="0.1"
          />
        </label>

        <label class="field">
          <span>Altura</span>
          <input
            type="number"
            v-model="altura"
            placeholder="Ex.: 12"
            min="0"
            step="0.1"
          />
        </label>
      </div>

      <button @click="calcularAreaR">Calcular Area</button>

      <div class="scale">
        <div class="scale-item pequena">Pequena ate 49.99</div>
        <div class="scale-item media">Media de 50 a 119.99</div>
        <div class="scale-item grande">Grande a partir de 120</div>
      </div>

      <transition name="result-fade">
        <div v-if="resultado" :class="['result-card', classeResultado]">
          <div class="result-tag">{{ faixaArea }}</div>
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
      base: "",
      altura: "",
      resultado: "",
      classeResultado: "",
      faixaArea: "",
    };
  },
  methods: {
    calcularAreaR() {
      const base = parseFloat(this.base);
      const altura = parseFloat(this.altura);

      if (isNaN(base) || isNaN(altura) || base <= 0 || altura <= 0) {
        this.resultado = "Informe valores validos e maiores que zero para base e altura.";
        this.classeResultado = "estado-erro";
        this.faixaArea = "Dados invalidos";
        return;
      }

      const area = base * altura;

      if (area < 50) {
        this.resultado = `A area e ${area.toFixed(2)}. O retangulo e de porte pequeno.`;
        this.classeResultado = "estado-pequena";
        this.faixaArea = "Area pequena";
      } else if (area < 120) {
        this.resultado = `A area e ${area.toFixed(2)}. O retangulo e de porte medio.`;
        this.classeResultado = "estado-media";
        this.faixaArea = "Area media";
      } else {
        this.resultado = `A area e ${area.toFixed(2)}. O retangulo e de porte grande.`;
        this.classeResultado = "estado-grande";
        this.faixaArea = "Area grande";
      }
    },
  },
};
</script>

<style>
:global(body) {
  margin: 0;
  min-height: 100vh;
  background:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(145deg, #f3ede2 0%, #ead9bf 52%, #d7ba92 100%);
  background-size: 28px 28px, 28px 28px, auto;
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
  font-family: Georgia, "Trebuchet MS", serif;
}

.card {
  width: 100%;
  max-width: 540px;
  padding: 34px 30px;
  border: 1px solid rgba(99, 60, 23, 0.15);
  border-radius: 28px;
  background: rgba(255, 250, 242, 0.92);
  box-shadow: 0 24px 50px rgba(97, 64, 31, 0.16);
}

.header {
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 10px;
  color: #9a3412;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.header h1 {
  margin: 0;
  color: #3f2a18;
  font-size: clamp(2rem, 5vw, 2.8rem);
  line-height: 1.05;
}

.subtitle {
  margin: 12px 0 0;
  color: #6b4f38;
  line-height: 1.55;
}

.fields {
  display: grid;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field span {
  color: #4e3522;
  font-size: 0.9rem;
  font-weight: 700;
}

input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(120, 85, 52, 0.22);
  border-radius: 16px;
  background: #fffdf8;
  color: #3f2a18;
  font-size: 1rem;
  transition: border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
}

input::placeholder {
  color: #b8a28a;
}

input:focus {
  outline: none;
  border-color: #c2410c;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.14);
  transform: translateY(-1px);
}

button {
  width: 100%;
  margin-top: 22px;
  padding: 15px 18px;
  border: none;
  border-radius: 18px;
  background: linear-gradient(135deg, #c2410c 0%, #ea580c 50%, #f59e0b 100%);
  color: #fff9f2;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 16px 26px rgba(194, 65, 12, 0.22);
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  filter: saturate(1.05);
  box-shadow: 0 18px 30px rgba(194, 65, 12, 0.28);
}

.scale {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
}

.scale-item {
  padding: 10px 12px;
  border-radius: 14px;
  font-size: 0.78rem;
  font-weight: 700;
  text-align: center;
}

.scale-item.pequena {
  background: rgba(14, 165, 233, 0.12);
  color: #0f766e;
}

.scale-item.media {
  background: rgba(245, 158, 11, 0.14);
  color: #b45309;
}

.scale-item.grande {
  background: rgba(217, 70, 239, 0.12);
  color: #9333ea;
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
  line-height: 1.5;
  font-size: 1rem;
}

.estado-pequena {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.14), rgba(45, 212, 191, 0.14));
  border-color: rgba(16, 185, 129, 0.24);
  color: #14532d;
}

.estado-pequena .result-tag {
  background: rgba(16, 185, 129, 0.14);
  color: #047857;
}

.estado-media {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.18), rgba(249, 115, 22, 0.12));
  border-color: rgba(245, 158, 11, 0.25);
  color: #7c2d12;
}

.estado-media .result-tag {
  background: rgba(245, 158, 11, 0.16);
  color: #b45309;
}

.estado-grande {
  background: linear-gradient(135deg, rgba(192, 132, 252, 0.18), rgba(236, 72, 153, 0.12));
  border-color: rgba(192, 132, 252, 0.26);
  color: #581c87;
}

.estado-grande .result-tag {
  background: rgba(192, 132, 252, 0.16);
  color: #7e22ce;
}

.estado-erro {
  background: linear-gradient(135deg, rgba(248, 113, 113, 0.16), rgba(239, 68, 68, 0.12));
  border-color: rgba(239, 68, 68, 0.24);
  color: #7f1d1d;
}

.estado-erro .result-tag {
  background: rgba(248, 113, 113, 0.16);
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

@media (max-width: 560px) {
  .card {
    padding: 26px 18px;
  }

  .scale {
    grid-template-columns: 1fr;
  }
}
</style>
