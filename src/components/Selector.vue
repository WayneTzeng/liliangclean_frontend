<template>
  <div class="selector">
    <div
      class="pc-select"
      :class="{ 'is-open': isOpen }"
      @click.stop="openOption"
    >
      <div>{{ option }}</div>
      <div class="options" :class="[{ 'is-open': isOpen }]">
        <div
          v-for="(opt, idx) in specification"
          :key="idx"
          :value="idx"
          class="option"
          @click="onSelect(idx)"
        >
          {{ opt }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectorComponent',
  components: {},
  props: {
    specification: {
      type: Array,
      default: () => [],
    },
    outerClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      option: this.specification[0],
      isOpen: false,
    }
  },
  watch: {
    outerClose() {
      if (this.outerClose) {
        this.isOpen = false
      }
    },
  },
  created() {},
  mounted() {},
  methods: {
    onSelect(index) {
      this.option = this.specification[index]
      this.$emit('seleted', index)
    },
    openOption() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="scss" scoped>
.selector {
  display: inline-block;
}

.pc-select {
  background: #ffffff;
  font-size: 14px;
  line-height: 20px;
  color: var(--brown);
  padding: 6px 10px;
  position: relative;
  border-radius: 4px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  background-image: url('../assets/image/icon/icon-arrow-down-s-gray.svg');
  background-position: right 0.5em top 50%, 0 0;
  background-repeat: no-repeat, repeat;
  outline: none;

  option {
    font-size: 40px !important;
  }
}
.pc-select {
  width: 200px;
  min-height: 32px;
  border: 1px solid var(--brown);
  position: relative;
  z-index: 30;

  &.is-open {
    border: 1px solid var(--primary);
  }
}
.options {
  box-sizing: border-box;
  width: 200px;
  height: 0px;
  margin-top: 8px;
  background: #ffffff;
  border: none;
  box-shadow: none;
  border-radius: 4px;
  padding: 0;
  position: absolute;
  left: 0;
  overflow: hidden;
  transition: all 0.5s ease;

  .option {
    height: 0px;
    line-height: 20px;
    box-sizing: border-box;
    padding: 6px 10px;

    &:hover {
      background: #fafafa;
    }
  }
  &.is-open {
    min-height: 32px;
    height: auto;
    padding: 6px 0;
    border: 1px solid #f2f2f2;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.06);

    .option {
      height: 32px;
      &:hover {
        background: #fafafa;
      }
    }
  }
}

@media (max-width: 770px) {
  .pc-select {
    /* width: calc(100vw - 32px); */
    text-align: left;
  }
  .options {
    width: 100%;
  }
}
</style>
