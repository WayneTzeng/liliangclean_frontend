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
  <div class="footer">
    <div class="logo">
      <img :src="ImageLogo" />
    </div>
    <div class="info">
      <div class="info__content">
        連絡電話：(04)23217936<br />
        公司地址：台中市西區台灣大道二段406號12樓之2<br />
        公司信箱：liliangclean@gmail.com<br />
        客服時間：週一至週五 09:00-12:00,13:00-18:00 (不含例假日)<br />
      </div>
      <div class="info__icons">
        <div class="info__icon"><img :src="IconFB" /></div>
        <div class="info__icon">
          <a href="https://lin.ee/8qurIGn"><img :src="IconLine" /></a>
        </div>
        <div class="info__icon"><img :src="IconIG" /></div>
      </div>
    </div>
  </div>
  <div id="go-to-top" href="#swiper" class="go-to-top" @click="goToTop">
    <img :src="IconGoToTop" />
  </div>
</template>

<script>
import { ref } from 'vue';
import ImageSwiper from '../components/ImageSwiper.vue';
import ChapterTitle from '../components/ChapterTitle.vue';
import ReservationIcon from '../components/ReservationIcon.vue';
import ImageCompareCard from '../components/ImageCompareCard.vue';
import ImageLogo from '../assets/image/image/image-logo.png';
import IconLine from '../assets/image/icon/icon-line.png';
import IconFB from '../assets/image/icon/icon-fb.png';
import IconIG from '../assets/image/icon/icon-ig.png';
import IconGoToTop from '../assets/image/icon/icon-go-to-top.png';

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

    const goToTop = () => {
      const element = document.getElementById('swiper-content');
      element.scrollIntoView({
        behavior: 'smooth',
      });
    };

    return {
      bannerList,
      reservationIconList,
      performanceList,
      goToTop,
      ImageLogo,
      IconLine,
      IconFB,
      IconIG,
      IconGoToTop,
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
    font-size: 18px;
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
    /* .performance__item {
      flex: 0 0 calc((100% - 10vw) / 3);
    }*/

    /* .performance__item ~ .performance__item {
      margin-left: 5vw;
    }

    & .performance__item:nth-child(3n + 1) {
      margin-left: 0;
    } */
  }
}

.footer {
  padding: 70px 10vw;
  background-color: var(--second);

  .logo {
    width: 200px;
    img {
      width: 100%;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 34px;
    .info__content {
      color: var(--white);
      font-size: 18px;
      line-height: 160%;
    }

    .info__icons {
      display: flex;
      justify-content: flex-start;
      .info__icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .info__icon ~ .info__icon {
        margin-left: 30px;
      }
    }
  }
}

.go-to-top {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 50px;
  bottom: 50px;
  img {
    width: 100%;
  }
}

@media (max-width: 460px) {
  .reservation {
    padding: 34px 0;
    .reservation__description {
      margin-top: 18px;
      font-size: 14px;
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

  .footer {
    padding: 34px 10vw 74px 10vw;
    .logo {
      width: 100px;
    }

    .info {
      margin-top: 20px;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .info__content {
        font-size: 14px;
      }
      .info__icons {
        margin-top: 20px;
        align-items: center;
        .info__icon {
          width: 40px;
          height: 40px;
        }
        .info__icon ~ .info__icon {
          margin-left: 40px;
        }
      }
    }
  }

  .go-to-top {
    width: 45px;
    height: 45px;
    right: 25px;
    bottom: 25px;
  }
}
</style>
