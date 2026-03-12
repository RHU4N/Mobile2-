<template>
  <div class="page">
    <div class="card">
      <div class="card-header">
        <span class="icon">📊</span>
        <h1>Média Aritmética</h1>
        <p class="subtitle">Calcule sua média e veja o resultado</p>
      </div>

      <div class="form">
        <div class="input-group">
          <label>Primeira Nota</label>
          <input type="number" v-model="nota1" placeholder="0.0" min="0" max="10" step="0.1" />
        </div>
        <div class="input-group">
          <label>Segunda Nota</label>
          <input type="number" v-model="nota2" placeholder="0.0" min="0" max="10" step="0.1" />
        </div>

        <button @click="calcularMedia">Calcular Média</button>
      </div>

      <transition name="fade">
        <div v-if="resultado !== ''" :class="['resultado-box', classeResultado]">
          <span class="result-icon">{{ classeResultado === 'Aprovado' ? '✅' : '❌' }}</span>
          <p>{{ resultado }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nota1: "",
      nota2: "",
      resultado: "",
      classeResultado: "",
    };
  },
  methods: {
    calcularMedia() {
      const n1 = parseFloat(this.nota1);
      const n2 = parseFloat(this.nota2);

      if (isNaN(n1) || isNaN(n2)) {
        this.resultado = "Por favor, insira ambas as notas.";
        this.classeResultado = "Reprovado";
        return;
      }

      const media = (n1 + n2) / 2;

      if (media >= 6) {
        this.resultado = `Média: ${media.toFixed(2)} — Aprovado!`;
        this.classeResultado = "Aprovado";
      } else {
        this.resultado = `Média: ${media.toFixed(2)} — Reprovado!`;
        this.classeResultado = "Reprovado";
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
  min-height: 100vh;
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Segoe UI', Arial, sans-serif;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: 40px 36px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  color: #fff;
}

.card-header {
  text-align: center;
  margin-bottom: 32px;
}

.icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.card-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.subtitle {
  margin-top: 6px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.55);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

input {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.25s, background 0.25s;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

input:focus {
  border-color: #7c3aed;
  background: rgba(124, 58, 237, 0.15);
}

button {
  margin-top: 6px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: opacity 0.2s, transform 0.15s;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.45);
}

button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

.resultado-box {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 16px 20px;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 600;
}

.result-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
}

.Aprovado {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.4);
  color: #86efac;
}

.Reprovado {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s, transform 0.35s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
