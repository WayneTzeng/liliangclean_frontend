<template>
  <Swiper
    id="swiper-box"
    :loop="true"
    :modules="modules"
    :autoplay="{
      delay: 4500
    }"
    :follow-finger="false"
    @swiper="onSwiper"
  >
    <SwiperSlide v-for="banner in list" :key="banner.link" class="swiper-slide">
      <img :src="banner.url" />
    </SwiperSlide>
    <div class="swiper-prev" @click="swiperPrev">
      <img :src="IconPrev" />
    </div>
    <div class="swiper-next" @click="swiperNext">
      <img :src="IconNext" />
    </div>
  </Swiper>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import IconNext from '../assets/image/icon/icon-swiper-next.png'
import IconPrev from '../assets/image/icon/icon-swiper-prev.png'

export default defineComponent({
  name: 'ImageSwiperComponent',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const swiper = ref(null)
    const onSwiper = (_swiper) => {
      swiper.value = _swiper
    }

    const swiperPrev = () => {
      swiper.value.slidePrev()
    }

    const swiperNext = () => {
      swiper.value.slideNext()
    }

    const resetButtonHeight = () => {
      const domHeight = document.getElementById('swiper-content').clientHeight
      let count = 0
      const timer = setInterval(() => {
        const _domHeight =
          document.getElementById('swiper-content').clientHeight
        if (count > 10 || _domHeight > domHeight) {
          clearInterval(timer)
        }
        const _domNext = document.querySelector('.swiper-next')
        _domNext.style.top = `${_domHeight / 2 - 20}px`
        const _domPrev = document.querySelector('.swiper-prev')
        _domPrev.style.top = `${_domHeight / 2 - 20}px`
        count++
      }, 50)
    }

    onMounted(() => {
      resetButtonHeight()
    })

    if (!import.meta.env.SSR) {
      window.onresize = () => {
        resetButtonHeight()
      }
    }

    return {
      onSwiper,
      swiperPrev,
      swiperNext,
      IconNext,
      IconPrev,
      modules: [Autoplay]
    }
  },
  computed: {}
})
</script>

<style lang="scss" scoped>
.swiper-wrapper {
  overflow: hidden !important;
}
.swiper-slide {
  img {
    width: 100vw !important;
  }
}

.swiper-prev,
.swiper-next {
  width: 40px;
  height: 40px;
  position: absolute;
  z-index: 990;
  cursor: pointer;

  img {
    width: 100%;
  }
}

.swiper-prev {
  left: 60px;
}

.swiper-next {
  right: 60px;
}

@media (max-width: 460px) {
  .swiper-prev,
  .swiper-next {
    display: none;
  }
}
</style>
