<template>
  <div class="category-menu">
    <div class="title">案例項目</div>
    <div
      v-for="(item, idx) in category"
      :key="idx"
      class="option"
      :class="{ active: articleListId === item.id }"
      @click="handleClick(item.id)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryMenuComponent',
  components: {},
  props: {
    category: {
      type: Array,
      default: () => [],
    },
    articleListId: {
      type: String,
      default: '',
    },
  },
  emits: ['update:articleListId', 'selectArticleList'],
  setup(props, { emit }) {
    const handleClick = (id) => {
      emit('update:articleListId', id)
      emit('selectArticleList')
    }
    return {
      handleClick,
    }
  },
}
</script>

<style lang="scss" scoped>
.category-menu {
  width: 200px;
  border-radius: 10px;
  overflow: hidden;

  .title,
  .option {
    height: 48px;
    font-size: var(--font-m);
    overflow: hidden;
    overflow-wrap: unset;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: var(--font-l);
    line-height: 48px;
    text-align: center;
    padding: 0 16px;
  }
  .title {
    color: var(--white);
    background-color: var(--brown);
  }
  .option {
    color: var(--brown);
    background-color: var(--height-light);
    &:hover {
      background-color: var(--primary);
    }
    &.active {
      background-color: var(--primary);
    }
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      overflow: hidden;
    }
  }
  .option ~ .option {
    cursor: pointer;
    border-top: solid 1px var(--brown);
  }
}

@media (max-width: 460px) {
  .category-menu {
  }
}
</style>
