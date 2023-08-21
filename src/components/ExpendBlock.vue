<template>
  <div class="expend-block" :class="{ active: item.isExpend }">
    <div class="title" @click="handleClick">
      <div>
        {{ item.question }}
      </div>
      <img :src="IconArrowDown" />
    </div>
    <div v-html="item.answer" class="content"></div>
  </div>
</template>

<script>
import IconArrowDown from '../assets/image/icon/icon-arrow-down.svg'

export default {
  name: 'ExpendBlock',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  emits: ['block-expend'],
  setup(props, { emit }) {
    const handleClick = () => {
      emit('block-expend', {
        isExpend: !props.item.isExpend,
        index: props.index,
      })
    }

    return {
      handleClick,
      IconArrowDown,
    }
  },
}
</script>

<style lang="scss" scoped>
.expend-block {
  width: 80vw;
  margin: 0 10vw;
  color: var(--brown);
  line-height: 24px;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  max-height: 64px;
  transition: max-height 0.5s ease-in-out;
  cursor: pointer;
  &.active {
    max-height: 800px;

    .title {
      img {
        transform: rotate(180deg);
      }
    }
  }

  .title {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    background-color: var(--height-light);
    border-radius: 10px;
    font-size: var(--font-l);

    img {
      width: 20px;
      transition: transform 0.5s ease-in-out;
    }
  }
  .content {
    padding: 20px 40px 40px 40px;
    font-size: var(--font-m);
  }
}

.expend-block ~ .expend-block {
  margin-top: 30px;
}
@media (max-width: 500px) {
  .expend-block {
    width: 90vw;
    margin: 0 5vw;
    &.active {
      max-height: 1000px;
    }
    .title {
      padding: 20px 15px;
      font-size: var(--mobile-font-l);
      img {
        width: 16px;
      }
    }
    .content {
      padding: 10px 15px 20px 15px;
      font-size: var(--font-m);
    }
  }
}
</style>
