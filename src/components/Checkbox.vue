<template>
  <div class="checkbox">
    <div class="block">
      <input type="checkbox" @click="onCheck" />
      <div class="checked"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CheckboxComponent',
  components: {},
  props: {},
  emits: ['update:checked'],
  setup(props, { emit }) {
    const checked = ref(false)

    const onCheck = () => {
      checked.value = !checked.value

      emit('update:checked', checked.value)
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
  width: 200px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  .block {
    position: relative;
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
}

@media (max-width: 760px) {
  .checkbox {
  }
}
</style>
