<template>
  <div class="reservation-icon">
    <div class="index">{{ innerIndex }}</div>
    <img :src="icon" />
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ReservationIconComponent',
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const innerIndex = computed(() =>
      props.index < 10 ? `0${props.index}` : props.index
    )
    return {
      innerIndex,
    }
  },
}
</script>

<style lang="scss" scoped>
.reservation-icon {
  margin-top: 60px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .index {
    position: relative;
    left: -40px;
    top: 20px;
    color: var(--brown);
    font-size: 24px;
    font-family: 'Noto Sans TC', sans-serif;
    font-weight: 700;
  }
  img {
    width: 80px;
    height: 80px;
  }
  .title {
    color: var(--brown);
    font-size: var(--font-m);
    font-weight: 600;
    margin-top: 25px;
  }
}

@media (max-width: 460px) {
  .reservation-icon {
    margin: 25px 0 25px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    position: relative;
    .index {
      font-size: 16px;
      left: 2vw;
      top: -5px;
      font-weight: 400;
      margin-left: 15vw;
      position: absolute;
    }
    img {
      width: 40px;
      height: 40px;
      margin-left: 20vw;
    }
    .title {
      font-size: var(--mobile-font-m);
      margin: 0;
      margin-left: 15px;
    }
  }
}
</style>
