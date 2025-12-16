import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Catch any request starting with "/api"
      '/api': {
        // Forward it to the Django backend
        target: 'http://localhost:8000',

        // Needed for virtual hosted sites (changes the Host header to match the target)
        changeOrigin: true,

        // Use this if you are NOT using HTTPS on localhost (standard for dev)
        secure: false,

        // Optional: If your backend expects '/recipes' instead of '/api/recipes',
        // you would uncomment the line below to strip '/api' from the path.
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
