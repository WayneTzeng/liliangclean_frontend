<template>
  <div class="custom-input">
    <div class="block">
      <input v-model="inputValue" type="tel" @input="onInput" />
      <div class="checked"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CustomInputComponent',
  components: {},
  props: {},
  emits: ['update:inputValue'],
  setup(props, { emit }) {
    const inputValue = ref('')

    const onInput = () => {
      inputValue.value = inputValue.value.replace(/[^\d]/g, '')
      if (!/^[0-9]*$/.test(inputValue.value)) return
      emit('update:inputValue', inputValue.value)
    }

    return {
      inputValue,
      onInput,
    }
  },
}
</script>

<style lang="scss" scoped>
.custom-input {
  width: 120px;
  .block {
    width: 100%;
    input {
      width: 100%;
      height: 28px;
      outline: solid 2px var(--second);
      border-radius: 5px;
      padding: 0 8px;
    }
  }
}

@media (max-width: 760px) {
  .checkbox {
  }
}
</style>
