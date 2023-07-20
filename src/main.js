import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugin/vuetify'
import './assets/style/index.scss'
import 'vuetify/styles' // 引入 Vuetify 的 CSS 样式

export { store }

document.addEventListener('contextmenu', (event) => event.preventDefault())

const app = createApp(App)
app.use(store).use(router).use(vuetify).mount('#app')

const IS_DEBUG_ENABLED = true
if (!IS_DEBUG_ENABLED) {
  const emptyFunciton = () => {
    /* do nothing */
  }
  console.debug = emptyFunciton
  console.info = emptyFunciton
  console.log = emptyFunciton
  console.warn = emptyFunciton
  console.error = emptyFunciton
  window.alert = emptyFunciton
}
