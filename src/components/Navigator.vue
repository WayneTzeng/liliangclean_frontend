<template>
  <div class="navigator">
    <div class="logo__block" @click="goto(page.index)">
      <img :src="ImageLogo" />
    </div>
    <div class="menu__block use-in-pc">
      <div
        class="menu__item"
        :class="{ active: currenPage === page.service }"
        @click="goto(page.service)"
      >
        服務內容
      </div>
      <div
        class="menu__item"
        :class="{ active: currenPage === page.notice }"
        @click="goto(page.notice)"
      >
        客戶須知
      </div>
      <div
        class="menu__item"
        :class="{ active: currenPage === page.member }"
        @click="goto(page.member)"
      >
        會員
      </div>
    </div>
    <div class="menu__block-mobile use-in-mobile">
      <img v-if="!isMenuOpen" :src="IconMenu" @click.capture="handleClick" />
      <img v-else :src="IconMenuCross" @click.capture="handleClick" />
    </div>
  </div>
  <div v-if="isMenuOpen" class="menu__extend use-in-mobile">
    <div
      class="menu__item"
      :class="{ active: currenPage === page.member }"
      @click="goto(page.member)"
    >
      會員
    </div>
    <div
      class="menu__item"
      :class="{ active: currenPage === page.service }"
      @click="goto(page.service)"
    >
      服務內容
    </div>
    <div
      class="menu__item"
      :class="{ active: currenPage === page.notice }"
      @click="goto(page.notice)"
    >
      客戶須知
    </div>
  </div>
</template>

<script>
const PAGE = {
  index: 'Index',
  service: 'Service',
  notice: 'Notice',
  member: 'Member',
}

import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ImageLogo from '../assets/image/image/image-logo.png'
import IconMenu from '../assets/image/icon/icon-menu.svg'
import IconMenuCross from '../assets/image/icon/icon-menu-cross.svg'

export default {
  name: 'NavigatorTop',
  setup() {
    const router = useRouter()
    const route = useRoute()

    const isMenuOpen = ref(false)
    const handleClick = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const page = ref(PAGE)
    const currenPage = computed(() => {
      return route.name
    })

    const goto = (page) => {
      isMenuOpen.value = false
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      router.push({ name: page })
    }

    return {
      isMenuOpen,
      page,
      currenPage,
      handleClick,
      goto,
      ImageLogo,
      IconMenu,
      IconMenuCross,
    }
  },
}
</script>

<style lang="scss" scoped>
.navigator {
  width: calc(100vw); //calc(100vw - 60px)
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

@media (max-width: 530px) {
  .navigator {
    .logo__block {
      width: 180px;
      img {
        width: 100%;
      }
    }
  }
}

@media (max-width: 460px) {
  .navigator {
    width: calc(100vw); // calc(100vw - 40px)
    padding: 10px 20px 10px 20px;

    .logo__block {
      width: 100px;
      img {
        width: 100%;
      }
    }
    .menu__block-mobile {
      img {
        width: 25px;
      }
    }
  }
  .menu__extend {
    width: 100%;
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 40;
    box-shadow: 0px 0px 8px 0px #888888;

    .menu__item {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--height-light);
      font-size: var(--font-l);
      background-color: var(--second);

      &.active {
        color: var(--brown);
        background-color: var(--height-light);
      }
    }
    .menu__item ~ .menu__item {
      border-top: 1px solid var(--beige);
    }
  }
}
</style>
