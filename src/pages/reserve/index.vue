<template>
  <div class="reserve" @click.capture="closeSelectorAll">
    <ChapterTitle idData="ct-rs1" title="預約表單" />
    <div class="content">
      <div class="content-title">
        <div>單位</div>
        <div>選項</div>
        <div>數量</div>
      </div>
      <hr class="content-line" />
      <div
        v-for="(component, idx) in reserveList"
        :key="idx"
        class="components"
      >
        <div class="component">
          <div class="name">{{ component.column_name }}</div>
          <Selector
            v-if="component.display_style === 'select'"
            v-model:index="params[`${component.form_parameter_id}`]"
            :specification="component.form_parameter"
            :outer-close="component.openSelect"
            initEmptySelect
            class="select"
            @click="handleClick(component.form_parameter_id)"
          />
          <Counter
            v-if="component.display_style === 'count'"
            v-model:qty="params[`${component.form_parameter_id}`]"
            class="count"
          />
          <Checkbox
            v-if="component.display_style === 'checkbox'"
            v-model:checked="params[`${component.form_parameter_id}`]"
            class="checkbox"
          />
          <CustomInput
            v-if="component.display_style === 'input'"
            v-model:inputValue="params[`${component.form_parameter_id}`]"
            class="input"
          />
          <div class="qty">
            {{
              params[`${component.form_parameter_id}`]
                ? component.form_type
                  ? params[`${component.form_parameter_id}`]
                  : params[`${component.form_parameter_id}`] * component.unit
                : 0
            }}
          </div>
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
        .getReserve(1)
        .then((res) => {
          reserveList.value = res
          reserveList.value.forEach((component) => {
            if (component.type === 'select') component.openSelect = false
          })
        })
        .catch((error) => {
          console.error(error)
        })
    })

    const handleClick = (id) => {
      reserveList.value.forEach((component) => {
        if (
          component.display_style === 'select' &&
          component.form_parameter_id !== id
        ) {
          component.openSelect = true
        }
      })
      setTimeout(() => {
        reserveList.value.forEach((component) => {
          if (component.display_style === 'select') {
            component.openSelect = false
          }
        })
      }, 50)
    }

    const closeSelectorAll = () => {
      reserveList.value.forEach((component) => {
        if (component.display_style === 'selector') {
          component.openSelect = true
        }
      })
      setTimeout(() => {
        reserveList.value.forEach((component) => {
          if (component.display_style === 'selector') {
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
    max-width: 700px;
    min-width: 300px;
    margin: 0 auto;
    padding: 50px;
    margin-top: 50px;
    border-radius: 16px;
    background-color: var(--white);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .content-title {
      display: flex;
      justify-content: space-between;
      width: calc(100vw - 20vw - 100px);
      max-width: calc(600px);
      & div:nth-child(1) {
        text-align: center;
        width: 80px;
      }
      & div:nth-child(2) {
        text-align: center;
        width: 120px;
      }
      & div:nth-child(3) {
        text-align: center;
        width: 60px;
      }
    }
    .content-line {
      width: 100%;
      margin: 24px 0;
    }
    .components {
      display: flex;
      justify-content: center;
      flex-direction: column;
      .component {
        width: calc(100vw - 20vw - 100px);
        max-width: calc(600px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          width: 80px;
          height: 32px;
          display: flex;
          align-items: center;
        }
        .qty {
          width: 60px;
          border-bottom: 1px solid var(--brown);
          text-align: center;
          padding: 2px 0;
        }
      }
    }
    .components ~ .components {
      margin-top: 50px;
    }
  }
}

@media (max-width: 460px) {
  .reserve {
    .content {
      padding: 20px;
      .content-title {
        width: calc(100vw - 20vw - 40px);
        min-width: calc(260px);
        & div:nth-child(1) {
          text-align: center;
          width: 80px;
        }
        & div:nth-child(2) {
          text-align: center;
          width: 120px;
        }
        & div:nth-child(3) {
          text-align: center;
          width: 60px;
        }
      }
      .components {
        .component {
          width: calc(100vw - 20vw - 40px);
          min-width: calc(260px);
          .name {
            width: 60px;
          }
          .select,
          .count,
          .checkbox,
          .input {
            width: 80px;
          }
          .qty {
            width: 40px;
          }
        }
      }
    }
  }
}
</style>
