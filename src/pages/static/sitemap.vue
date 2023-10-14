<template>
  <div class="sitemap"></div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'ServicePage',
  components: {},
  setup() {
    onMounted(() => {
      location.href = 'https://google.com'
    })
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
