<template>
  <ImageSwiper id="swiper-content" :list="bannerList" />
  <div class="reservation">
    <ChapterTitle :title="'預約流程'" />
    <div class="reservation__description">
      歡迎加入官方@Line
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
    <ChapterTitle :title="'清潔實績'" white />
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
import { ref } from 'vue';
import ImageSwiper from '../components/ImageSwiper.vue';
import ChapterTitle from '../components/ChapterTitle.vue';
import ReservationIcon from '../components/ReservationIcon.vue';
import ImageCompareCard from '../components/ImageCompareCard.vue';
import ImageLogo from '../assets/image/image/image-logo.png';

export default {
  name: 'IndexPage',
  components: {
    ImageSwiper,
    ChapterTitle,
    ReservationIcon,
    ImageCompareCard,
  },
  setup() {
    const bannerList = ref([
      {
        url: require('../assets/image/image/image-banner-1.png'),
      },
      {
        url: require('../assets/image/image/image-banner-2.png'),
      },
      {
        url: require('../assets/image/image/image-banner-3.png'),
      },
      {
        url: require('../assets/image/image/image-banner-4.png'),
      },
    ]);

    const reservationIconList = ref([
      {
        title: '加入官方 LINE',
        icon: require('../assets/image/icon/icon-1.svg'),
      },
      {
        title: '提供現場照片',
        icon: require('../assets/image/icon/icon-2.svg'),
      },
      {
        title: '選擇日期',
        icon: require('../assets/image/icon/icon-3.svg'),
      },
      {
        title: '確認付款',
        icon: require('../assets/image/icon/icon-4.svg'),
      },
      {
        title: '到府清潔',
        icon: require('../assets/image/icon/icon-5.svg'),
      },
      {
        title: '成果驗收',
        icon: require('../assets/image/icon/icon-6.svg'),
      },
    ]);

    const performanceList = ref([
      {
        image: require('../assets/image/image/image-performance-1.png'),
        btnText: '窗溝清潔',
      },
      {
        image: require('../assets/image/image/image-performance-2.png'),
        btnText: '浴室清潔',
      },
      {
        image: require('../assets/image/image/image-performance-3.png'),
        btnText: '水龍頭清潔',
      },
      {
        image: require('../assets/image/image/image-performance-4.png'),
        btnText: '乾濕分離玻璃清潔',
      },
      {
        image: require('../assets/image/image/image-performance-5.png'),
        btnText: '窗戶清潔',
      },
    ]);

    return {
      bannerList,
      reservationIconList,
      performanceList,
      ImageLogo,
    };
  },
};
</script>

<style lang="scss" scoped>
.reservation {
  padding: 72px 0;
  background-color: var(--white);
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
      .performance__items {
        flex: 0 0 100%;
      }
    }
  }
}
</style>
