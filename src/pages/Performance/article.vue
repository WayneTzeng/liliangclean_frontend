<template>
  <div class="article">
    <div class="bread-crumbs">
      <span @click="goToCategory">{{ articleData.categoryName }}</span>
      &nbsp;&gt;&nbsp;
      <span @click="goToArticleList">{{ articleData.articleListName }}</span>
      &nbsp;&gt;&nbsp;
      <span>{{ articleData.title }}</span>
    </div>
    <div class="content">
      <div class="title">{{ articleData.title }}</div>
      <div class="date">{{ articleData.date }}</div>
      <div class="description" v-html="articleData.description"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/index'

export default {
  name: 'ArticlePage',
  components: {},
  setup() {
    const route = useRoute()
    const router = useRouter()

    const articleListId = route.params.id

    const articleData = ref({})
    api
      .getArticle()
      .then((res) => {
        articleData.value = res
      })
      .catch((error) => {
        console.error(error)
      })

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

    return {
      articleData,
      goToCategory,
      goToArticleList,
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
}
@media (max-width: 460px) {
  .article {
  }
}
</style>
