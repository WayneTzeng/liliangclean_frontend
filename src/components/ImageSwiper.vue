<template>
  <Swiper
    id="swiper-box"
    :loop="true"
    :auto-height="true"
    :navigation="true"
    :autoplay="{
      delay: 2000,
      disableOnInteraction: false,
    }"
  >
    <SwiperSlide v-for="banner in list" :key="banner.link" class="swiper-slide">
      <img :src="banner.url" />
    </SwiperSlide>
    <div class="swiper-pagination"></div>
  </Swiper>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/swiper.scss';

import SwiperCore, { Navigation, Autoplay } from 'swiper/core';
SwiperCore.use([Navigation, Autoplay]);

export default defineComponent({
  name: 'VideoSwiper',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const resetButtonHeight = () => {
      const domHeight = document.getElementById('swiper-content').clientHeight;
      let count = 0;
      const timer = setInterval(() => {
        const _domHeight =
          document.getElementById('swiper-content').clientHeight;
        if (count > 10 || _domHeight > domHeight) {
          clearInterval(timer);
        }
        const _domNext = document.querySelector('.swiper-button-next');
        _domNext.style.top = `${_domHeight / 2 - 20}px`;
        const _domPrev = document.querySelector('.swiper-button-prev');
        _domPrev.style.top = `${_domHeight / 2 - 20}px`;
        count++;
      }, 50);
    };

    onMounted(() => {
      resetButtonHeight();
    });

    window.onresize = () => {
      resetButtonHeight();
    };

    return {};
  },
  computed: {},
});
</script>

<style lang="scss" scoped>
.swiper-wrapper {
  overflow: hidden !important;
}
.swiper-slide.swiper-slide-active {
  img {
    width: 100vw !important;
  }
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  width: 40px;
  height: 40px;
  color: #00000000 !important;
  position: absolute !important;
  z-index: 990 !important;
}
:deep(.swiper-button-next) {
  background-image: url('../assets/image/icon/icon-swiper-next.png') !important;
  right: 60px;
}
:deep(.swiper-button-prev) {
  background-image: url('../assets/image/icon/icon-swiper-prev.png') !important;
  left: 60px;
}

@media (max-width: 400px) {
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    background-image: none !important;
  }
}
</style>
