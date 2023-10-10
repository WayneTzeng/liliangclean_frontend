<template>
  <div class="checkbox">
    <div v-for="(item, idx) in specification" :key="idx" class="block">
      <input type="checkbox" @click="onCheck(item)" />
      <div class="checked"></div>
      <div>{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiCheckboxComponent',
  components: {},
  props: {
    specification: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:checked'],
  setup(props, { emit }) {
    const array = []
    const onCheck = (item) => {
      const existIndex = array.indexOf(item)
      if (existIndex !== -1) {
        array.splice(existIndex, 1)
      } else {
        array.push(item)
      }
      emit('update:checked', array)
    }

    return {
      onCheck,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.checkbox {
  min-height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .block {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 4px;
    input {
      position: relative;
      width: 24px;
      height: 24px;
      border: 2px solid var(--second);
      border-radius: 5px;
      -webkit-appearance: none;
      -webkit-tap-highlight-color: transparent;
      z-index: 50;
    }
    input:checked ~ .checked {
      width: 18px;
      height: 18px;
      position: absolute;
      left: 3px;
      top: 3px;
      border-radius: 2px;
      background-color: var(--second);
      z-index: 30;
    }
  }
  .block ~ .block {
    margin-left: 16px;
  }
}

@media (max-width: 760px) {
  .checkbox {
  }
}
</style>
