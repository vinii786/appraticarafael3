import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://verbose-fiesta-wqq4gv7p4wq396j6-8080.app.github.dev',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
