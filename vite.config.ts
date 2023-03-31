import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import electron from 'vite-plugin-electron'

console.log(electron)
export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: "electron/index.js", // 主进程文件
      },
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        //打包时移除console
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    }
  },
  server: {
    port: 2048,

    proxy: {
      /* 视频解析接口 python */
      '/videoParsingApi': {
        target: 'http://127.0.0.1:5000/electron/getVideoList',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/videoParsingApi/, '')
      }
    }
  }
})
