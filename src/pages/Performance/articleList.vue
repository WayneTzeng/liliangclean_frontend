<template>
  <div class="article-list">
    <div class="banner">
      <h1 class="title">清潔實績</h1>
      <img :src="ImageBanner" />
    </div>
    <div class="content">
      <div class="article-content">
        <ChapterTitle
          class="use-in-pc"
          idData="ct-al1"
          :title="selectedCategory"
          :outerWidth="outerWidth"
          short
        />
        <PerformanceArticleCard
          v-for="(item, idx) in articleListForPage"
          :key="idx"
          class="article-card"
          :item="item"
          :clickAction="() => goTo(item.id)"
        />
      </div>
      <CategoryMenu
        v-model:articleListId="articleListId"
        class="category-menu"
        :category="articleCategory"
        :selectedCategory="selectedCategory"
        @selectArticleList="selectArticleList"
      />
    </div>
    <div class="pagination">
      <div
        v-for="page in paginationList"
        :key="`page-${page}`"
        :class="{ selected: page === selectedPage }"
        @click="selectPage(page)"
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script>
const CARDS_PER_PAGE = 4

import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
    const router = useRouter()

    const articleCategory = ref([])
    const articleListId = ref('')
    const articleList = ref([])
    const outerWidth = ref(0)
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
      const dom = document.getElementById('ct-al1')
      setTimeout(() => {
        outerWidth.value = dom.clientWidth
      }, 500)

      selectArticleList()
    })

    const selectedCategory = computed(() => {
      const array = articleCategory.value.filter(
        (item) => item.id === articleListId.value
      )

      return array[0]?.name
    })

    const selectedPage = ref(1)
    const paginationList = computed(() => {
      const array = []
      const pages = Math.ceil(articleList.value.length / CARDS_PER_PAGE)
      console.log('pages')
      for (let i = 1; i < pages + 1; i++) {
        array.push(i)
      }
      return array
    })

    const selectPage = (page) => {
      selectedPage.value = page
    }

    const articleListForPage = computed(() => {
      return articleList.value.filter((item, idx) => {
        if (
          idx < selectedPage.value * CARDS_PER_PAGE &&
          idx >= (selectedPage.value - 1) * CARDS_PER_PAGE
        ) {
          return item
        }
      })
    })

    const goTo = (articleId) => {
      router.push({
        name: 'Article',
        params: {
          id: categoryId,
          articleId,
        },
      })
    }

    return {
      articleCategory,
      articleListId,
      selectedCategory,
      outerWidth,
      articleList,
      articleListForPage,
      paginationList,
      selectedPage,
      selectArticleList,
      selectPage,
      goTo,
      ImageBanner,
    }
  },
}
</script>

<style lang="scss" scoped>
.article-list {
  padding-bottom: 64px;
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
    padding: 72px 10vw 18px 10vw;
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
  .pagination {
    width: calc(100% - 25vw - 200px);
    margin-left: 10vw;
    height: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    div {
      width: 20px;
      height: 20px;
      line-height: 20px;
      cursor: pointer;
      font-size: var(--font-m);
      color: var(--black);
    }
    div ~ div {
      margin-left: 16px;
    }
    .selected {
      color: blue;
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
    .content {
      padding: 72px 5vw 18px 5vw;
      .article-content {
        width: calc(90vw - 200px);
      }
    }
    .pagination {
      width: calc(100% - 15vw - 200px);
      margin-left: 5vw;
    }
  }
}
@media (max-width: 670px) {
  .article-list {
    .banner {
      .title {
        top: calc(50% - 11px);
        left: calc(50% - 44px);
        font-size: var(--font-xl);
      }
    }
    .content {
      padding: 36px 5vw 18px 5vw;
      .article-content {
        width: calc(90vw - 200px);
        .article-card {
          max-width: 360px;
          flex: 0 0 calc(100% - 5vw);
        }
      }
    }
  }
}
@media (max-width: 460px) {
  .article-list {
    .content {
      padding: 50px;
      flex-direction: column-reverse;
      .article-content {
        width: calc(100vw - 100px);
        .article-card {
          flex: 0 0 calc(100%);
        }
      }
      .category-menu {
        width: calc(100vw - 100px);
        margin-bottom: 50px;
      }
    }
    .pagination {
      width: 100%;
      margin-left: 0;
    }
  }
}
</style>
