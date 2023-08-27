<template>
  <div class="performance-article-card">
    <ImageCompareCard :imgData="imgData" hideButton />
    <div class="content">
      <div class="title">
        這是標題這是標題這是標題這是標題這是標題這是標題這是標題這是標題這是標題這是標題
      </div>
      <div class="description">
        這是內文這是內文這是內文這是內文這是內文這是內文這是內文這是內文這是內文這是內文這是內文這是內文這是內文這是內文這是內文這是內文這是內文這是內文
      </div>
      <div class="more">Read More></div>
      <div class="date">2023/11/13</div>
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
  props: {},
  setup() {
    const imgData = ref({
      beforeImage: 'https://picsum.photos/360/300?random=1',
      afterImage: 'https://picsum.photos/360/300?random=2',
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
  height: 600px;
  position: relative;
  .content {
    width: 360px;
    position: absolute;
    top: 290px;
    left: 0;
    padding: 20px 36px 48px 36px;
    background-color: var(--white);
    border-radius: 10px;

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
    .description {
      margin-top: 36px;
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
      margin-top: 40px;
      font-size: 10px;
      color: var(--brown);
      text-align: right;
    }
  }
}

@media (max-width: 460px) {
  .performance-article-card {
  }
}
</style>
