<template>
  <div class="navigator">
    <div class="logo__block" @click="goto('index')">
      <img :src="ImageLogo" />
    </div>
    <!-- <div class="menu__block">
      <div class="menu__item" @click="goto('Service')">服務內容</div>
      <div class="menu__item" @click="goto('Notice')">客戶須知</div>
    </div> -->
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import ImageLogo from '../assets/image/image/image-logo.png';

export default {
  name: 'Navigator',
  setup() {
    const router = useRouter();

    const goto = (page) => {
      router.push({ name: page });
    };

    return {
      goto,
      ImageLogo,
    };
  },
};
</script>

<style lang="scss" scoped>
.navigator {
  width: calc(100vw - 60px);
  padding: 5px 30px;
  position: fixed;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--beige);
  box-shadow: 0px 0px 8px 0px #888888;

  .logo__block {
    cursor: pointer;
  }
  .menu__block {
    display: flex;
    justify-content: flex-start;
  }
  .menu__item {
    color: var(--brown);
    font-size: var(--font-l);
    font-weight: 600;
    cursor: pointer;
  }
  .menu__item ~ .menu__item {
    margin-left: 20px;
  }
}

@media (max-width: 460px) {
  .navigator {
    width: calc(100vw - 40px);
    padding: 10px 20px 10px 20px;

    .logo__block {
      width: 100px;
      img {
        width: 100%;
      }
    }
    .menu__item {
      font-size: var(--mobile-font-l);
    }
  }
}
</style>
