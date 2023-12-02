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
      location.href = 'https://dpazbzrwlrs5q.cloudfront.net/sitemap.xml'
    })
    return {}
  },
}
</script>

<style lang="scss" scoped></style>