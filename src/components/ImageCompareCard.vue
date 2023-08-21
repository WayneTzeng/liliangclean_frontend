<template>
  <div class="image-compare-card" :class="{ 'is-first': isFirst }">
    <ImgComparisonSlider direction="vertical" tabindex="0" class="rendered">
      <!-- eslint-disable -->
      <img slot="first" style="width: 100%" :src="imgData.beforeImage" />
      <img slot="second" style="width: 100%" :src="imgData.afterImage" />
      <!-- eslint-enable -->
    </ImgComparisonSlider>
    <CustomButton class="button" full :text="imgData.btnText" />
  </div>
</template>

<script>
import { ImgComparisonSlider } from '@img-comparison-slider/vue'
import CustomButton from './Button.vue'

export default {
  name: 'ImageCompareCardComponent',
  components: {
    ImgComparisonSlider,
    CustomButton,
  },
  props: {
    imgData: {
      type: Object,
      default: () => {},
    },
    isFirst: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
}
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
  margin: 5vw 0 0 5vw;
}

.image-compare-card:nth-child(3n + 1) {
  margin-left: 0;
}

.image-compare-card:nth-child(1),
.image-compare-card:nth-child(2),
.image-compare-card:nth-child(3) {
  margin-top: 0;
}

@media (max-width: 460px) {
  .image-compare-card {
    width: 100%;
  }

  .image-compare-card ~ .image-compare-card {
    margin-left: 0;
    margin-top: 34px;
  }
}
</style>
