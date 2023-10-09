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
          <MultiCheckbox
            v-if="component.display_style === 'multiCheckbox'"
            v-model:checked="params[`${component.form_parameter_id}`]"
            :specification="component.form_parameter"
            class="multiCheckbox"
          />
          <!--               component.display_style !== 'select' && -->
          <div v-if="component.unit" class="qty">
            {{ params[`${component.form_parameter_id}`] ?? 0 }}
            {{ component.unit }}
          </div>
        </div>
      </div>
      <hr class="content-line" />
      <v-card-text>
        <v-form>
          <v-row justify="center">
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="name"
                :rules="[requireRules]"
                label="姓名"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="phone"
                :rules="phoneRules"
                label="手機號碼"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="電子郵件"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="sns"
                :rules="[requireRules]"
                label="Line 帳號"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field label="台中市" disabled />
            </v-col>
            <v-col cols="12" sm="3">
              <v-select
                label="區域"
                variant="outlined"
                :items="serviceAreaList"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="sns"
                :rules="[requireRules]"
                label="地址"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="3">
              <v-btn
                color="primary"
                class="text-surface"
                size="large"
                block
                :disabled="processing"
                @click="payment"
              >
                確認送出
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </div>

    {{ params }}
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/index'
import { serviceData } from '@/data/index'
import ChapterTitle from '@/components/ChapterTitle.vue'
import Selector from '@/components/Selector.vue'
import Counter from '@/components/Counter.vue'
import Checkbox from '@/components/Checkbox.vue'
import CustomInput from '@/components/CustomInput.vue'
import MultiCheckbox from '@/components/MultiCheckbox.vue'

export default {
  name: 'ReservePage',
  components: {
    ChapterTitle,
    Selector,
    Counter,
    Checkbox,
    CustomInput,
    MultiCheckbox,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const params = ref({})
    const reserveList = ref([])
    const serviceAreaList = ref(serviceData.serviceAreaList)

    const name = ref('')
    const phone = ref('')
    const email = ref('')
    const sns = ref('')
    const area = ref('')
    const address = ref('')
    const formtype = route.query.formtype

    const processing = ref(false)

    onMounted(() => {
      api
        .getReserve(formtype)
        .then((res) => {
          reserveList.value = res.map((component) => component)

          // test data del
          reserveList.value.push({
            base_cost: 0,
            base_number: 0,
            column_name: '想整理的區域?',
            display_style: 'multiCheckbox',
            form_parameter: ['房間', '客廳', '廚房', '書房', '儲藏室'],
            form_parameter_id: 'multiCheckbox444',
            form_type: 'd',
            id: 8,
            unit: 0,
            weighted_base_cost: 0,
            weighted_base_number: 0,
          })
          // del
        })
        .catch((error) => {
          console.error(error)
        })
    })

    const payment = () => {
      console.log('validateFields', validateFields())
      console.log('params', params.value)
      const requestData = reserveList.value.map((component) => {
        const form_parameter =
          component.display_style === 'checkbox'
            ? [component.column_name]
            : component.display_style === 'input'
            ? [Number(params.value[component.form_parameter_id])]
            : component.display_style === 'multiCheckbox'
            ? params.value[component.form_parameter_id]
            : [params.value[component.form_parameter_id]]

        return {
          base_cost: component.base_cost,
          base_number: component.base_number,
          column_name: component.column_name,
          display_style: component.display_style,
          form_parameter: form_parameter || [],
          form_parameter_id: component.form_parameter_id,
          form_type: component.form_type,
          id: component.id,
          unit: component.unit,
          weighted_base_cost: component.weighted_base_cost,
          weighted_base_number: component.weighted_base_number,
        }
      })

      const _params = {
        formtype,
        requestData,
      }

      if (validateFields()) {
        processing.value = true
        api
          .payment(_params)
          .then((res) => {
            console.log(res)
            router.push({
              name: 'member',
            })
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }

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

    const emailRules = [
      (value) => requireRules(value),
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^\d{10}$/
        return (
          emailRegex.test(value) ||
          phoneRegex.test(value) ||
          '請輸入正確手機號碼或電子信箱'
        )
      },
    ]

    const phoneRules = [
      (value) => requireRules(value),
      (value) => /^\d{10}$/.test(value) || 'Phone must be 10 digits',
    ]

    const requireRules = (value) => !!value || '此欄位不可空白'

    const validateFields = () => {
      if (
        !name.value ||
        !phone.value ||
        !email.value ||
        !sns.value ||
        !area.value ||
        !address.value
      )
        return false

      if (!phoneRules.every((rule) => rule(phone.value) === true)) {
        return false
      }

      if (!emailRules.every((rule) => rule(email.value) === true)) {
        return false
      }
    }

    return {
      name,
      phone,
      email,
      sns,
      area,
      address,
      params,
      reserveList,
      serviceAreaList,
      processing,
      payment,
      handleClick,
      closeSelectorAll,
      requireRules,
      emailRules,
      phoneRules,
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
          .multiCheckbox {
            width: 65%;
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
