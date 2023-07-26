<template>
  <div class="service" @click="closeSelect">
    <!-- <div class="charge">
      <ChapterTitle title="收費標準" />
      <div class="charge-desc">
        <div class="desc">
          兩人一組服務，效率雙倍 鐘點計費，可客制專屬於您的清潔服務<br />
          （若有一人服務的需求，請加入官方 LINE 諮詢）
        </div>
        <div class="option">
          <div class="select-1">
            「單次服務」
            <Selector
              :specification="['平日$3390', '週末$3990']"
              :outer-close="outerCloseSelect"
            />
          </div>
          <div class="select-2">
            「定期服務」
            <Selector
              :specification="[
                '2人19小時 $19,999',
                '2人24小時 $26,180',
                '2人48小時 $51,528',
              ]"
              :outer-close="outerCloseSelect"
            />
          </div>
        </div>
      </div>
    </div> -->
    <div class="content">
      <ChapterTitle title="服務類型" />
      <Tabs class="tabs" v-model:index="tabIndex" :list="tabList" />
      <ChapterTitle title="服務內容" />
      <template v-if="tabIndex === 0">
        <div class="service-cards-content">
          「單次預約」<br />1人服務 $1,800起<br />2人服務 $3,390起<br />（以上皆為平日一～五收費標準）
        </div>
        <div class="service-cards use-in-pc">
          <ServiceCard
            v-for="(service, idx) in contentList"
            :key="idx"
            :service="service"
            class="service-card"
          />
        </div>
        <div class="service-cards use-in-mobile">
          <ServiceCard
            :service="contentList[serviceCardIndex]"
            class="service-card"
            :class="{ 'fade-out': isFadeOut }"
          />
          <div class="service-card-prev" @click="handlePrev">
            <img :src="IconPrev" />
          </div>
          <div class="service-card-next" @click="handleNext">
            <img :src="IconNext" />
          </div>
        </div>
      </template>

      <div v-if="tabIndex !== 0" class="service-desc">
        <div v-if="tabIndex === 1">
          「裝潢後細清」與「一般清潔的差異」<br /><br />
          細清是指，施工過程留下來的大量粉塵，針對室內的每個細節擦拭乾淨，可在清潔後讓客戶安心入住
          居家清潔是指，日常使用或長久使用下留下的污垢、較難去除的髒污，亦或是針對較常使用的區域做定期的維持"
          裝潢後需完成『粗清』外，需間隔3天以上再進行細清，效果更佳<br /><br />
          收費方式採『鐘點費』計算
          基本預約2人一組，服務6小時以上，週(一)至(五)平日計費為6780元起
        </div>
        <div v-if="tabIndex === 2">
          採用<br />
          ● 茶樹精油<br />
          ● 中性的酵素清潔劑<br />
          ● 真空抽洗<br />
          三合一的搭配，可有效沖洗深層的髒污<br />
          讓織物中殘留的血漬、尿垢、嘔吐、污漬等，達到一定的清潔效果
        </div>
        <div v-if="tabIndex === 3" class="office-service">
          <ol>
            <li>● 平面清潔</li>
            <li>● 地板清潔</li>
            <li>● 廁所清潔</li>
          </ol>
          <ol>
            <li>● 茶水間清潔</li>
            <li>● 垃圾整理</li>
            <li>● 玻璃清潔</li>
          </ol>
        </div>
        <div v-if="tabIndex === 4" class="charge-desc">
          <div class="option">
            <div class="select-2">
              「定期服務」<br /><br />
              <Selector
                v-model:index="selectorIndex"
                :specification="['2人18小時', '2人24小時', '2人48小時']"
                :outer-close="outerCloseSelect"
              />
              <br />
              <br />
              <div v-if="selectorIndex === 0">$19,999</div>
              <div v-if="selectorIndex === 1">$26,180</div>
              <div v-if="selectorIndex === 2">$51,528</div>
            </div>
          </div>
        </div>
        <div class="customer-connect">
          <template v-if="tabIndex === 3">
            <div>由於辦公室規格多樣化，</div>
            <div>目前尚未提供官網評估、預約</div>
          </template>
          <div><a href="https://lin.ee/8qurIGn">請留下您的基本資訊</a>，</div>
          <div>客服收到後會儘快和您聯繫，</div>
          <div>
            或加入官方 @LINE
            <a href="https://lin.ee/8qurIGn"><img :src="IconLine" /></a>
            立即諮詢
          </div>
        </div>
      </div>
    </div>
    <div class="area">
      <ChapterTitle title="服務區域" />
      <div class="map-block">
        <div class="zip-block">
          <div
            v-for="(zip, idx) in serviceAreaList"
            :key="idx"
            class="zip"
            :class="{ active: selectZipIndex === idx }"
            @click="selectZip(zip, idx)"
          >
            {{ zip }}
          </div>
        </div>
        <MapTaichung class="map" />
        <div class="notice">
          ● 以74快速道路環狀內為主要範圍區域<br />
          ● 排班會依據人員案場之間的距離考量，預約前建議可以向客服諮詢<br />
          ● 若以上區域沒有您在的區域，可以加入官方 LINE 向客服詢問
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import emitter from '../helpers/emitter'
import { serviceData } from '../data/index'
import ChapterTitle from '../components/ChapterTitle.vue'
import Selector from '../components/Selector.vue'
import Tabs from '../components/SlideTabs.vue'
import ServiceCard from '../components/ServiceCard.vue'
import MapTaichung from '../components/MapTaichung.vue'
import IconLine from '../assets/image/icon/icon-line.png'
import IconNext from '../assets/image/icon/icon-swiper-next.png'
import IconPrev from '../assets/image/icon/icon-swiper-prev.png'

