<template>
  <div>ABOUT</div>
  <div id="count" @click="counterStore.increment()">
    {{ counterStore.count }}
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCounterStore } from '@/store/count'
import { useServerData } from '@/hooks'
const counterStore = useCounterStore()
useServerData(() => {
  counterStore.increment()
})
onMounted(() => {
  console.log('onMounted', import.meta.env.SSR)
})
console.log('setup', import.meta.env.SSR)
</script>
