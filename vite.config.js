import {defineConfig} from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        }
    },
    build: {
        rollupOptions: {
            input: {
                popup: resolve("./src/popup/index.html"),
                background: resolve("./src/background/index.js"),
                content_scripts: resolve("./src/content_scripts/index.js")
            },
            output: {
                entryFileNames: '[name].js'
            }
        }
    }
})