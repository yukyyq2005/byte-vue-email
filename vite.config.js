import { fileURLToPath, URL } from 'node:url'
import removeConsole from 'vite-plugin-remove-console'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // removeConsole()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  esbuild:{
    pure:['console.log']
  },
})
