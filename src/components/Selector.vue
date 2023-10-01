<template>
  <div class="selector">
    <div class="pc-select" :class="{ 'is-open': isOpen }" @click="openOption">
      <div class="defaultOption">{{ option }}</div>
    </div>
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
</template>

<script>
import { ref } from 'vue'

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
    initEmptySelect: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:index'],
  setup(props, { emit }) {
    const option = ref(
      !props.initEmptySelect ? props.specification[0] : '請選擇'
    )
    const isOpen = ref(false)

    const onSelect = (index) => {
      option.value = props.specification[index]
      isOpen.value = !isOpen.value
      emit('update:index', index)
    }
    const openOption = () => {
      isOpen.value = !isOpen.value
    }

    return {
      option,
      isOpen,
      onSelect,
      openOption,
    }
  },
  watch: {
    outerClose() {
      if (this.outerClose) {
        this.isOpen = false
      }
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.selector {
  width: 120px;
  height: 34px;
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
  border: 1px solid var(--brown);
  box-sizing: border-box;
  background-image: url('../assets/image/icon/icon-arrow-down-s-gray.svg');
  background-position: right 0.5em top 50%, 0 0;
  background-repeat: no-repeat, repeat;
  outline: none;
  &.is-open {
    border: 1px solid var(--primary);
  }
  .defaultOption {
    line-height: 20px;
  }
}
.options {
  box-sizing: border-box;
  width: 120px;
  height: 0px;
  margin-top: 8px;
  background: #ffffff;
  border: none;
  box-shadow: none;
  border-radius: 4px;
  padding: 0;
  position: absolute;
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
    position: absolute;
    z-index: 9900;
    .option {
      height: 32px;
      &:hover {
        background: #fafafa;
      }
    }
  }
}

@media (max-width: 760px) {
  .pc-select {
    text-align: left;
  }
  .options {
  }
}
</style>
