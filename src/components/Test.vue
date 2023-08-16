<template>
  <div class="tabs" :class="{ 'common-type': commonType }">
    <div
      v-for="(tab, idx) in list"
      :key="idx"
      class="tab"
      :class="{ active: index === idx }"
      @click="selectTab(idx)"
    >
      {{ tab }}<span v-if="commonType && idx !== list.length - 1">|</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabsComponent',
  components: {},
  props: {
    list: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    },
    commonType: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:index'],
  setup(props, { emit }) {
    const selectTab = (index) => {
      emit('update:index', index)
    }

    return {
      selectTab
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  display: flex;
  justify-content: center;

  .tab {
    padding: 10px 20px;
    border-radius: 16px;
    border: 1px solid var(--second);
    /* color: var(--second); */
    color: var(--beige);
    background-color: var(--second);
    opacity: 0.6;
    font-size: var(--font-l);
    text-wrap: nowrap;
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

  &.common-type {
    .tab {
      color: var(--brown);
      background-color: var(--beige);
      border: none;
      padding: 0;
      margin: 0;
      opacity: 0.6;
      span {
        color: var(--brown);
        margin: 0 15px;
      }
      &.active {
        opacity: 1;
        color: var(--brown);
        span {
          opacity: 0.6;
          color: var(--brown);
          margin: 0 15px;
        }
      }
    }
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

    &.common-type {
      justify-content: center;
      padding: 0;
      .tab {
        width: auto;
      }
    }
  }
}
</style>
