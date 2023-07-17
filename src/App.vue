<template>
  <Login v-if="showLogin" />
  <Navigator />
  <div class="router-view">
    <RouterView id="routerview" />
  </div>
  <BottomInfo />
  <GoToTop @click="goToTop" />
  <Loading v-if="showLoading" />
  <Popup v-model:show="showDialog" :action="dialogAction">
    {{ dialogMessage }}
  </Popup>
</template>

<script>
import emitter from './helpers/emitter'
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Navigator from './components/Navigator.vue'
import Login from './components/login.vue'
import BottomInfo from './components/BottomInfo.vue'
import GoToTop from './components/GoToTop.vue'
import Loading from './components/Loading.vue'
import Popup from './components/Popup.vue'
import { showLoading } from './helpers/loading.js'

export default {
  name: 'App',
  components: {
    Navigator,
    Login,
    BottomInfo,
    GoToTop,
    RouterView,
    Loading,
    Popup,
  },
  setup() {
    emitter.on('callMessager', (data) => callMessager(data))

    const showDialog = ref(false)
    const dialogMessage = ref('')
    const dialogAction = ref(() => {})

    const callMessager = (data) => {
      showDialog.value = true
      dialogMessage.value = data.message
      dialogAction.value = data.action
    }

    emitter.on('callLogin', (data) => showLoginBlock(data))

    const showLogin = ref(false)
    const showLoginBlock = (status) => {
      showLogin.value = status
    }

    const goToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

    return {
      showDialog,
      showLogin,
      showLoading,
      dialogMessage,
      dialogAction,
      goToTop,
    }
  },
}
</script>

<style lang="scss">
* {
  -webkit-touch-callout: none; /*系統預設選單被禁用*/
  -webkit-user-select: none; /*webkit瀏覽器*/
  -khtml-user-select: none; /*早期瀏覽器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
  touch-action: pan-x pan-y;
}
.router-view {
  margin-top: 75px;
  background: #efe8e1;
}

@media (max-width: 460px) {
  .router-view {
    margin-top: 47px;
  }
}
</style>
