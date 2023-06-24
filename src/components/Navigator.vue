<template>
  <div class="navigator">
    <div class="logo__block">
      <img :src="ImageLogo" />
    </div>
    <!-- <div class="menu__block">
      <div class="menu__item">預約流程</div>
      <div class="menu__item">清潔實績</div>
    </div> -->
  </div>
</template>

<script>
import ImageLogo from '../assets/image/image/image-logo.png';

export default {
  name: 'Navigator',
  setup() {
    return {
      ImageLogo,
    };
  },
};
</script>

<style lang="scss" scoped>
.navigator {
  width: calc(100vw - 120px);
  padding: 35px 60px 0 60px;
  position: fixed;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .menu__block {
    display: flex;
    justify-content: flex-start;
  }
  .menu__item {
    color: var(--black);
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
  }
  .menu__item ~ .menu__item {
    margin-left: 80px;
  }
}

@media (max-width: 460px) {
  .navigator {
    padding: 15px 25px 0 25px;

    .logo__block {
      width: 100px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
