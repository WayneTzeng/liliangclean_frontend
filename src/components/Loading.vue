<template>
  <div class="loading">
    <div class="loading-block">
      <div class="loading-animation">
        <img
          :src="loadingCircle"
          alt="animation-image"
          class="loading-animation__image"
        />
      </div>
    </div>

    <Overlay class="loading__overlay" dark />
  </div>
</template>

<script>
import loadingCircle from '../assets/image/icon/icon-loading-circle.svg'
import Overlay from './Overlay.vue'
export default {
  name: 'LoadingComponent',
  components: {
    Overlay,
  },
  setup() {
    return {
      loadingCircle,
    }
  },
}
</script>

<style lang="scss" scoped>
.loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 12000;
  top: 0;
  left: 0;
  .loading-block {
    width: 144px;
    height: 108px;
    background-color: var(--beige);
    border-radius: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
  }
  .loading-animation {
    text-align: center;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;

    &__image {
      animation: rolling 1200ms infinite;

      @keyframes rolling {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
