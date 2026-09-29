import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/nome-do-teu-repositorio/' // Reemplaza pelo nome EXATO do teu repositório no GitHub (com as barras)
})
