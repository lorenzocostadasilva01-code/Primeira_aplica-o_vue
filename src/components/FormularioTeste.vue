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
  <div v-if="telaAtual === 'form'" class="container">
    <h2>Formulário de Teste</h2>

    <form @submit.prevent="submeterFormulario" class="form">
      <div class="campo">
        <label for="nome">Nome:</label>
        <input id="nome" v-model="nome" type="text" placeholder="Digite o seu nome" required />
      </div>

      <div class="campo">
        <label for="email">E-mail:</label>
        <input id="email" v-model="email" type="email" placeholder="exemplo@email.com" required />
      </div>

      <button type="submit" class="btn-submeter" :disabled="carregando">
        {{ carregando ? 'A enviar...' : 'Enviar Dados' }}
      </button>
    </form>

    <button class="btn-listar" @click="verTodosOsDados">
      Ver todos os dados
    </button>

    <div v-if="mensagemErro" class="erro">
      <p><strong>Erro:</strong> {{ mensagemErro }}</p>
    </div>

    <div v-if="dadosEnviados" class="resultado">
      <h3>Dados enviados com sucesso!</h3>
      <p><strong>Nome:</strong> {{ dadosEnviados.nome }}</p>
      <p><strong>E-mail:</strong> {{ dadosEnviados.email }}</p>
    </div>
  </div>

  <div v-else class="container tabela-container">
    <h2>Lista de nomes salvos</h2>

    <div v-if="mensagemErro" class="erro">
      <p><strong>Erro:</strong> {{ mensagemErro }}</p>
    </div>

    <table v-if="listaUsuarios.length" class="tabela">
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

    <p v-else class="vazio">Nenhum nome encontrado.</p>

    <button class="btn-voltar" @click="voltarAoFormulario">
      Voltar ao formulário
    </button>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
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

.campo input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-submeter,
.btn-listar,
.btn-voltar {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
}

.btn-listar,
.btn-voltar {
  background-color: #2563eb;
}

.btn-submeter:hover:not(:disabled) {
  background-color: #33a06f;
}

.btn-submeter:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.resultado {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
}

.erro {
  margin-top: 20px;
  padding: 15px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  border-radius: 6px;
}

.tabela-container {
  max-width: 700px;
}

.tabela {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.tabela th,
.tabela td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.tabela th {
  background-color: #f3f4f6;
}

.vazio {
  margin-top: 20px;
  color: #666;
}
</style>