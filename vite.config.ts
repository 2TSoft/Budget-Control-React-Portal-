import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative paths cho assets — cần thiết khi deploy lên Power Pages
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/_api': {
        target: process.env.VITE_PORTAL_URL ?? 'https://site-foo.powerappsportals.com',
        changeOrigin: true,
        secure: true,
        // Forward cookies cho Power Pages session authentication
        cookieDomainRewrite: 'localhost',
      },
    },
  },
})
