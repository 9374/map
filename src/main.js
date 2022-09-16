import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vfonts/Lato.css' // 通用字体
import 'vfonts/FiraCode.css' // 等宽字体
import {
  // create naive ui
  create,
  // component
  NSpace,
  NSwitch,
  NMessageProvider,
  NButton,
  NLayout,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutSider,
  NMenu
} from 'naive-ui'
const naive = create({
  components: [
    NButton,
    NMessageProvider,
    NSpace,
    NSwitch,
    NLayout,
    NLayoutHeader,
    NLayoutFooter,
    NLayoutSider,
    NMenu,
  ],
})
createApp(App).use(store).use(router).use(naive).mount('#app')
