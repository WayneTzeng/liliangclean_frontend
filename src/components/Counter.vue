<template>
  <div class="counter">
    <div class="icon" @click="onCount(-1)">
      <img :src="IconMinus" alt="icon-minus" />
    </div>
    <div class="count">
      {{ count }}
    </div>

    <div class="icon" @click="onCount(1)">
      <img :src="IconPlus" alt="icon-plus" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import IconPlus from '@/assets/image/icon/i-plus.svg'
import IconMinus from '@/assets/image/icon/i-minus.svg'

export default {
  name: 'CounterComponent',
  components: {},
  props: {},
  emits: ['update:qty'],
  setup(props, { emit }) {
    const count = ref(0)

    const onCount = (qty) => {
      if (qty < 0 && count.value <= 0) return
      count.value += qty

      emit('update:qty', count.value)
    }

    return {
      count,
      onCount,
      IconPlus,
      IconMinus,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.counter {
  width: 120px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    height: 32px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .count {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--font-m);
  }
}

@media (max-width: 760px) {
  .counter {
  }
}
</style>
