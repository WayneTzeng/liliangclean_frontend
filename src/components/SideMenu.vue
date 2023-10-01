<template>
  <div class="side-menu">
    <div class="line">
      <a href="https://lin.ee/8qurIGn"><img :src="IconLine" /></a>
    </div>
    <div class="go-to-top">
      <img :src="IconGoToTop" />
    </div>
  </div>
</template>

<script>
import IconGoToTop from '../assets/image/icon/icon-go-to-top.png'
import IconLine from '../assets/image/icon/icon-line.png'

export default {
  name: 'GoToTopComponent',
  setup() {
    return {
      IconGoToTop,
      IconLine
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu {
  width: 50px;
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 9999;
  display: flex;
  flex-direction: column;

  div ~ div {
    margin-top: 16px;
  }
}
.line,
.go-to-top {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0px 2px 4px 0px #666666;
  overflow: hidden;

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
