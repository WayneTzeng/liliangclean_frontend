<template>
  <div class="go-to-top">
    <img :src="IconGoToTop" />
  </div>
</template>

<script>
import IconGoToTop from '../assets/image/icon/icon-go-to-top.png';

export default {
  name: 'Footer',
  setup() {
    return {
      IconGoToTop,
    };
  },
};
</script>

<style lang="scss" scoped>
.go-to-top {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 50px;
  bottom: 50px;
  border-radius: 50%;
  box-shadow: 0px 2px 4px 0px #666666;
  z-index: 9999;
  img {
    width: 100%;
  }
}

@media (max-width: 460px) {
  .go-to-top {
    width: 45px;
    height: 45px;
    right: 25px;
    bottom: 25px;
  }
}
</style>
