<template>
  <div
    class="overlay"
    :class="{ 'hide-overlay': hideOverlay, 'show-dialog': innerShow }"
  >
    <div class="dialog">
      <img :src="iconCross" alt="cross" class="cross" @click="closeDialog" />
      <div class="title">{{ title }}</div>
      <div class="text">
        <span>
          <slot></slot>
        </span>
      </div>
      <Button class="button" :text="confirmText" @click="doAction" />
    </div>
  </div>
</template>

<script>
import iconCross from '../assets/image/icon/icon-cross.svg';
import Button from './Button.vue';
import { computed } from 'vue';

export default {
  name: 'Dialog',
  components: {
    Button,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '提醒',
    },
    confirmText: {
      type: String,
      default: '確定',
    },
    action: {
      type: Function,
      default: () => {},
    },
    hideOverlay: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:show'],
  setup(props, { emit }) {
    const innerShow = computed(() => props.show);
    const closeDialog = () => {
      emit('update:show', false);
    };

    const doAction = () => {
      closeDialog();
      props.action();
    };

    return {
      innerShow,
      doAction,
      closeDialog,
      iconCross,
    };
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: -1;
  transition: 300ms;

  &.hide-overlay {
    background: #00000000;
    z-index: -1;
  }

  &.show-dialog {
    z-index: 1000;
    background: #00000066;
    .dialog {
      z-index: 1050;
      top: 50%;
      opacity: 1;
    }
  }

  .dialog {
    display: flex;
    transition: 300ms;
    opacity: 0;
    z-index: -1;
    position: absolute;
    top: 51%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85vw;
    height: fit-content;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 4px;
    padding: var(--space-4) var(--space-2);
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.05);
    border-radius: 16px;

    .cross {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 20px;
      height: 20px;
    }
    .title {
      font-weight: 500;
      font-size: var(--font-l);
      color: var(--primary);
      line-height: 32px;
    }
    .text {
      font-style: normal;
      font-weight: normal;
      font-size: var(--font-m);
      line-height: 28px;
      text-align: center;
      color: var(--light);
      display: flex;
      margin-top: var(--space-3);
    }

    .button {
      margin-top: var(--space-3);
      display: flex;
      width: 62%;
    }
  }
}

@media (max-width: 460px) {
  .overlay {
    .dialog {
      .title {
        font-size: var(--mobile-font-l);
      }
      .text {
        font-size: var(--mobile-font-m);
      }
    }
  }
}
</style>
