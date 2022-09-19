import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vfonts/Lato.css' // 通用字体
import 'vfonts/FiraCode.css' // 等宽字体
// import Router from 'vue-router'
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
  NMenu,
  NPopselect,
  NDialogProvider,
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
    NPopselect,
    NDialogProvider,
  ],
})
//解决路由报错
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject)
//     return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch((err) => err)
// }
createApp(App).use(store).use(router).use(naive).mount('#app')
