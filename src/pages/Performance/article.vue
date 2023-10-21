<template>
  <div class="article">
    <div class="bread-crumbs">
      <span @click="goToArticleList">{{ articleData.main_category }}</span>
      &nbsp;&gt;&nbsp;
      <span>{{ articleData.title }}</span>
    </div>
    <div class="content">
      <div class="title">{{ articleData.title }}</div>
      <div class="date">{{ articleData.modify_time }}</div>
      <div class="description" v-html="articleData.description"></div>
    </div>
    <div class="pagination">
      <img
        :src="IconArrowDown"
        alt="icon-prev-page"
        class="prev-page"
        @click="goToPage(0)"
      />
      <img
        :src="IconArrowDown"
        alt="icon-next-page"
        class="next-page"
        @click="goToPage(1)"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/index'
import IconArrowDown from '@/assets/image/icon/icon-arrow-down.svg'

export default {
  name: 'ArticlePage',
  components: {},
  setup() {
    const route = useRoute()
    const router = useRouter()

    const articleListId = route.params.id
    const articleId = route.params.articleId

    const articleData = ref({})

    const getArticle = (id) => {
      api
        .getArticle(id)
        .then((res) => {
          articleData.value = res
        })
        .catch((error) => {
          console.error(error)
        })
    }
    getArticle(articleId)

    const goToCategory = () => {
      router.push({ name: 'Performance' })
    }

    const goToArticleList = () => {
      router.push({
        name: 'ArticleList',
        params: {
          id: articleListId,
        },
      })
    }

    const goToPage = (isNext) => {
      const id = isNext ? articleData.value.next_id : articleData.value.prev_id
      getArticle(id)
      history.replaceState(null, null, `/performance/${articleListId}/${id}`)
    }

    return {
      articleData,
      goToCategory,
      goToArticleList,
      goToPage,
      IconArrowDown,
    }
  },
}
</script>

<style lang="scss" scoped>
.article {
  .bread-crumbs {
    padding: 5vw;
    color: var(--brown);
    span {
      font-size: var(--font-m);
      cursor: pointer;
    }
  }
  .content {
    padding: 0 10vw;
    .title {
      font-size: var(--font-xl);
      color: var(--brown);
      overflow: hidden;
      overflow-wrap: unset;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .date {
      font-size: var(--font-m);
      color: var(--brown);
      margin-top: 24px;
    }
    .description {
      margin-top: 24px;
    }
  }
  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5vw;
    box-sizing: border-box;
    .prev-page,
    .next-page {
      cursor: pointer;
    }

    .prev-page {
      transform: rotate(90deg);
    }
    .next-page {
      margin-left: 5vw;
      transform: rotate(-90deg);
    }
  }
}
@media (max-width: 460px) {
  .article {
  }
}
</style>