export default {
  name: 'ServicePage',
  components: {
    ChapterTitle,
    Selector,
    Tabs,
    ServiceCard,
    MapTaichung,
  },
  setup() {
    const tabIndex = ref(0)
    const selectorIndex = ref(0)
    const contentList = computed(() => serviceData.contentList[tabIndex.value])

    const tabList = ref(serviceData.tabList)
    const serviceAreaList = ref(serviceData.serviceAreaList)

    const selectZipIndex = ref(-1)
    const selectZip = (zip, idx) => {
      selectZipIndex.value = idx
      emitter.emit('changeZipColor', zip)
    }

    const outerCloseSelect = ref(false)
    const closeSelect = () => {
      outerCloseSelect.value = true
      setTimeout(() => {
        outerCloseSelect.value = false
      }, 50)
    }

    const serviceCardIndex = ref(0)
    const isFadeOut = ref(false)
    const handlePrev = () => {
      isFadeOut.value = true

      setTimeout(() => {
        isFadeOut.value = false
        serviceCardIndex.value =
          serviceCardIndex.value - 1 < 0
            ? contentList.value.length - 1
            : serviceCardIndex.value - 1
      }, 500)
    }
    const handleNext = () => {
      isFadeOut.value = true
      setTimeout(() => {
        isFadeOut.value = false
        serviceCardIndex.value =
          serviceCardIndex.value + 1 > contentList.value.length - 1
            ? 0
            : serviceCardIndex.value + 1
      }, 500)
    }

    return {
      outerCloseSelect,
      tabIndex,
      selectorIndex,
      contentList,
      tabList,
      serviceAreaList,
      selectZipIndex,
      serviceCardIndex,
      isFadeOut,
      closeSelect,
      selectZip,
      handlePrev,
      handleNext,
      IconLine,
      IconNext,
      IconPrev,
    }
  },
}
</script>

<style lang="scss" scoped>
.service {
  /* .charge {
    background-color: var(--beige);
    padding: 72px 0;
  } */
  .content {
    background-color: var(--white);
    padding: 72px 0;
    .tabs {
      margin: 35px auto;
    }
    .service-cards-content {
      margin: 36px 0 24px 0;
      text-align: center;
      line-height: 20px;
    }
    .service-cards.use-in-pc {
      display: flex;
      justify-content: flex-start;
      padding: 30px 5vw;
      flex-wrap: wrap;
      .service-card {
        flex: 0 0 calc((100% - 60px) / 3);
      }
    }
    .service-cards.use-in-mobile {
      position: relative;
      padding: 30px 5vw;

      .service-card-prev,
      .service-card-next {
        width: 40px;
        height: 40px;
        position: absolute;
        overflow: hidden;
        background-color: #ffffff;
        top: 23%;
        border-radius: 50%;
        box-shadow: 0px 2px 4px 0px #666666;
      }

      .service-card-prev {
        left: 5px;
      }
      .service-card-next {
        right: 5px;
      }
    }
    .service-desc {
      width: 100%;
      padding: 40px 25vw 0 25vw;
      line-height: 24px;
      font-size: var(--font-l);
      .customer-connect {
        margin-top: 40px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: var(--brown);
        font-size: var(--font-l);
        font-weight: 600;
        line-height: 30px;

        a {
          color: #3c2cef;
        }

        img {
          width: 20px;
          margin: 0 4px;
        }
      }
      .office-service {
        display: flex;
        justify-content: space-around;
      }
      .charge-desc {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: var(--brown);
        .option {
          .select-2 {
            position: relative;
            z-index: 5;
            text-align: center;
          }
        }
      }
    }
  }
  .area {
    background-color: var(--beige);
    padding: 72px 0;
    .map-block {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .zip-block {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 0 5vw;
        .zip {
          cursor: pointer;
          margin-left: 20px;
          color: var(--brown);
          margin-top: 12px;
          &.active {
            color: var(--primary);
          }
        }
        .zip:hover {
          color: var(--primary);
        }
      }
      .map {
        margin: 30px;
      }
      .notice {
        font-size: var(--font-s);
        color: var(--light-gray);
        line-height: 20px;
      }
    }
  }
}

@media (max-width: 1000px) {
  .service {
    .content {
      .service-cards.use-in-pc {
        flex-wrap: wrap;
        .service-card {
          flex: 0 0 calc((100% - 30px) / 2);
        }
      }
      .service-desc {
        padding: 40px 15vw 0 15vw;
      }
    }
  }
}

@media (max-width: 460px) {
  .service {
    /* .charge {
      .charge-desc {
        padding: 0 5vw;
      }
    } */
    .content {
      .service-cards.use-in-mobile {
        .service-card {
          flex: 0 0 100%;
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
          &.fade-out {
            opacity: 0.2;
          }
        }
      }
      .service-desc {
        padding: 40px 10vw 0 10vw;
        .office-service {
          justify-content: flex-start;
          flex-direction: column;
        }
      }
    }
    .area {
      padding: 72px 10vw;
    }
  }
}
</style>
