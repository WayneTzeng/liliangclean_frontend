<template>
  <div class="article-list">
    <div class="banner">
      <h1 class="title">清潔實績</h1>
      <img :src="ImageBanner" />
    </div>
    <div class="content">
      <div class="article-content">
        <ChapterTitle
          idData="ct-al1"
          :title="chapterTitle"
          :outerWidth="outerWidth"
          short
        />
        <PerformanceArticleCard
          v-for="(item, idx) in articleList"
          :key="idx"
          class="article-card"
          :item="item"
        />
      </div>
      <CategoryMenu
        v-model:articleListId="articleListId"
        :category="articleCategory"
        @selectArticleList="selectArticleList"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/index'
import ChapterTitle from '@/components/ChapterTitle.vue'
import CategoryMenu from '@/components/CategoryMenu.vue'
import PerformanceArticleCard from '@/components/PerformanceArticleCard.vue'
import ImageBanner from '@/assets/image/image/image-performance-banner.png'

export default {
  name: 'ArticleListPage',
  components: {
    ChapterTitle,
    CategoryMenu,
    PerformanceArticleCard,
  },
  setup() {
    const route = useRoute()

    const categoryId = route.params.id

    const selectArticleList = () => {
      api
        .getArticleList(articleListId.value)
        .then((res) => {
          articleList.value = res
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const articleCategory = ref([])
    const articleListId = ref('')
    const articleList = ref([])
    const chapterTitle = ref('')
    const outerWidth = ref(0)
    onMounted(async () => {
      await api
        .getArticleCategory(categoryId)
        .then((res) => {
          articleCategory.value = res
        })
        .catch((error) => {
          console.error(error)
        })
      articleListId.value = articleCategory.value[0].id
      chapterTitle.value = articleCategory.value[0].name
      const dom = document.getElementById('ct-al1')
      setTimeout(() => {
        outerWidth.value = dom.clientWidth
      }, 500)

      selectArticleList()
    })

    return {
      articleCategory,
      articleListId,
      chapterTitle,
      outerWidth,
      articleList,
      selectArticleList,
      ImageBanner,
    }
  },
}
</script>

<style lang="scss" scoped>
.article-list {
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
  .content {
    padding: 72px 10vw;
    display: flex;
    justify-content: flex-start;
    .article-content {
      width: calc(80vw - 200px);
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 5vw;
      .article-card {
        max-width: 360px;
        flex: 0 0 calc((100% - 10vw) / 2);
      }
    }
  }
}
@media (max-width: 800px) {
  .article-list {
    .banner {
      .title {
        font-size: 32px;
        left: calc(50% - 64px);
      }
    }
  }
}
@media (max-width: 460px) {
  .article-list {
    .banner {
      .title {
        top: calc(50% - 11px);
        left: calc(50% - 44px);
        font-size: var(--font-xl);
      }
    }
    .content {
      padding: 36px 0;
    }
  }
}
</style>
