import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vfonts/Lato.css' // 通用字体
import 'vfonts/FiraCode.css' // 等宽字体
createApp(App).use(store).use(router).mount('#app')
