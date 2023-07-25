<template>
  <div class="tabs" :class="{ 'common-type': commonType }">
    <div
      v-for="(tab, idx) in list"
      :key="idx"
      class="tab"
      :class="{ active: index === idx }"
      @click="
        ;(commonType && (idx === 0 || idx === 2)) || !commonType
          ? selectTab(idx)
          : commonType && idx === 4
          ? logout()
          : () => {}
      "
    >
      {{ tab }}
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

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
    commonType: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:index'],
  setup(props, { emit }) {
    const router = useRouter()

    const selectTab = (index) => {
      emit('update:index', index)
    }

    const logout = () => {
      console.log('logout')
      localStorage.removeItem('memberToken')
      router.push({ name: 'Index' })
    }

    return {
      selectTab,
      logout,
    }
  },
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
      padding: 0px 5px;
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
  }
}
</style>
