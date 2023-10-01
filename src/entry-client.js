import { createApp } from './main'
const { app, router, pinia } = createApp()

import vuetify from './plugin/vuetify'
import './assets/style/index.scss'
import 'vuetify/styles'

router.isReady().then(() => {
  if (window.__INITIAL_STATE__) {
    pinia.state.value = JSON.parse(window.__INITIAL_STATE__)
  }

  app.use(vuetify).mount('#app')
})
