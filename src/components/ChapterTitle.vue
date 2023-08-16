<template>
  <div
    class="chapter-title"
    :class="{ white, beige }"
    :style="{ '--titleWidth': titleWidth }"
  >
    <div class="left-line"></div>
    <div :id="idData" class="title">
      {{ title }}
    </div>
    <div class="right-line"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ChapterTitleComponent',
  props: {
    idData: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    white: {
      type: Boolean,
      default: false
    },
    beige: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const titleWidth = ref(0)
    const calcWidth = () => {
      const dom = document.getElementById(`${props.idData}`)
      titleWidth.value = dom.clientWidth
    }
    onMounted(() => {
      calcWidth()
    })
    console.log(import.meta.env.SSR)
    if (!import.meta.env.SSR) {
      window.onresize = () => {
        calcWidth()
      }
    }

    return {
      titleWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.chapter-title {
  width: 100%;
  height: 22px;
  display: flex;
  justify-content: center;
  position: relative;

  .title {
    font-size: var(--font-xl);
    font-weight: 600;
    color: var(--brown);
  }

  .left-line,
  .right-line {
    width: calc(((60vw - var(--titleWidth) * 1px) - 72px) / 2);
    height: 2px;
    position: absolute;
    top: 10px;
    background-color: var(--brown);
  }
  .left-line {
    left: 20vw;
  }
  .right-line {
    right: 20vw;
  }
  &.white {
    .title {
      color: var(--white);
    }
    .left-line,
    .right-line {
      background-color: var(--white);
    }
  }

  &.beige {
    .title {
      color: var(--beige);
    }
    .left-line,
    .right-line {
      background-color: var(--beige);
    }
  }
}

@media (max-width: 460px) {
  .chapter-title {
    height: 18px;
    .title {
      font-size: var(--mobile-font-xl);
    }
    .left-line,
    .right-line {
      width: calc(((70vw - var(--titleWidth) * 1px) - 24px) / 2);
      top: 8px;
    }
    .left-line {
      left: 15vw;
    }
    .right-line {
      right: 15vw;
    }
  }
}
</style>
