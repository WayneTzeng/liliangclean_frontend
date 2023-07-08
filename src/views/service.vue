<template>
  <div class="service">
    <div class="charge">
      <ChapterTitle title="收費標準" />
      "兩人一組服務，效率雙倍 鐘點計費，可客制專屬於您的清潔服務
      （若有一人服務的需求，請加入官方ＬＩＮＥ諮詢）<br />
      「單次服務」<br />
      平日$3390 週末$3990<br />
      「定期服務」（希望用下拉式選單呈現 2人19小時 $19,999 <br />
      <select>
        <option>2人24小時 $26,180</option>
        <option>2人48小時 $51,528</option>
      </select>
    </div>
    <div class="content">
      <ChapterTitle title="基本服務內容" />
      <Tabs v-model:index="index" :list="tabList" />
      <div class="service-cards">
        <ServiceCard
          v-for="(service, idx) in contentList"
          :key="idx"
          :service="service"
          class="service-card"
        />
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
import { ref, computed } from 'vue';
import emitter from '../helpers/emitter';
import { serviceData } from '../data/index';
import ChapterTitle from '../components/ChapterTitle.vue';
import Tabs from '../components/Tabs.vue';
import ServiceCard from '../components/ServiceCard.vue';
import MapTaichung from '../components/MapTaichung.vue';

export default {
  name: 'Service',
  components: {
    ChapterTitle,
    Tabs,
    ServiceCard,
    MapTaichung,
  },
  setup() {
    const index = ref(0);
    const contentList = computed(() => serviceData.contentList[index.value]);

    const tabList = ref(serviceData.tabList);
    const serviceAreaList = ref(serviceData.serviceAreaList);

    const selectZipIndex = ref(-1);
    const selectZip = (zip, idx) => {
      selectZipIndex.value = idx;
      emitter.emit('changeZipColor', zip);
    };

    return {
      index,
      contentList,
      tabList,
      serviceAreaList,
      selectZipIndex,
      selectZip,
    };
  },
};
</script>

<style lang="scss" scoped>
.service {
  .charge {
    height: 200px;
    background-color: var(--beige);
    padding: 72px 0;
  }
  .content {
    background-color: var(--white);
    padding: 72px 0;

    .service-cards {
      display: flex;
      justify-content: flex-start;
      padding: 30px 5vw;
      flex-wrap: wrap;
      .service-card {
        flex: 0 0 calc((100% - 60px) / 3);
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
        /* flex-direction: column; */
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
      .service-cards {
        flex-wrap: wrap;
        .service-card {
          flex: 0 0 calc((100% - 30px) / 2);
        }
      }
    }
  }
}

@media (max-width: 460px) {
  .service {
    .content {
      .service-cards {
        .service-card {
          flex: 0 0 100%;
        }
      }
    }
  }
}
</style>
