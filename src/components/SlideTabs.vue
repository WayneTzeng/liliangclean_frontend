<template>
  <swiper
    class="tabs"
    :slidesPerView="4"
    :modules="modules"
    :scrollbar="{
      hide: true,
      draggable: true,
    }"
    :spaceBetween="8"
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
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Scrollbar } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/scrollbar'

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
    const selectTab = (index) => {
      emit('update:index', index)
    }

    return {
      selectTab,
      modules: [Scrollbar],
    }
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  width: 80vw;
}

// tab
:deep(.swiper-slide) {
  /* height: 85px !important; */
  width: calc((80vw - 32px) / 4) !important;
  padding: 10px 0;
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
