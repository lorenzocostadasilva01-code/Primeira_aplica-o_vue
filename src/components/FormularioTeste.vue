<script setup>
import { ref } from 'vue'

const nome = ref('')
const email = ref('')
const telaAtual = ref('form')

const dadosEnviados = ref(null)
const mensagemErro = ref(null)
const carregando = ref(false)
const listaUsuarios = ref([])

async function submeterFormulario() {
  carregando.value = true
  mensagemErro.value = null
  dadosEnviados.value = null

  const dadosFormulario = {
    nome: nome.value,
    email: email.value
  }

  try {
    const resposta = await fetch('http://localhost/back/api/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosFormulario)
    })

    const resultado = await resposta.json()

    if (!resposta.ok) {
      throw new Error(resultado.mensagem || 'Erro ao enviar dados para o servidor.')
    }

    dadosEnviados.value = resultado.dadosRecebidos || resultado
    nome.value = ''
    email.value = ''
  } catch (erro) {
    mensagemErro.value = erro.message
  } finally {
    carregando.value = false
  }
}

async function verTodosOsDados() {
  try {
    const resposta = await fetch('http://localhost/back/api/api.php?action=listar', {
      method: 'GET'
    })

    const resultado = await resposta.json()

    if (!resposta.ok) {
      throw new Error(resultado.mensagem || 'Erro ao buscar dados.')
    }

    listaUsuarios.value = resultado.dados || []
    telaAtual.value = 'lista'
  } catch (erro) {
    mensagemErro.value = erro.message
  }
}

function voltarAoFormulario() {
  telaAtual.value = 'form'
  mensagemErro.value = null
}
</script>

<template>
  <div v-if="telaAtual === 'form'" class="page-shell">
    <div class="card form-card">
      <div class="header">
        <span class="badge">Cadastro</span>
        <h2>Formulário de Teste</h2>
      </div>

      <form @submit.prevent="submeterFormulario" class="form">
        <div class="campo">
          <label for="nome">Nome</label>
          <input id="nome" v-model="nome" type="text" placeholder="Digite o seu nome" required />
        </div>

        <div class="campo">
          <label for="email">E-mail</label>
          <input id="email" v-model="email" type="email" placeholder="exemplo@email.com" required />
        </div>

        <button type="submit" class="btn-primary" :disabled="carregando">
          {{ carregando ? 'A enviar...' : 'Enviar dados' }}
        </button>
      </form>

      <button class="btn-secondary" @click="verTodosOsDados">
        Ver todos os dados
      </button>

      <div v-if="mensagemErro" class="alert erro">
        <strong>Erro:</strong> {{ mensagemErro }}
      </div>

      <div v-if="dadosEnviados" class="alert sucesso">
        <h3>Dados enviados</h3>
        <p><strong>Nome:</strong> {{ dadosEnviados.nome }}</p>
        <p><strong>E-mail:</strong> {{ dadosEnviados.email }}</p>
      </div>
    </div>
  </div>

  <div v-else class="page-shell">
    <div class="card table-card">
      <div class="header">
        <span class="badge badge-blue">Lista</span>
        <h2>Usuários salvos</h2>
      </div>

      <div v-if="mensagemErro" class="alert erro">
        <strong>Erro:</strong> {{ mensagemErro }}
      </div>

      <div class="table-wrapper" v-if="listaUsuarios.length">
        <table class="tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in listaUsuarios" :key="usuario.id">
              <td>{{ usuario.id }}</td>
              <td>{{ usuario.nome }}</td>
              <td>{{ usuario.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else class="empty-state">Nenhum nome encontrado.</p>

      <button class="btn-secondary" @click="voltarAoFormulario">
        Voltar ao formulário
      </button>
    </div>
  </div>
</template>

<style scoped>
:global(body) {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #f5f7ff 0%, #e0f2fe 100%);
}

* {
  box-sizing: border-box;
}

.page-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
}

.card {
  width: min(100%, 560px);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(10px);
  padding: 28px;
}

.table-card {
  width: min(100%, 780px);
}

.header {
  margin-bottom: 24px;
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  background: #dcfce7;
  color: #166534;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.badge-blue {
  background: #dbeafe;
  color: #1d4ed8;
}

h2 {
  margin: 12px 0 0;
  font-size: 2rem;
  color: #0f172a;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #334155;
}

input {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f8fafc;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
  background: #fff;
}

button {
  border: none;
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 12px 24px rgba(16, 185, 129, 0.2);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  margin-top: 18px;
  width: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.2);
}

.alert {
  margin-top: 22px;
  border-radius: 14px;
  padding: 16px 18px;
  font-size: 0.95rem;
}

.alert h3 {
  margin: 0 0 10px;
  font-size: 1.1rem;
}

.alert p {
  margin: 6px 0;
}

.erro {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
}

.sucesso {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
}

.table-wrapper {
  overflow-x: auto;
  margin-top: 20px;
}

.tabela {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px #e2e8f0;
}

.tabela th,
.tabela td {
  padding: 14px 16px;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
}

.tabela th {
  background: #f8fafc;
  color: #334155;
  font-weight: 700;
}

.tabela tbody tr:hover {
  background: #f8fafc;
}

.empty-state {
  margin: 22px 0 0;
  color: #64748b;
  text-align: center;
  padding: 18px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
}

@media (max-width: 640px) {
  .card {
    padding: 20px;
    border-radius: 18px;
  }

  h2 {
    font-size: 1.5rem;
  }

  .btn-primary,
  .btn-secondary {
    font-size: 0.95rem;
  }
}
</style>