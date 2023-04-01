import { createApp } from 'vue'
import '@/assets/style/style.css'
import '@/assets/style/elementLzy.scss'
import '@/assets/font/font.css'

import App from './App.vue'
//导入element-plus
import 'element-plus/dist/index.css'


import { router } from "@/router/index";


createApp(App)
  .use(router)
  .mount('#app')
