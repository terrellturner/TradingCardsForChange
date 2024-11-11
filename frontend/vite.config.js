import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(env.VITE_PROXY);
  
  return({plugins: [react()],
  server: {
    proxy: {
      '/api': env.VITE_PROXY
    },
  },})
  
})
