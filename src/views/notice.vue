<template>
  <div class="notice">
    <div class="banner">
      <h1 class="title">客戶權益須知</h1>
      <img :src="ImageBanner" />
    </div>
    <div class="why-us">
      <div>
        <img :src="ImageBannerS1" />
      </div>
      <div>
        <h2>為什麼選擇我們</h2>
        <hr />
        <span>1. 臺灣籍具有良民證</span><br />
        <span>2. 人員皆受過專業的訓練並且定期回訓</span><br />
        <span>3. 使用不傷材質的中性環保清潔劑</span><br />
        <span>4. 無需自備清潔用品</span><br />
        <span>5. 無需綁約</span><br />
        <span>6. 定期客可客製規劃專屬於您的服務</span><br />
        <span>7. 絕對準時</span>
      </div>
    </div>
    <div class="option">
      <ChapterTitle title="服務須知" />
      <div class="content">
        一、由於每人家中的狀況不同，因此不適用官網估價。<br />
        二、預約當天還是會以清潔進度調整工時，現場保留加/減時間。<br />
        三、服務當天共分三個階段：<br />
        ( 1 )到府後，確認：清潔內容、家具狀況。<br />
        ( 2 )開始施作。<br />
        ( 3 )於服務結束前10-15分鐘開始驗收。<br />
        四、服務人員會依據本次的服務內容評估時間內可做的範圍，同時建議可優先施作哪些內容。<br />
        五、陳年的污垢、油垢、黴菌，清潔人員會盡力協助，但無法保證是否能完全去除。<br />
        六、任何櫃子在無提前告知的情況下，為保障客戶的權益以及居家隱私，不主動提供清潔。<br />
        <br />
        注意事項：<br />
        ※需自備梯子、垃圾袋。<br />
        ※請提供現場照片，照片須清楚拍攝全區空間，以利評估、報價。<br />
        ※裝潢細清需事先完成「粗清」，包含：<br />
        將現場的大型垃圾先回收清除，像是燈具、家電的紙箱保麗龍等大型包裝材，以及清理大量的粉塵、或施工時的殘留的水泥塊、殘膠、現場的保護材等。
      </div>
    </div>
    <div class="non-service">
      <div>
        <h2>不服務範圍</h2>
        <hr />
        <span
          >(1)景觀窗（以內部清潔為主，無法爬出外牆清潔）以及窗簾拆卸、清潔。</span
        ><br />
        <span>(2)現場殘膠、殘漆、水泥塊的去除。</span><br />
        <span
          >(3)有危險性的區域，如窗戶外側、外牆、高處的燈具（燈罩）、採光罩清潔。</span
        ><br />
        <span>(4)垃圾清運。</span><br />
        <span>(5)家電零件拆洗。</span><br />
        <span>(6)禽鳥或動物的排泄物。</span><br />
      </div>
      <div>
        <img :src="ImageBannerS1" />
      </div>
    </div>
    <div class="our-right">
      <span
        >*
        不提供拆卸窗戶及窗簾（以內部清潔為主，無法爬出非可安全站立位置清潔）。</span
      ><br />
      <span
        >*
        不提供垃圾清運丟棄，但可協助打包垃圾（大樓若有設置回收處，可於服務後協助丟棄）。</span
      ><br />
      <span
        >*
        不提供進行除蟲害、（蟲）動物屍體處理（包含螞蟻、蟑螂、蜂窩、禽鳥類等）。</span
      ><br />
      <span
        >*
        不提供清潔水晶、瓷器、古董、字畫、模型、花瓶等具紀念價值或易碎品。</span
      ><br />
      <span
        >*
        不提供移動或抬起大型傢具、超過體力負荷之重物進行清潔（超過10公斤）。</span
      ><br />
      <span>* 不提供陳年污垢、深層黴菌垢、鏽蝕或是壁癌。</span><br />
      <span
        >*
        不提供特殊清潔項目（如事故現場清潔、水災後、火災後、意外身故或自然身故之現場等）。</span
      ><br />
      <span>* 不提供環境過於髒亂、惡臭、嘔吐物、排泄物之清潔。</span><br />
      <span>* 不提供提供採購、烹飪、保姆、看護、照護寵物等工作。</span><br />
      <span>* 不提供挑高超過3.2米之區域。</span><br />
      <span>* 不提供抽油煙機機身、瓦斯爐芯拆卸清洗。</span><br />
      <span>* 不提供冷氣機、洗衣機內部拆洗。</span><br />
      <span>* 不提供植物修剪或庭院除草、景觀水池清理。</span><br />
      <span>* 不提供大量噴漆、水泥塊、殘膠清理。</span><br />
      <span>* 不提供具危險性之化學物質處理。</span><br />
      <span>* 不提供以特定方式(如跪地擦拭)完成清潔工作。</span><br />
      <span>* 不進行清理水塔、通水管等水電服務。</span><br />
      <div>
        立亮居家家飾清潔保有最終修改變更解釋之權利，如有任何變更內容將公佈於本網，恕不另行通知。
      </div>
    </div>
    <div class="question">
      <ChapterTitle title="常見問題" />
      <div class="expend">
        <ExpendBlock
          v-for="(item, idx) in questionList"
          @block-expend="showExpendBlock"
          :key="idx"
          :item="item"
          :index="idx"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { noticeData } from '../data/index'
