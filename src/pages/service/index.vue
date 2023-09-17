<template>
  <div class="service" @click.capture="closeSelect">
    <div class="content">
      <ChapterTitle idData="ct-s1" title="服務類型" />
      <Tabs
        v-model:index="tabIndex"
        v-model:tabId="tabId"
        class="tabs"
        :list="tabList"
      />
      <ChapterTitle idData="ct-s2" title="服務內容" />
      <template v-if="tabId === ID.atHome">
        <div class="service-cards-content">
          「單次預約」<br />
          <span> 1人服務 $1,800元起<br />2人服務 $3,390元起<br /> </span>
          （以上為平日一到五收費，附發票）
        </div>
        <div class="service-cards">
          <ServiceCard
            v-for="(service, idx) in contentList"
            :key="idx"
            :service="service"
            class="service-card"
          />
        </div>
      </template>
      <div v-if="tabId === ID.periodical" class="service-desc">
        <div class="charge-desc">
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
            <br />
            <hr />
            <br />
            ● 可比一般客戶優先預約下個月的服務<br />
            ● 較能安排喜愛的清潔人員<br />
            ● 購買此方案無法跨地址使用<br />
            ● 此方案使用頻率，最低一個月一次<br />
            ●
            取消/異動服務日期，需於服務日前3個工作天告知（不含例假日），於服務日3天內告知將酌收600元異動費。<br /><br />

            可能產生額外費用說明：<br />
            ▼ 週末：預約週末（六、日）每人每小時加收100元。<br />
            ▼
            車馬：於車馬費地段，預約當天酌收100元/人車馬費（請與客服確認）。<br />
            ▼ 年節：過年大掃除期間，依當年度活動訂定之。
          </div>
        </div>
        <div class="customer-connect">
          <div>
            請加入官方 LINE 洽詢客服<br />
            由專人為您服務
            <a href="https://lin.ee/8qurIGn"><img :src="IconLine" /></a>
            立即諮詢
          </div>
        </div>
      </div>
      <div class="html-data" v-html="htmlData?.categoryDepiction"></div>
      <div class="button-block">
        <CustomButton
          class="button"
          primary
          full
          text="更多案例"
          @click="goToPerformance"
        />
      </div>
    </div>
    <div class="area">
      <ChapterTitle idData="ct-s3" title="服務區域" />
      <div class="map-block">
        <h1 class="cictyneme">台 中 市</h1>
        <div class="zip-block">
          <h1></h1>
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
          <span> ● 以74快速道路環狀內為主要範圍區域 </span>
          <br />
          <span>
            ● 排班會依據人員案場之間的距離考量，預約前建議可以向客服諮詢
          </span>
          <br />
          <span>
            ● 若以上區域沒有您在的區域，可以加入官方 LINE 向客服詢問
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ID = {
  periodical: '631e550c-50b6-9410-80be-70c9e2ea1ac0',
  atHome: 'a5566c0b-d33e-4acb-a778-8f9cfdc52779',
}

import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/index'
import emitter from '@/helpers/emitter'
import { serviceData } from '@/data/index'
import ChapterTitle from '@/components/ChapterTitle.vue'
import Selector from '@/components/Selector.vue'
import Tabs from '@/components/SlideTabs.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import MapTaichung from '@/components/MapTaichung.vue'
import CustomButton from '@/components/CustomButton.vue'
import ImageOffice1 from '@/assets/image/image/image-service-office1.jpeg'
import ImageOffice2 from '@/assets/image/image/image-service-office2.jpeg'
import ImageOffice3 from '@/assets/image/image/image-service-office3.jpeg'
import IconLine from '@/assets/image/icon/icon-line.png'
import IconNext from '@/assets/image/icon/icon-swiper-next.png'
import IconPrev from '@/assets/image/icon/icon-swiper-prev.png'
import IconArrow from '@/assets/image/icon/icon-arrow.png'

export default {
  name: 'ServicePage',
  components: {
    ChapterTitle,
    Selector,
    Tabs,
    ServiceCard,
    MapTaichung,
    CustomButton,
  },
  setup() {
    const router = useRouter()

    const tabIndex = ref(0)
    const tabId = ref('')
    const selectorIndex = ref(0)
    const contentList = computed(() => serviceData.contentList[tabIndex.value])

    const tabList = ref([])
    onMounted(() => {
      api
        .getCategory()
        .then((res) => {
          console.log(res)
          tabList.value = res
          tabId.value = res
        })
        .catch((error) => {
          console.error(error)
        })
    })

    const htmlData = computed(() => {
      return tabList.value.filter((item) => item.id === tabId.value)[0]
    })

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

    const goToPerformance = () => {
      router.push({ name: 'Performance' })
    }

    return {
      ID,
      outerCloseSelect,
      tabIndex,
      tabId,
      selectorIndex,
      contentList,
      tabList,
      htmlData,
      serviceAreaList,
      selectZipIndex,
      closeSelect,
      selectZip,
      goToPerformance,
      IconLine,
      IconNext,
      IconPrev,
      ImageOffice1,
      ImageOffice2,
      ImageOffice3,
      IconArrow,
    }
  },
}
</script>

<style lang="scss" scoped>
.service {
  .content {
    background-color: var(--white);
    padding: 72px 10vw;
    .tabs {
      margin: 35px auto;
    }
    .service-cards-content {
      margin: 36px 0 24px 0;
      text-align: center;
      line-height: 20px;
      font-size: 20px;
      span {
        font-size: 20px;
        line-height: 24px;
      }
    }
    .service-cards {
      display: flex;
      justify-content: flex-start;
      padding: 30px 5vw;
      flex-wrap: wrap;
      .service-card {
        flex: 0 0 calc((100% - 60px) / 3);
      }
    }
    .service-desc {
      width: 100%;
      padding: 40px 20vw 0 20vw;
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
        text-align: center;

        a {
          color: #3c2cef;
        }

        img {
          width: 20px;
          margin: 0 4px;
        }
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
    .html-data {
      width: 80vw;
      padding: 24px;
      margin: 36px auto;
    }
    .button-block {
      width: 50vw;
      max-width: 320px;
      margin: 0 auto;
    }
  }
  .area {
    background-color: var(--beige);
    padding: 72px 10vw;
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
        padding: 0;
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
        margin-left: 20px;
        span {
          font-size: var(--font-s);
          color: var(--light-gray);
          line-height: 20px;
          text-indent: 16px;
          margin-left: -16px;
        }
      }
    }
  }
  .cictyneme {
    font-size: 30px;
    color: #522f0c;
    margin-bottom: 20px;
    font-weight: 600;
  }
}
@media (max-width: 1060px) {
  .service {
    .content {
      .service-cards {
        .service-card {
          flex: 0 0 calc((100% - 30px) / 2);
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
          &.fade-out {
            opacity: 0.2;
          }
        }
      }
    }
  }
}
@media (max-width: 760px) {
  .service {
    .content {
      .service-cards {
        .service-card {
          flex: 0 0 100%;
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
          &.fade-out {
            opacity: 0.2;
          }
        }
      }
    }
  }
}
@media (max-width: 460px) {
  .service {
    .content {
      padding: 40px 10vw;
      .service-desc {
        .image-block {
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .image-box {
            width: 80vw;
            height: calc(80vw * 0.7);
          }
        }
      }
      .service-cards-content {
        font-size: 18px;
        span {
          font-size: 18px;
          line-height: 24px;
        }
      }
    }
    .area {
      .map-block {
        padding: 0;
      }
    }
  }
}
</style>
