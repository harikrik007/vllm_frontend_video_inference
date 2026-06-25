import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',  // listen on all interfaces
    port: 5173,
    proxy: {
      '/api/vllm': {
        //target: 'http://185.216.21.74:8000',
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/vllm/, '/v1'),
      },
    },
  },
})
