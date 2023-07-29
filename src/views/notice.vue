<template>
  <div class="notice">
    <div class="banner">
      <h1 class="title">客戶權益須知</h1>
      <img :src="ImageBanner" />
    </div>
    <div class="why-us">
      <ChapterTitle title="為什麼選擇我們" />
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
import IconDescription from '../components/IconDescription.vue'
import ExpendBlock from '../components/ExpendBlock.vue'
import ImageBanner from '../assets/image/image/image-notice-banner.png'

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
        item.isExpend = false
      })
      setTimeout(() => {
        questionList.value[params.index].isExpend = params.isExpend
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
      left: calc(50% - 144px);
      z-index: 20;
      font-size: 48px;
    }
    img {
      width: 100%;
    }
  }
  .why-us {
    padding: 72px 0;
    /* color: var(--brown); */
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
  .question {
    padding: 72px 0;
    background-color: var(--primary);
    .expend {
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
        left: calc(50% - 66px);
        font-size: var(--font-xl);
      }
    }
    .why-us {
      .icon-description-block {
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>
