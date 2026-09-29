<script setup>
import {ref} from 'vue'

const props = defineProps({
    texto:{
        type:String,
        default:"Clique aqui"
    }
})

const contador = ref(0)

function incrementar(){
    contador.value++
}
</script>

<template>
  <div class="card-botao">
    <button @click="incrementar" class="btn">
      {{ texto }}
    </button>
    <p>Clicado {{ contador }} vezes</p>
  </div>
</template>

<style scoped>
.card-botao{
    margin: 10px;
}

.btn{
    background-color: #42b983;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.btn:hover{
    background-color: #33a06f;
}

</style>