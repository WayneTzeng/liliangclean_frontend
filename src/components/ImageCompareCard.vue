<template>
  <div class="image-compare-card">
    <component :is="dynamicComponent" v-if="dynamicComponent">
      <!-- eslint-disable -->
      <img slot="first" style="width: 100%" :src="imgData.beforeImage" />
      <img slot="second" style="width: 100%" :src="imgData.afterImage" />
      <!-- eslint-enable -->
    </component>
    <CustomButton
      v-if="!hideButton"
      class="button"
      full
      :text="imgData.btnText"
    />
  </div>
</template>

<script>
import { ref, onMounted, markRaw } from 'vue'
import CustomButton from './CustomButton.vue'

export default {
  name: 'ImageCompareCardComponent',
  components: {
    CustomButton,
  },
  props: {
    imgData: {
      type: Object,
      default: () => {},
    },
    hideButton: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const dynamicComponent = ref(null)

    onMounted(async () => {
      const componentAModule = await import('@img-comparison-slider/vue')
      dynamicComponent.value = markRaw(componentAModule.ImgComparisonSlider)
    })
    return { dynamicComponent }
  },
}
</script>

<style lang="scss" scoped>
.image-compare-card {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  :deep(.rendered) {
    width: 100%;
  }

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
