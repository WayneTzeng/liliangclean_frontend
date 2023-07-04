<template>
  <Navigator id="navigator" />
  <div class="router-view">
    <RouterView id="routerview" />
  </div>
  <Footer />
  <GoToTop @click="goToTop" />
  <Loading v-if="showLoading" />
  <Dialog v-model:show="showDialog" :action="dialogAction">
    {{ dialogMessage }}
  </Dialog>
</template>

<script>
import emitter from './helpers/emitter';
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Navigator from './components/Navigator.vue';
import Footer from './components/Footer.vue';
import GoToTop from './components/GoToTop.vue';
import Loading from './components/Loading.vue';
import Dialog from './components/Dialog.vue';
import { showLoading } from './helpers/loading.js';

export default {
  name: 'App',
  components: {
    Navigator,
    Footer,
    GoToTop,
    RouterView,
    Loading,
    Dialog,
  },
  setup() {
    emitter.on('callMessager', (data) => callMessager(data));

    const showDialog = ref(false);
    const dialogMessage = ref('');
    const dialogAction = ref(() => {});

    const callMessager = (data) => {
      showDialog.value = true;
      dialogMessage.value = data.message;
      dialogAction.value = data.action;
    };

    const goToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    return {
      showDialog,
      showLoading,
      dialogMessage,
      dialogAction,
      goToTop,
    };
  },
};
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
  margin-top: 105px;
  background: #efe8e1;
}

@media (max-width: 460px) {
  .router-view {
    margin-top: 47px;
  }
}
</style>
