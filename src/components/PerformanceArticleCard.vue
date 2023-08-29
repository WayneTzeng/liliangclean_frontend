<template>
  <div class="performance-article-card">
    <ImageCompareCard :imgData="imgData" hideButton />
    <div class="content" @click="clickAction">
      <div class="title">
        {{ item.title }}
      </div>
      <div class="subTitle">
        {{ item.subTitle }}
      </div>
      <div class="more">Read More></div>
      <div class="date">{{ item.date }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ImageCompareCard from './ImageCompareCard.vue'

export default {
  name: 'PerformanceArticleCardComponent',
  components: {
    ImageCompareCard,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    clickAction: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const imgData = ref({
      beforeImage: props.item.beforeImage,
      afterImage: props.item.afterImage,
    })
    return {
      imgData,
    }
  },
}
</script>

<style lang="scss" scoped>
.performance-article-card {
  width: 360px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px #888888;
  background-color: var(--white);
  .content {
    width: 100%;
    position: relative;
    top: -10px;
    left: 0;
    padding: 24px;
    background-color: var(--white);

    cursor: pointer;
    .title {
      width: 100%;
      height: 48px;
      overflow: hidden;
      overflow-wrap: unset;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: var(--font-l);
      line-height: 24px;
      text-align: justify;
    }
    .subTitle {
      margin-top: 24px;
      width: 100%;
      height: 60px;
      overflow: hidden;
      overflow-wrap: unset;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: var(--font-s);
      line-height: 20px;
      text-align: justify;
    }
    .more {
      font-size: 10px;
      color: #ef5a5a;
    }
    .date {
      margin-top: 20px;
      font-size: 10px;
      color: var(--brown);
      text-align: right;
    }
  }
}
</style>
