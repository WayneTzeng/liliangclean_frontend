<template>
  <div class="chapter-title">
    <div class="title" :class="{ white }">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChapterTitle',
  props: {
    title: {
      type: String,
      default: '',
    },
    white: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.chapter-title {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .title {
    font-size: 22px;
    font-weight: 600;
    color: var(--brown);

    &::before {
      content: '';
      width: 25vw;
      height: 2px;
      background: var(--brown);
      border-radius: 2px;
      position: absolute;
      top: 11px;
      left: calc(50vw + 84px);
    }

    &::after {
      content: '';
      width: 25vw;
      height: 2px;
      background: var(--brown);
      border-radius: 2px;
      position: absolute;
      top: 11px;
      left: calc(25vw - 84px);
    }

    &.white {
      color: #ffffff;
      &::before {
        background: #ffffff;
      }
      &::after {
        background: #ffffff;
      }
    }
  }
}

@media (max-width: 460px) {
  .chapter-title {
    .title {
      font-size: 18px;
      &::before {
        height: 1px;
        top: 9px;
        left: calc(50vw + 64px);
      }
      &::after {
        height: 1px;
        top: 9px;
        left: calc(25vw - 64px);
      }
    }
  }
}
</style>
