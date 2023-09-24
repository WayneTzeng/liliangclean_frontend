<template>
  <div class="category-menu">
    <div class="title">案例項目</div>
    <div class="option-block" :class="{ 'is-expand': isExpand }">
      <div class="selected-option" @click="expand">
        {{ selectedCategory }}
        <img :src="IconArrowDown" />
      </div>
      <div
        v-for="(item, idx) in category"
        :key="idx"
        class="option"
        :class="{ active: articleListId === item.id }"
        @click="handleClick(item.id)"
      >
        {{ item.category_name }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import IconArrowDown from '@/assets/image/icon/icon-arrow-down.svg'

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
    selectedCategory: {
      type: String,
      default: '',
    },
  },
  emits: ['update:articleListId', 'selectArticleList'],
  setup(props, { emit }) {
    const isExpand = ref(true)

    const expandForWindowSize = () => {
      isExpand.value = window.innerWidth > 460
    }

    onMounted(() => {
      expandForWindowSize()
    })

    const handleClick = (id) => {
      emit('update:articleListId', id)
      emit('selectArticleList')
    }

    const expand = () => {
      isExpand.value = !isExpand.value
    }
    return {
      isExpand,
      handleClick,
      expand,
      IconArrowDown,
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
  .option-block .option,
  .option-block .selected-option {
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

  .option-block {
    .option {
      color: var(--brown);
      background-color: var(--height-light);
      position: relative;
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
    .selected-option {
      display: none;
      background-color: var(--primary);
      border-bottom: solid 1px var(--brown);
      position: relative;
      cursor: pointer;
      img {
        position: absolute;
        right: 16px;
        top: 13px;
        transform: rotate(0deg);
        transition: transform 0.3s ease-in-out;
      }
    }
  }
}

@media (max-width: 460px) {
  .category-menu {
    .option-block {
      height: 47px;
      overflow: scroll;
      overflow: inherit;
      transition: height 0.3s ease-in-out;
      .selected-option {
        display: block;
      }
      &.is-expand {
        height: 240px;
        img {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