import ChapterTitle from '../components/ChapterTitle.vue'
import ExpendBlock from '../components/ExpendBlock.vue'
import ImageBanner from '../assets/image/image/image-notice-banner.png'
import ImageBannerS1 from '../assets/image/image/image-notice-banner-s1.png'
import ImageBannerS2 from '../assets/image/image/image-notice-banner-s2.png'

export default {
  name: 'NoticePage',
  components: {
    ChapterTitle,
    ExpendBlock,
  },
  setup() {
    const questionList = ref(noticeData.questionList)

    const showExpendBlock = (params) => {
      questionList.value.forEach((item) => {
        item.isExpend = false
      })
      setTimeout(() => {
        questionList.value[params.index].isExpend = params.isExpend
      }, 300)
    }

    return {
      questionList,
      showExpendBlock,
      ImageBanner,
      ImageBannerS1,
      ImageBannerS2,
    }
  },
}
</script>

<style lang="scss" scoped>
.notice {
  .banner {
    width: 100vw;
    position: relative;
    .title {
      position: absolute;
      top: calc(50% - 16px);
      left: calc(50% - 86px);
      z-index: 20;
      font-size: 32px;
    }
    img {
      width: 100%;
    }
  }
  .why-us {
    display: flex;
    color: var(--brown);
    div:nth-child(1),
    div:nth-child(2) {
      width: 50vw;
    }
    div:nth-child(1) {
      img {
        width: 100%;
      }
    }
    div:nth-child(2) {
      padding: 8vw;
      h2 {
        font-size: var(--font-xl);
        text-align: center;
      }
      hr {
        border: 1px solid var(--brown);
        width: 80%;
        margin: 8px auto 16px auto;
      }
      span {
        font-size: var(--font-m);
        line-height: 32px;
      }
    }
  }
  .option {
    padding: 72px 0;
    background-color: var(--height-light);
    .content {
      margin-top: 36px;
      padding: 0 15vw;
      line-height: 28px;
      font-size: var(--font-m);
      color: var(--brown);
    }
  }
  .non-service {
    display: flex;
    color: var(--brown);
    div:nth-child(1),
    div:nth-child(2) {
      width: 50vw;
    }
    div:nth-child(2) {
      img {
        width: 100%;
      }
    }
    div:nth-child(1) {
      padding: 8vw;
      h2 {
        font-size: var(--font-xl);
        text-align: center;
      }
      hr {
        border: 1px solid var(--brown);
        width: 80%;
        margin: 8px auto 16px auto;
      }
      span {
        font-size: var(--font-m);
        line-height: 32px;
      }
    }
  }
  .our-right {
    padding: 72px 15vw;
    color: var(--brown);
    font-size: var(--font-m);
    span {
      line-height: 24px;
    }
    div {
      margin-top: 24px;
      color: var(--second);
    }
  }
  .question {
    padding: 72px 0;
    background-color: var(--primary);
    .expend {
      margin-top: 48px;
    }
  }
}

@media (max-width: 460px) {
  .notice {
    .banner {
      .title {
        top: calc(50% - 11px);
        left: calc(50% - 66px);
        font-size: var(--font-xl);
      }
    }
    .why-us {
      flex-direction: column;
      div:nth-child(1),
      div:nth-child(2) {
        width: 100vw;
        height: 100vw;
      }
      div:nth-child(2) {
        padding: 15vw;
        h2 {
          font-size: var(--mobile--font-xl);
        }
      }
    }
    .option {
      .content {
        font-size: var(--mobile-font-m);
      }
    }
    .non-service {
      flex-direction: column-reverse;
      div:nth-child(1),
      div:nth-child(2) {
        width: 100vw;
        height: 100vw;
      }
      div:nth-child(1) {
        padding: 15vw;
        h2 {
          font-size: var(--mobile--font-xl);
        }
        span {
          line-height: 30px;
        }
      }
    }
    .our-right {
      font-size: var(--mobile-font-m);
      padding: 0 15vw 72px 15vw;
    }
  }
}
</style>
