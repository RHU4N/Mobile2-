<template>
  <div class="page">
    <div class="hero-glow hero-glow-left"></div>
    <div class="hero-glow hero-glow-right"></div>

    <section class="panel">
      <div class="panel-header">
        <p class="eyebrow">Simulador de percurso</p>
        <h1>Velocidade Média</h1>
        <p class="subtitle">
          Informe a distância e o tempo para descobrir o ritmo da viagem.
        </p>
      </div>

      <div class="form-grid">
        <label class="field">
          <span>Distância percorrida</span>
          <input
            type="number"
            v-model="distancia"
            placeholder="Ex.: 120"
            min="0"
            step="0.1"
          />
        </label>

        <label class="field">
          <span>Tempo gasto</span>
          <input
            type="number"
            v-model="tempo"
            placeholder="Ex.: 2"
            min="0"
            step="0.1"
          />
        </label>
      </div>

      <button @click="calcularVelM">Calcular Velocidade Média</button>

      <div class="legend">
        <div class="legend-item baixa">Baixa ate 30 km/h</div>
        <div class="legend-item moderada">Moderada de 30 a 60 km/h</div>
        <div class="legend-item alta">Alta acima de 60 km/h</div>
      </div>

      <transition name="result-fade">
        <div
          v-if="resultado"
          :class="['result-card', classeResultado]"
        >
          <div class="result-badge">{{ faixaLabel }}</div>
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
      distancia: "",
      tempo: "",
      resultado: "",
      classeResultado: "",
      faixaLabel: "",
    };
  },
  methods: {
    calcularVelM() {
      const distancia = parseFloat(this.distancia);
      const tempo = parseFloat(this.tempo);

      if (isNaN(distancia) || isNaN(tempo) || distancia < 0 || tempo <= 0) {
        this.resultado = "Informe valores validos para distancia e tempo.";
        this.classeResultado = "estado-erro";
        this.faixaLabel = "Dados invalidos";
        return;
      }

      const velM = distancia / tempo;

      if (velM <= 30) {
        this.resultado = `Velocidade media: ${velM.toFixed(2)} km/h. Ritmo lento e controlado.`;
        this.classeResultado = "estado-baixa";
        this.faixaLabel = "Velocidade baixa";
      } else if (velM <= 60) {
        this.resultado = `Velocidade media: ${velM.toFixed(2)} km/h. Ritmo equilibrado.`;
        this.classeResultado = "estado-moderada";
        this.faixaLabel = "Velocidade moderada";
      } else {
        this.resultado = `Velocidade media: ${velM.toFixed(2)} km/h. Ritmo acelerado.`;
        this.classeResultado = "estado-alta";
        this.faixaLabel = "Velocidade alta";
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
    radial-gradient(circle at top left, rgba(11, 132, 255, 0.22), transparent 28%),
    radial-gradient(circle at bottom right, rgba(255, 122, 61, 0.2), transparent 24%),
    linear-gradient(145deg, #081120 0%, #0e1f3a 46%, #132b4f 100%);
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
  font-family: "Trebuchet MS", "Segoe UI", sans-serif;
}

.hero-glow {
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 999px;
  filter: blur(18px);
  opacity: 0.45;
}

.hero-glow-left {
  top: 40px;
  left: -60px;
  background: rgba(34, 211, 238, 0.35);
}

.hero-glow-right {
  right: -60px;
  bottom: 40px;
  background: rgba(251, 146, 60, 0.32);
}

.panel {
  position: relative;
  width: 100%;
  max-width: 520px;
  padding: 34px 30px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 28px;
  background: rgba(7, 15, 29, 0.7);
  backdrop-filter: blur(18px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.32);
  color: #f5f7ff;
}

.panel-header {
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 10px;
  color: #7dd3fc;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.panel-header h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 2.6rem);
  line-height: 1.05;
}

.subtitle {
  margin: 12px 0 0;
  color: rgba(245, 247, 255, 0.72);
  line-height: 1.5;
}

.form-grid {
  display: grid;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field span {
  color: #dbeafe;
  font-size: 0.88rem;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(148, 163, 184, 0.26);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.8);
  color: #f8fafc;
  font-size: 1rem;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

input::placeholder {
  color: rgba(226, 232, 240, 0.35);
}

input:focus {
  outline: none;
  border-color: #38bdf8;
  transform: translateY(-1px);
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.14);
}

button {
  width: 100%;
  margin-top: 22px;
  padding: 15px 18px;
  border: none;
  border-radius: 18px;
  background: linear-gradient(135deg, #38bdf8 0%, #2563eb 52%, #f97316 100%);
  color: #f8fafc;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 16px 28px rgba(37, 99, 235, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 34px rgba(37, 99, 235, 0.34);
  filter: saturate(1.08);
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
  border: 1px solid transparent;
}

.legend-item.baixa {
  background: rgba(14, 165, 233, 0.12);
  border-color: rgba(14, 165, 233, 0.35);
  color: #7dd3fc;
}

.legend-item.moderada {
  background: rgba(250, 204, 21, 0.12);
  border-color: rgba(250, 204, 21, 0.32);
  color: #fde68a;
}

.legend-item.alta {
  background: rgba(249, 115, 22, 0.12);
  border-color: rgba(249, 115, 22, 0.34);
  color: #fdba74;
}

.result-card {
  margin-top: 22px;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid transparent;
}

.result-badge {
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
  background: linear-gradient(135deg, rgba(8, 145, 178, 0.18), rgba(14, 116, 144, 0.1));
  border-color: rgba(34, 211, 238, 0.28);
  color: #cffafe;
}

.estado-baixa .result-badge {
  background: rgba(34, 211, 238, 0.16);
  color: #67e8f9;
}

.estado-moderada {
  background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(161, 98, 7, 0.12));
  border-color: rgba(250, 204, 21, 0.3);
  color: #fef3c7;
}

.estado-moderada .result-badge {
  background: rgba(250, 204, 21, 0.18);
  color: #fde047;
}

.estado-alta {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(194, 65, 12, 0.12));
  border-color: rgba(251, 146, 60, 0.3);
  color: #ffedd5;
}

.estado-alta .result-badge {
  background: rgba(249, 115, 22, 0.18);
  color: #fdba74;
}

.estado-erro {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(127, 29, 29, 0.14));
  border-color: rgba(248, 113, 113, 0.32);
  color: #fee2e2;
}

.estado-erro .result-badge {
  background: rgba(248, 113, 113, 0.18);
  color: #fca5a5;
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
