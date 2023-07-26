<template>
  <Swiper
    id="swiper-box"
    class="tabs"
    :loop="false"
    :auto-height="true"
    :autoplay="{
      delay: 4500,
      disableOnInteraction: false,
    }"
    :follow-finger="true"
    :slidesPerView="3"
    style="width: 80vw"
  >
    <SwiperSlide
      v-for="(tab, idx) in list"
      :key="idx"
      class="tab"
      :class="{ active: index === idx }"
      @click="selectTab(idx)"
    >
      {{ tab }}<span v-if="commonType && idx !== list.length - 1">|</span>
    </SwiperSlide>
  </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'

export default {
  name: 'TabsComponent',
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
    }
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  display: flex;
  justify-content: center;

  .tab {
    max-width: 120px;
    padding: 10px 20px;
    border-radius: 16px;
    border: 1px solid var(--second);
    /* color: var(--second); */
    color: var(--beige);
    background-color: var(--second);
    opacity: 0.6;
    font-size: var(--font-l);
    text-align: center;
    text-wrap: nowrap;
    cursor: pointer;

    &.active {
      opacity: 1;
      color: var(--white);
      background-color: var(--second);
    }
  }
  .tab ~ .tab {
    margin-left: 20px;
  }
}

@media (max-width: 460px) {
  .tabs {
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 5vw;

    .tab {
      margin-top: 16px;
      width: 45%;
      display: flex;
      justify-content: center;
    }
    .tab ~ .tab {
      margin-left: 0;
    }
  }
}
</style>
