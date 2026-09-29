<script setup>
import {ref} from 'vue'

const nome = ref("")
const email = ref("")
const nivel = ref("Iniciante")
const aceitouTermos = ref(false)

const dadosEnviados = ref(null)

function submeterFormulario(){
    dadosEnviados.value = {
        nome: nome.value,
        email: email.value,
        nivel: nivel.value,
        aceitouTermos: aceitouTermos.value
    }
    nome.value = ""
    email.value = ""
    nivel.value = "Iniciante"
    aceitouTermos.value = false
}
</script>
<template>
  <div class="container">
    <h2>Formulário de Teste</h2>

    <!-- .prevent impede o recarregamento padrão da página -->
    <form @submit.prevent="submeterFormulario" class="form">
      <div class="campo">
        <label for="nome">Nome:</label>
        <input 
          id="nome" 
          v-model="nome" 
          type="text" 
          placeholder="Digita o teu nome" 
          required 
        />
      </div>

      <div class="campo">
        <label for="email">E-mail:</label>
        <input 
          id="email" 
          v-model="email" 
          type="email" 
          placeholder="exemplo@email.com" 
          required 
        />
      </div>

      <div class="campo">
        <label for="nivel">Nível em Vue:</label>
        <select id="nivel" v-model="nivel">
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>
      </div>

      <div class="campo-checkbox">
        <label>
          <input type="checkbox" v-model="aceitouTermos" required />
          Aceito os termos de teste
        </label>
      </div>

      <button type="submit" class="btn-submeter">Enviar Dados</button>
    </form>

    <!-- Exibição do resultado do formulário -->
    <div v-if="dadosEnviados" class="resultado">
      <h3>Dados Recebidos com Sucesso:</h3>
      <p><strong>Nome:</strong> {{ dadosEnviados.nome }}</p>
      <p><strong>E-mail:</strong> {{ dadosEnviados.email }}</p>
      <p><strong>Nível:</strong> {{ dadosEnviados.nivel }}</p>
      <p><strong>Termos Aceites:</strong> {{ dadosEnviados.aceitouTermos ? 'Sim' : 'Não' }}</p>
    </div>
  </div>
</template>
<style scoped>
.container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: sans-serif;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.campo input,
.campo select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.campo-checkbox {
  display: flex;
  align-items: center;
}

.btn-submeter {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-submeter:hover {
  background-color: #33a06f;
}

.resultado {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
}
</style>
