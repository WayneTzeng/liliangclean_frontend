<template>
  <div class="notice">
    <div class="banner">
      <h1 class="title">服務須知</h1>
      <img :src="ImageBanner" />
    </div>
    <div class="why-us">
      <ChapterTitle idData="ct-n1" title="為什麼選擇我們" />
      <div class="button-title">專員三大保證</div>
      <div class="icon-description-block">
        <IconDescription
          v-for="(item, idx) in promiseList"
          :key="`item.title-${idx}`"
          :data="item"
          :count="promiseList.length"
        />
      </div>
      <div class="button-title">四大安心服務</div>
      <div class="icon-description-block">
        <IconDescription
          v-for="(item, idx) in reassureList"
          :key="`item.title-${idx}`"
          :data="item"
          :count="reassureList.length"
        />
      </div>
    </div>
    <div class="our-right-block">
      <ChapterTitle idData="ct-n2" title="不服務的內容" />
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
        <span>
          *
          不提供特殊清潔項目（如事故現場清潔、水災後、火災後、意外身故或自然身故之現場等）。
        </span>
        <br />
        <span>* 不提供環境過於髒亂、惡臭、嘔吐物、排泄物之清潔。</span><br />
        <span>* 不提供提供採購、烹飪、保姆、看護、照護寵物等工作。</span><br />
        <span>* 不提供挑高超過3.2米之區域。</span><br />
        <span>* 不提供抽油煙機機身、瓦斯爐芯拆卸清洗。</span><br />
        <span>* 不提供冷氣機、洗衣機內部拆洗（需另預約家電清潔服務）。 </span>
        <br />
        <span>* 不提供植物修剪或庭院除草、景觀水池清理。</span><br />
        <span>* 不提供大量噴漆、水泥塊、殘膠清理。</span><br />
        <span>* 不提供具危險性之化學物質處理。</span><br />
        <span>* 不提供以特定方式(如跪地擦拭)完成清潔工作。</span><br />
        <span>* 不進行清理水塔、通水管等水電服務。</span><br />
        <div>
          立亮居家家飾清潔保有最終修改變更解釋之權利，如有任何變更內容將公佈於本網，恕不另行通知。
        </div>
      </div>
    </div>
    <div class="question">
      <ChapterTitle idData="ct-n3" title="常見問題" white />
      <div class="expand">
        <ExpendBlock
          v-for="(item, idx) in questionList"
          :key="idx"
          :item="item"
          :index="idx"
          @block-expand="showExpendBlock"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { noticeData } from '@/data/index'
import ChapterTitle from '@/components/ChapterTitle.vue'
import IconDescription from '@/components/IconDescription.vue'
import ExpendBlock from '@/components/ExpendBlock.vue'
import ImageBanner from '@/assets/image/image/image-notice-banner.png'

export default {
  name: 'NoticePage',
  components: {
    ChapterTitle,
    IconDescription,
    ExpendBlock,
  },
  setup() {
    const promiseList = ref(noticeData.promiseList)
    const reassureList = ref(noticeData.reassureList)
    const questionList = ref(noticeData.questionList)

    const showExpendBlock = (params) => {
      questionList.value.forEach((item) => {
        item.isExpand = false
      })
      setTimeout(() => {
        questionList.value[params.index].isExpand = params.isExpand
      }, 300)
    }

    return {
      promiseList,
      reassureList,
      questionList,
      showExpendBlock,
      ImageBanner,
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
      left: calc(50% - 96px);
      z-index: 20;
      font-size: 48px;
    }
    img {
      width: 100%;
    }
  }
  .why-us {
    padding: 72px 10vw;
    .button-title {
      width: 200px;
      height: 40px;
      font-size: var(--font-l);
      background-color: var(--height-light);
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 45px auto;
    }
    .icon-description-block {
      display: flex;
      justify-content: center;
    }
  }

  .our-right-block {
    padding: 72px 10vw;
    .our-right {
      margin-top: 72px;
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
  }

  .question {
    padding: 72px 0;
    background-color: var(--primary);
    .expand {
      margin-top: 48px;
    }
  }
}
@media (max-width: 800px) {
  .notice {
    .banner {
      .title {
        font-size: 32px;
        left: calc(50% - 96px);
      }
    }
  }
}
@media (max-width: 460px) {
  .notice {
    .banner {
      .title {
        top: calc(50% - 11px);
        left: calc(50% - 44px);
        font-size: var(--font-xl);
      }
    }
    .why-us {
      .icon-description-block {
        flex-direction: column;
        align-items: center;
      }
    }
    .our-right-block {
      padding: 36px 15vw;
      .our-right {
        margin-top: 36px;
        font-size: var(--mobile-font-m);
        padding: 0 0 36px 0;
      }
    }
  }
}
</style>
