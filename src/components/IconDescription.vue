<template>
  <div class="icon-description" :style="{ '--count': count }">
    <div class="image"><img :src="data.img" /></div>
    <span class="title">{{ data.title }}</span>
    <span class="sub-title">{{ data.subTitle }}</span>
  </div>
</template>

<script>
export default {
  name: 'IconDescriptionComponent',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    count: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
.icon-description {
  width: calc((100vw - var(--count) * 36px) / var(--count));
  max-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .image {
    width: 60px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    width: 100%;
    font-size: var(--font-xl);
    color: var(--brown);
    text-wrap: wrap;
    text-align: center;
    margin-top: 8px;
  }
  .sub-title {
    width: 100%;
    font-size: var(--font-s);
    color: var(--black);
    text-wrap: wrap;
    text-align: center;
    margin-top: 8px;
    line-height: 20px;
  }
}
.icon-description ~ .icon-description {
  margin-left: 24px;
}

@media (max-width: 460px) {
  .icon-description {
    width: 75vw;
    .title {
      font-size: var(--mobile-font-l);
    }
    .sub-title {
      font-size: var(--mobile-font-m);
    }
  }
  .icon-description ~ .icon-description {
    margin-left: 0px;
    margin-top: 36px;
  }
}
</style>
