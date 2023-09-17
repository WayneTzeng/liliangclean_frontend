<template>
  <div class="performance">
    <div class="banner">
      <h1 class="title">清潔實績</h1>
      <img :src="ImageBanner" />
    </div>
    <div class="performance-category">
      <ChapterTitle idData="ct-p1" title="案例項目" />
      <div class="category-block">
        <PerformanceCategoryItem
          v-for="(category, idx) in categoryList"
          :key="idx"
          :category="category"
          @click="goTo(category.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/index'
import ChapterTitle from '@/components/ChapterTitle.vue'
import PerformanceCategoryItem from '@/components/PerformanceCategoryItem.vue'
import ImageBanner from '@/assets/image/image/image-performance-banner.png'

export default {
  name: 'PerformancePage',
  components: {
    ChapterTitle,
    PerformanceCategoryItem,
  },
  setup() {
    const router = useRouter()

    const categoryList = ref([])
    onMounted(() => {
      api
        .getCategory()
        .then((res) => {
          categoryList.value = res
        })
        .catch((error) => {
          console.error(error)
        })
    })

    const goTo = (id) => {
      router.push({ name: 'ArticleList', params: { id } })
    }

    return {
      categoryList,
      goTo,
      ImageBanner,
    }
  },
}
</script>

<style lang="scss" scoped>
.performance {
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
  .performance-category {
    padding: 72px 10vw;
    .category-block {
      padding: 72px 0 0 0;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 5vw;
      .performance-category-item {
        flex: 0 0 calc(25% - (15vw / 4));
      }
    }
  }
}
@media (max-width: 800px) {
  .performance {
    .banner {
      .title {
        font-size: 32px;
        left: calc(50% - 64px);
      }
    }
    .performance-category {
      .category-block {
        .performance-category-item {
          flex: 0 0 calc(50% - (5vw / 2));
        }
      }
    }
  }
}
@media (max-width: 460px) {
  .performance {
    .banner {
      .title {
        top: calc(50% - 11px);
        left: calc(50% - 44px);
        font-size: var(--font-xl);
      }
    }
  }
  .performance-category {
    padding: 36px 15vw;
  }
}
</style>
