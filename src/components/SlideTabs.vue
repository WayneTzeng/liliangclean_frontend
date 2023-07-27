<template>
  <div class="outer-block">
    <div class="swiper-prev" @click="swiperPrev">
      <img :src="IconPrev" />
    </div>
    <div class="swiper-next" @click="swiperNext">
      <img :src="IconNext" />
    </div>
    <swiper
      class="tabs"
      :slidesPerView="4"
      :scrollbar="{
        hide: false,
        draggable: true,
      }"
      :spaceBetween="8"
      @swiper="onSwiper"
    >
      <swiper-slide
        v-for="(tab, idx) in list"
        :key="idx"
        class="tab"
        :class="{ active: index === idx }"
        style="text-wrap: nowrap"
        @click="selectTab(idx)"
      >
        {{ tab }}
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { ref } from 'vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Scrollbar } from 'swiper/modules'
import IconNext from '../assets/image/icon/icon-swiper-next.png'
import IconPrev from '../assets/image/icon/icon-swiper-prev.png'

// Import Swiper styles
import 'swiper/css'

export default {
  name: 'SwiperBrandIcon',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: 0,
    },
    commonType: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:index'],
  setup(props, { emit }) {
    const swiper = ref(null)
    const onSwiper = (_swiper) => {
      swiper.value = _swiper
    }

    const swiperNext = () => {
      swiper.value.slideNext()
    }
    const swiperPrev = () => {
      swiper.value.slidePrev()
    }

    const selectTab = (index) => {
      emit('update:index', index)
    }

    return {
      onSwiper,
      swiperNext,
      swiperPrev,
      selectTab,
      modules: [Scrollbar],
      IconNext,
      IconPrev,
    }
  },
}
</script>

<style lang="scss" scoped>
.outer-block {
  display: flex;
  justify-content: center;
  position: relative;
}
.swiper-next,
.swiper-prev {
  cursor: pointer;
  position: absolute;
  z-index: 10;
  img {
    width: 100%;
  }
}
.swiper-next {
  right: -40px;
}
.swiper-prev {
  left: -40px;
}

.tabs {
  width: 80vw;
}

// tab
:deep(.swiper-slide) {
  /* height: 85px !important; */
  width: calc((80vw - 32px) / 4) !important;
  height: 40px !important;
  /* padding: 10px 0; */
  border-radius: 16px;
  border: 1px solid var(--second);
  /* color: var(--second); */
  color: var(--beige);
  background-color: var(--second);
  opacity: 0.6;
  font-size: var(--font-l);
  text-wrap: nowrap;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    opacity: 1;
    color: var(--white);
    background-color: var(--second);
  }
}
:deep(.swiper-scrollbar) {
  /* display: none; */
}
</style>
