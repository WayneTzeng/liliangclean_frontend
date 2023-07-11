import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/index.scss'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives,
})

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
