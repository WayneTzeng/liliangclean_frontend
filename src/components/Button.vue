<template>
  <button
    class="button"
    :class="{ gray, outline, disable, full, half, rounded }"
    :disabled="disable"
  >
    <div class="text">{{ text }}</div>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: '按鈕',
    },
    gray: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    full: {
      type: Boolean,
      default: false,
    },
    half: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.button {
  background-color: #f0daae;
  height: 70px;
  box-sizing: border-box;
  outline: none;
  box-shadow: none;
  border: none;
  padding: 25px 0;
  border-radius: 10px;

  &:active,
  &:focus {
    border: none;
  }

  .text {
    font-style: normal;
    font-weight: 500;
    font-size: var(--font-l);
    line-height: 16px;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--brown);
    font-family: Hiragino Mincho Pro;
  }

  &.gray {
    background-color: var(--gray);

    .text {
      color: var(--primary);
    }
  }

  &.full {
    width: 100%;
    height: 40px;
    padding: 25px 0;
  }

  &.half {
    letter-spacing: 5px;
    width: 50%;
    height: 40px;
    padding: 0;
  }

  &.outline {
    border: 1px solid var(----second);
    box-sizing: border-box;
    border-radius: 25px;
    background-color: transparent;

    .text {
      font-weight: normal;
      color: var(----second);
    }
  }

  &.rounded {
    border-radius: 25px;
  }

  &.disable {
    background: var(--light-gray);

    &.outline {
      background: transparent;
      border: 1px solid var(--gray);
      .text {
        color: var(--gray);
      }
    }
  }
}
@media (max-width: 460px) {
  .button {
    .text {
      font-size: var(--mobile-font-l);
    }
  }
}
</style>
