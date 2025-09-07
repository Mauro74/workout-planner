import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Allow external connections for mobile testing
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps for production
    minify: 'terser', // Use terser for better minification
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          styled: ['styled-components']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  base: './', // Use relative paths for deployment flexibility
  preview: {
    port: 3000,
    host: true,
  }
})
