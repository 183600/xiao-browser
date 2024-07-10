import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
    build: {
    copy: [
      {
        from: 'manifest.json',
        to: 'dist/manifest.json'
      },
      {
        from: 'src/icons',
        to: 'dist/icons'
      }
    ]
  }
})
