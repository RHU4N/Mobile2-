<template>
  <div class="page">
    <div class="energy-ring ring-left"></div>
    <div class="energy-ring ring-right"></div>

    <section class="panel">
      <div class="panel-header">
        <p class="eyebrow">Fisica aplicada</p>
        <h1>Energia Cinetica</h1>
        <p class="subtitle">
          Descubra a intensidade do movimento a partir da massa e da velocidade.
        </p>
      </div>

      <div class="input-grid">
        <label class="field">
          <span>Massa</span>
          <input
            type="number"
            v-model="massa"
            placeholder="Ex.: 12"
            min="0"
            step="0.1"
          />
        </label>

        <label class="field">
          <span>Velocidade</span>
          <input
            type="number"
            v-model="vel"
            placeholder="Ex.: 20"
            min="0"
            step="0.1"
          />
        </label>
      </div>

      <button @click="calcularEnerg">Calcular Energia</button>

      <div class="legend">
        <div class="legend-item baixa">Baixa abaixo de 1000 J</div>
        <div class="legend-item moderada">Moderada de 1000 a 4999.99 J</div>
        <div class="legend-item alta">Alta a partir de 5000 J</div>
      </div>

      <transition name="result-fade">
        <div v-if="resultado" :class="['result-card', classeResultado]">
          <div class="result-chip">{{ faixaEnergia }}</div>
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
      massa: "",
      vel: "",
      resultado: "",
      classeResultado: "",
      faixaEnergia: "",
    };
  },
  methods: {
    calcularEnerg() {
      const massa = parseFloat(this.massa);
      const velocidade = parseFloat(this.vel);

      if (isNaN(massa) || isNaN(velocidade) || massa <= 0 || velocidade < 0) {
        this.resultado = "Informe valores validos. A massa deve ser maior que zero e a velocidade nao pode ser negativa.";
        this.classeResultado = "estado-erro";
        this.faixaEnergia = "Dados invalidos";
        return;
      }

      const energia = (massa * velocidade * velocidade) / 2;

      if (energia < 1000) {
        this.resultado = `Energia cinetica: ${energia.toFixed(2)} J. Nivel baixo de intensidade.`;
        this.classeResultado = "estado-baixa";
        this.faixaEnergia = "Baixa";
      } else if (energia < 5000) {
        this.resultado = `Energia cinetica: ${energia.toFixed(2)} J. Nivel moderado de intensidade.`;
        this.classeResultado = "estado-moderada";
        this.faixaEnergia = "Moderada";
      } else {
        this.resultado = `Energia cinetica: ${energia.toFixed(2)} J. Nivel alto de intensidade.`;
        this.classeResultado = "estado-alta";
        this.faixaEnergia = "Alta";
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
    radial-gradient(circle at 20% 20%, rgba(250, 204, 21, 0.22), transparent 20%),
    radial-gradient(circle at 80% 25%, rgba(249, 115, 22, 0.2), transparent 24%),
    linear-gradient(160deg, #130b2c 0%, #211045 44%, #3a1e62 100%);
}

* {
  box-sizing: border-box;
}

.page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  overflow: hidden;
  font-family: "Verdana", "Segoe UI", sans-serif;
}

.energy-ring {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
}

.ring-left {
  width: 280px;
  height: 280px;
  left: -100px;
  top: 80px;
  box-shadow: 0 0 80px rgba(250, 204, 21, 0.16);
}

.ring-right {
  width: 340px;
  height: 340px;
  right: -120px;
  bottom: 40px;
  box-shadow: 0 0 90px rgba(249, 115, 22, 0.16);
}

.panel {
  position: relative;
  width: 100%;
  max-width: 540px;
  padding: 34px 30px;
  border-radius: 30px;
  background: rgba(18, 11, 40, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.35);
  color: #fff8eb;
}

.panel-header {
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 10px;
  color: #fbbf24;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.panel-header h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 2.8rem);
  line-height: 1.05;
}

.subtitle {
  margin: 12px 0 0;
  color: rgba(255, 248, 235, 0.72);
  line-height: 1.55;
}

.input-grid {
  display: grid;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field span {
  font-size: 0.9rem;
  font-weight: 700;
  color: #fde68a;
}

input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid rgba(250, 204, 21, 0.18);
  background: rgba(37, 21, 75, 0.82);
  color: #fffdf8;
  font-size: 1rem;
  transition: border-color 0.24s ease, box-shadow 0.24s ease, transform 0.24s ease;
}

input::placeholder {
  color: rgba(255, 248, 235, 0.34);
}

input:focus {
  outline: none;
  border-color: #f59e0b;
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.14);
  transform: translateY(-1px);
}

button {
  width: 100%;
  margin-top: 22px;
  padding: 15px 18px;
  border: none;
  border-radius: 18px;
  background: linear-gradient(135deg, #facc15 0%, #f97316 56%, #ef4444 100%);
  color: #2a0f2b;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 16px 26px rgba(249, 115, 22, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  filter: brightness(1.03);
  box-shadow: 0 20px 30px rgba(249, 115, 22, 0.32);
}

.legend {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
}

.legend-item {
  padding: 10px 12px;
  border-radius: 14px;
  font-size: 0.78rem;
  font-weight: 700;
  text-align: center;
}

.legend-item.baixa {
  background: rgba(56, 189, 248, 0.12);
  color: #7dd3fc;
}

.legend-item.moderada {
  background: rgba(250, 204, 21, 0.14);
  color: #fde68a;
}

.legend-item.alta {
  background: rgba(248, 113, 113, 0.14);
  color: #fca5a5;
}

.result-card {
  margin-top: 22px;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid transparent;
}

.result-chip {
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

.estado-baixa {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.16), rgba(37, 99, 235, 0.12));
  border-color: rgba(56, 189, 248, 0.26);
  color: #e0f2fe;
}

.estado-baixa .result-chip {
  background: rgba(56, 189, 248, 0.18);
  color: #7dd3fc;
}

.estado-moderada {
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.18), rgba(245, 158, 11, 0.12));
  border-color: rgba(250, 204, 21, 0.28);
  color: #fef3c7;
}

.estado-moderada .result-chip {
  background: rgba(250, 204, 21, 0.18);
  color: #fde68a;
}

.estado-alta {
  background: linear-gradient(135deg, rgba(248, 113, 113, 0.18), rgba(239, 68, 68, 0.12));
  border-color: rgba(248, 113, 113, 0.28);
  color: #ffe4e6;
}

.estado-alta .result-chip {
  background: rgba(248, 113, 113, 0.18);
  color: #fecdd3;
}

.estado-erro {
  background: linear-gradient(135deg, rgba(148, 163, 184, 0.18), rgba(71, 85, 105, 0.18));
  border-color: rgba(148, 163, 184, 0.26);
  color: #e2e8f0;
}

.estado-erro .result-chip {
  background: rgba(148, 163, 184, 0.18);
  color: #cbd5e1;
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
  .panel {
    padding: 26px 18px;
  }

  .legend {
    grid-template-columns: 1fr;
  }
}
</style>
