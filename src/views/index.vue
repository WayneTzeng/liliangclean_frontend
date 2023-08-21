<template>
  <div class="blank"></div>
  <ImageSwiper id="swiper-content" :list="bannerList" />
  <div class="reservation">
    <ChapterTitle idData="ct-h1" title="預約流程" />
    <div class="reservation__description">
      歡迎加入官方LINE@
      <a href="https://lin.ee/8qurIGn"><img :src="IconLine" /></a>
      立即預約，將由專人為您服務
    </div>
    <div class="reservation__icons">
      <ReservationIcon
        v-for="(item, index) in reservationIconList"
        :key="index"
        class="reservation__icon"
        :title="item.title"
        :icon="item.icon"
        :index="index + 1"
      />
    </div>
  </div>
  <div class="performance">
    <ChapterTitle idData="ct-h2" title="清潔實績" white />
    <div class="performance__items">
      <ImageCompareCard
        v-for="(imgData, idx) in performanceList"
        :key="idx"
        class="performance__item"
        :img-data="imgData"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { homeData } from '../data/index'
import ImageSwiper from '../components/ImageSwiper.vue'
import ChapterTitle from '../components/ChapterTitle.vue'
import ReservationIcon from '../components/ReservationIcon.vue'
import ImageCompareCard from '../components/ImageCompareCard.vue'
import ImageLogo from '../assets/image/image/image-logo.png'
import IconLine from '../assets/image/icon/icon-line.png'

export default {
  name: 'IndexPage',
  components: {
    ImageSwiper,
    ChapterTitle,
    ReservationIcon,
    ImageCompareCard,
  },
  setup() {
    console.log('homeData', homeData)
    const bannerList = ref(homeData.bannerList)
    const reservationIconList = ref(homeData.reservationIconList)
    const performanceList = ref(homeData.performanceList)

    return {
      bannerList,
      reservationIconList,
      performanceList,
      ImageLogo,
      IconLine,
    }
  },
}
</script>

<style lang="scss" scoped>
.blank {
  width: 100%;
  height: 74px;
}
.reservation {
  padding: 72px 0;
  background-color: var(--beige);
  .reservation__description {
    margin-top: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--brown);
    font-size: var(--font-l);
    font-weight: 600;

    img {
      width: 20px;
      margin: 0 4px;
    }
  }
  .reservation__icons {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10vw;
    .reservation__icon {
      flex: 0 0 33%;
    }
  }
}

.performance {
  padding: 72px 0;
  background-color: var(--primary);

  .performance__items {
    margin-top: 64px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 10vw;
  }
}

@media (max-width: 460px) {
  .blank {
    width: 100%;
    height: 46px;
  }
  .reservation {
    padding: 34px 0;
    .reservation__description {
      margin-top: 18px;
      font-size: var(--mobile-font-l);
    }
    .reservation__icons {
      display: flex;
      flex-wrap: wrap;
      padding: 0 10vw;
      .reservation__icon {
        flex: 0 0 100%;
      }
    }
  }

  .performance {
    padding: 34px 0 74px 0;
    .performance__items {
      margin-top: 34px;
      .performance__item {
        flex: 0 0 100%;
      }
    }
  }
}
</style>
