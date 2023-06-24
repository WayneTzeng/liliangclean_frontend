<template>
  <div class="image-compare-card">
    <img :src="imgData.image" />
    <Button class="button" full :text="imgData.btnText" />
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'ImageCompareCard',
  components: {
    Button,
  },
  props: {
    imgData: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.image-compare-card {
  width: calc((100% - 10vw) / 3);
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
  }

  .button {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}

.image-compare-card ~ .image-compare-card {
  margin-left: 5vw;
}

@media (max-width: 400px) {
  .image-compare-card {
    width: 100%;
  }

  .image-compare-card ~ .image-compare-card {
    margin-left: 0;
    margin-top: 34px;
  }
}
</style>
