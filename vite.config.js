import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), AutoImport({
    // https://github.com/unplugin/unplugin-auto-import
    imports: ['vue', 'vue-router'],
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: true,
    },
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'es', // 打包后文件目录
    minify: false, // 压缩
    rollupOptions: {
      external: ['vue'], // 忽略打包vue文件
      // input: ["index.ts"],
      output: {
        globals: {
          vue: 'Vue',
        },
        dir: 'dist',
      },
    },
    lib: {
      entry: resolve(__dirname, './src/components/index.js'),
      name: 'main',
      fileName: 'main',
      // formats: ['es', 'umd', 'cjs']
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
    },
  },
})
