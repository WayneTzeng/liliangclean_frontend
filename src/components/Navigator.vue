<template>
  <div class="navigator">
    <div class="logo__block" @click="goto(PAGE.index)">
      <img :src="ImageLogo" />
    </div>
    <div class="menu__block">
      <div
        class="menu__item"
        :class="{ active: currenPage === PAGE.service }"
        @click="goto(PAGE.service)"
      >
        服務項目
      </div>
      <div
        class="menu__item"
        :class="{
          active:
            currenPage === PAGE.performance ||
            currenPage === PAGE.articleList ||
            currenPage === PAGE.article,
        }"
        @click="goto(PAGE.performance)"
      >
        清潔實績
      </div>
      <div
        class="menu__item"
        :class="{ active: currenPage === PAGE.notice }"
        @click="goto(PAGE.notice)"
      >
        常見問題
      </div>
      <div
        class="menu__item"
        :class="{
          active: currenPage === PAGE.reserve || currenPage === PAGE.reservePay,
        }"
      >
        預約
        <div class="menu__sub-item">
          <div @click="goToReserve(0)">居家清潔</div>
          <div @click="goToReserve(1)">裝潢細清跟空屋清潔</div>
          <div @click="goToReserve(2)">水洗沙發、床墊</div>
          <div @click="goToReserve(3)">辦公室清潔</div>
          <div @click="goToReserve(4)">收納</div>
        </div>
      </div>
      <div
        class="menu__item"
        :class="{ active: currenPage === PAGE.member }"
        @click="goto(PAGE.member)"
      >
        會員
      </div>
    </div>
    <div class="menu__block-mobile">
      <img v-if="!isMenuOpen" :src="IconMenu" @click.capture="handleClick" />
      <img v-else :src="IconMenuCross" @click.capture="handleClick" />
    </div>
  </div>
  <div v-if="isMenuOpen" class="menu__extend use-in-mobile-760">
    <div
      v-if="!IS_PRD"
      class="menu__item"
      :class="{ active: currenPage === PAGE.member }"
      @click="goto(PAGE.member)"
    >
      會員
    </div>
    <div
      class="menu__item"
      :class="{ active: currenPage === PAGE.service }"
      @click="goto(PAGE.service)"
    >
      服務項目
    </div>
    <div
      class="menu__item"
      :class="{
        active:
          currenPage === PAGE.performance ||
          currenPage === PAGE.articleList ||
          currenPage === PAGE.article,
      }"
      @click="goto(PAGE.performance)"
    >
      清潔實績
    </div>
    <div
      class="menu__item"
      :class="{
        active: currenPage === PAGE.reserve || currenPage === PAGE.reservePay,
      }"
      @click="handleItemClick"
    >
      預約
    </div>
    <div class="menu__sub-item" :class="{ active: isSubitemOpen }">
      <div @click="goToReserve(0)">居家清潔</div>
      <div @click="goToReserve(1)">裝潢細清跟空屋清潔</div>
      <div @click="goToReserve(2)">水洗沙發、床墊</div>
      <div @click="goToReserve(3)">辦公室清潔</div>
      <div @click="goToReserve(4)">收納</div>
    </div>
    <div
      class="menu__item"
      :class="{ active: currenPage === PAGE.notice }"
      @click="goto(PAGE.notice)"
    >
      常見問題
    </div>
  </div>
</template>

<script>
const PAGE = {
  index: 'Index',
  service: 'Service',
  notice: 'Notice',
  member: 'Member',
  login: 'Login',
  performance: 'Performance',
  articleList: 'ArticleList',
  article: 'Article',
  reserve: 'Reserve',
  reservePay: 'ReservePay',
}

const IS_PRD = import.meta.env.VITE_ENV_TYPE === 'prd'

import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import emitter from '../helpers/emitter'
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
    const isSubitemOpen = ref(false)
    const handleItemClick = () => {
      isSubitemOpen.value = !isSubitemOpen.value
    }

    const currenPage = computed(() => {
      return route.name
    })

    const goto = (page) => {
      isMenuOpen.value = false

      if (page === PAGE.member) {
        // 加入登出頁
        const token = JSON.parse(localStorage.getItem('memberToken'))
        if (!token) {
          emitter.emit('callLogin', true)
          return
        }
      }

      if (!import.meta.env.SSR) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }

      router.push({ name: page })
    }

    const goToReserve = (formtype) => {
      if (!import.meta.env.SSR) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }

      const name = formtype ? 'Reserve' : 'ReservePay'
      router.push({
        name,
        query: {
          formtype,
        },
      })

      setTimeout(() => {
        location.reload()
      }, 200)
    }

    return {
      PAGE,
      IS_PRD,
      isMenuOpen,
      isSubitemOpen,
      currenPage,
      handleClick,
      handleItemClick,
      goto,
      goToReserve,
      ImageLogo,
      IconMenu,
      IconMenuCross,
    }
  },
}
</script>

<style lang="scss" scoped>
.navigator {
  width: 100vw;
  padding: 5px 90px 5px 30px;
  position: fixed;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--beige);
  box-shadow: 0px 0px 8px 0px #888888;
  top: 0;

  .logo__block {
    cursor: pointer;
  }
  .menu__block {
    display: flex;
    justify-content: flex-start;
  }
  .menu__block-mobile {
    display: none;
  }

  .menu__item {
    color: var(--brown);
    font-size: var(--font-l);
    font-weight: 600;
    cursor: pointer;

    .menu__sub-item {
      display: none;
      position: relative;
    }
  }
  .menu__item:hover {
    .menu__sub-item {
      padding: 16px;
      display: block;
      width: 180px;
      min-height: 100px;
      background-color: var(--beige);
      font-size: var(--font-m);
      font-weight: 200;
      line-height: 30px;
      position: absolute;
      top: 50px;
      left: 75%;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    }
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

@media (max-width: 760px) {
  .navigator {
    .menu__block {
      display: none !important;
    }
    .menu__block-mobile {
      display: block !important;
    }
  }
  .menu__extend {
    width: 100%;
    position: fixed;
    top: 74px;
    left: 0;
    z-index: 40;
    box-shadow: 0px 0px 8px 0px #888888;

    .menu__item {
      min-height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--height-light);
      font-size: var(--font-m);
      background-color: var(--second);
      &.active {
        color: var(--brown);
        background-color: var(--height-light);
      }
    }
    .menu__sub-item {
      background-color: var(--white);
      div {
        height: 0;
        overflow: hidden;
      }
      &.active {
        div {
          height: 32px;
          line-height: 32px;
          text-align: center;
        }
      }
    }
    .menu__item ~ .menu__item {
      border-top: 1px solid var(--beige);
    }
  }
}

@media (max-width: 460px) {
  .navigator {
    width: calc(100vw);
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
    top: 46px;
  }
}
</style>
