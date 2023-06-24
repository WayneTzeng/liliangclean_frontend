<template>
  <div class="overlay" :class="{ light }"></div>
</template>

<script>
export default {
  name: 'Overlay',
  props: {
    light: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #00000066;
  overflow: hidden;
  z-index: 1000;

  &.light {
    background: #ffffff40;
  }
}
</style>
