import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
// 引入wxShare
import wxShare from './utils/wxShare'

const app = createApp(App)
// 全局挂载wxShare
app.config.globalProperties.$wxShare = wxShare;

app.use(createPinia())
app.use(router)

app.mount('#app')
