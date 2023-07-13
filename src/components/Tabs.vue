<template>
  <div class="tabs">
    <div
      v-for="(tab, idx) in list"
      :key="idx"
      class="tab"
      :class="{ active: index === idx }"
      @click="selectTab(idx)"
    >
      {{ tab }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabsComponent',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:index'],
  setup(props, { emit }) {
    const selectTab = (index) => {
      emit('update:index', index)
    }

    return {
      selectTab,
    }
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;

  .tab {
    padding: 10px 20px;
    border-radius: 16px;
    border: 1px solid var(--second);
    /* color: var(--second); */
    color: var(--beige);
    background-color: var(--second);
    opacity: 0.6;
    font-size: var(--font-l);
    cursor: pointer;

    &.active {
      opacity: 1;
      color: var(--white);
      background-color: var(--second);
    }
  }
  .tab ~ .tab {
    margin-left: 20px;
  }
}

@media (max-width: 460px) {
  .tabs {
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 5vw;

    .tab {
      margin-top: 16px;
      width: 45%;
      display: flex;
      justify-content: center;
    }
    .tab ~ .tab {
      margin-left: 0;
    }
  }
}
</style>
