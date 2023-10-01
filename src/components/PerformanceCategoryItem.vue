<template>
  <div class="performance-category-item">
    <img :src="category.category_imge" alt="" />
    <div class="title">{{ category.category_name }}</div>
  </div>
</template>

<script>
export default {
  name: 'PerformanceCategoryItemComponent',
  props: {
    category: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
.performance-category-item {
  width: 200px;
  cursor: pointer;
  img {
    width: 100%;
  }
  .title {
    margin-top: 12px;
    text-align: center;
    font-size: var(--font-m);
    font-style: normal;
    font-weight: 600;
    height: 20px;
    line-height: 20px;
  }
  &:hover {
    .title {
      font-size: var(--font-l);
    }
  }
}

@media (max-width: 460px) {
  .performance-category-item {
  }
}
</style>
