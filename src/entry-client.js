import { createApp } from './main'
const { app, router } = createApp()

import vuetify from './plugin/vuetify'
import './assets/style/index.scss'
import 'vuetify/styles'

router.isReady().then(() => {
  app.use(vuetify).mount('#app')
})
