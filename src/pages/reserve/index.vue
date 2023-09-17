<template>
  <div class="reserve" @click.capture="closeSelectorAll">
    <ChapterTitle idData="ct-rs1" title="預約表單" />
    <div class="content">
      <div
        v-for="(component, idx) in reserveList"
        :key="idx"
        class="components"
      >
        <div class="component">
          <div class="name">{{ component.name }}</div>
          <Selector
            v-if="component.type === 'selector'"
            v-model:index="params[`${component.id}`]"
            :specification="component.option"
            :outer-close="component.openSelect"
            initEmptySelect
            @click="handleClick(component.id)"
          />
          <Counter
            v-if="component.type === 'counter'"
            v-model:qty="params[`${component.id}`]"
          />
          <Checkbox
            v-if="component.type === 'checkbox'"
            v-model:checked="params[`${component.id}`]"
          />
          <CustomInput
            v-if="component.type === 'input'"
            v-model:inputValue="params[`${component.id}`]"
          />
        </div>
      </div>
    </div>

    {{ params }}
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '@/api/index'
import ChapterTitle from '@/components/ChapterTitle.vue'
import Selector from '@/components/Selector.vue'
import Counter from '@/components/Counter.vue'
import Checkbox from '@/components/Checkbox.vue'
import CustomInput from '@/components/CustomInput.vue'

export default {
  name: 'ReservePage',
  components: {
    ChapterTitle,
    Selector,
    Counter,
    Checkbox,
    CustomInput,
  },
  setup() {
    const params = ref({})
    const reserveList = ref([])

    onMounted(() => {
      api
        .getReserve()
        .then((res) => {
          console.log(res)
          reserveList.value = res.componentList
          reserveList.value.forEach((component) => {
            if (component.type === 'selector') component.openSelect = false
          })
        })
        .catch((error) => {
          console.error(error)
        })
    })

    const handleClick = (id) => {
      console.log('handleClick', id)
      reserveList.value.forEach((component) => {
        if (component.type === 'selector' && component.id !== id) {
          component.openSelect = true
        }
      })
      setTimeout(() => {
        reserveList.value.forEach((component) => {
          if (component.type === 'selector') {
            component.openSelect = false
          }
        })
      }, 50)
    }

    const closeSelectorAll = () => {
      reserveList.value.forEach((component) => {
        if (component.type === 'selector') {
          component.openSelect = true
        }
      })
      setTimeout(() => {
        reserveList.value.forEach((component) => {
          if (component.type === 'selector') {
            component.openSelect = false
          }
        })
      }, 50)
    }

    return {
      params,
      reserveList,
      handleClick,
      closeSelectorAll,
    }
  },
}
</script>

<style lang="scss" scoped>
.reserve {
  padding: 72px 10vw;
  .content {
    width: 100%;
    padding: 50px;
    margin-top: 50px;
    border-radius: 16px;
    background-color: var(--white);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 50px;
    .components {
      display: flex;
      justify-content: center;
      flex-direction: column;
      .component {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .name {
          width: 120px;
          height: 32px;
          display: flex;
          align-items: center;
        }
      }
    }
    .components ~ .components {
      /* margin-top: 24px; */
    }
  }
}

@media (max-width: 460px) {
  .reserve {
  }
}
</style>
