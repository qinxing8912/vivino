import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base:'/vivino/',
  // plugins: [vue()],
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
   //开发配置  npm run dev
  server: {
    // port: 3000,//端口号
    // strictPort: true,//是否是严格的端口号，如果true，端口号被占用的情况下，vite会退出
    host: '192.168.0.49',
    // cors: true,//为开发服务器配置 CORS , 默认启用并允许任何源
    // https: false,//是否支持http2 如果配置成true 会打开https://localhost:3001/xxx;
    //open: true,//是否自动打开浏览器
    // 反向代理 跨域配置
    proxy: {
        '/app-api': {
            // target: 'https://vivino.cc/',
            target: 'http://dev.vivino.cc/',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/app-api/, '')
        }
    }
},
  // 打包配置 npm run build
  build:{
    //生成静态资源的存放路径
    assetsDir:"static",
    rollupOptions:{
      input:{
        index:resolve(__dirname,"index.html"),
      },
      //js,css和img资源分别分门别类在js/css/img文件夹中
      output:{
        chunkFileNames:'static/js/[name]-[hash].js',
        entryFileNames:"static/js/[name]-[hash].js",
        assetFileNames:"static/[ext]/name-[hash].[ext]"
      }
    },
  },
})
