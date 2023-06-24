import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

export { store };

import './assets/style/index.scss';

document.addEventListener('contextmenu', (event) => event.preventDefault());

const app = createApp(App);

app.use(store).use(router).mount('#app');

const IS_DEBUG_ENABLED = process.env.VUE_APP_ENABLE_DEBUG === 'true';
const IS_USE_MOCK = process.env.VUE_APP_USE_MOCK === 'true';

IS_USE_MOCK && console.info('VITE_USE_MOCK');

if (!IS_DEBUG_ENABLED) {
  const emptyFunciton = () => {
    /* do nothing */
  };
  console.debug = emptyFunciton;
  console.info = emptyFunciton;
  console.log = emptyFunciton;
  console.warn = emptyFunciton;
  console.error = emptyFunciton;
  window.alert = emptyFunciton;
}
