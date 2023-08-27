<template>
  <div class="member">
    <Tabs v-model:index="tabIndex" class="tabs" :list="tabList" commonType />

    <v-container v-show="tabIndex === 0">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="elevation-12">
            <v-card-actions>
              <v-spacer />
              <v-btn
                v-if="!editing"
                color="primary"
                variant="outlined"
                @click="startEditing"
              >
                編輯
              </v-btn>
            </v-card-actions>
            <v-card-text>
              <v-form @submit="save">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      :rules="nameRules"
                      label="姓名"
                      variant="outlined"
                      :disabled="!editing"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-radio-group
                      v-model="gender"
                      :rules="genderRules"
                      label="性別"
                      inline
                      :disabled="!editing"
                    >
                      <v-radio label="男性" value="male"></v-radio>
                      <v-radio label="女性" value="female"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="phone"
                      :rules="phoneRules"
                      label="手機號碼"
                      variant="outlined"
                      :disabled="!editing"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="電子郵件"
                      variant="outlined"
                      :disabled="!editing"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-alert v-if="showError" type="error" dense outlined>
                  {{ errorMessage }}
                </v-alert>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-btn
                      color="primary"
                      block
                      :disabled="!editing"
                      @click="save"
                      >儲存</v-btn
                    >
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      color="red"
                      block
                      :disabled="!editing"
                      @click="cancel"
                      >取消</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-show="tabIndex === 1" class="use-in-pc">
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
              <v-row class="table-header">
                <v-col
                  v-for="header in tableHeaders"
                  :key="header"
                  class="header-cell"
                >
                  {{ header }}
                </v-col>
              </v-row>
              <v-row
                v-for="(item, index) in tableData"
                :key="index"
                :class="getRowColorClass(index)"
                @click="openOrderCard"
              >
                <v-col class="data-cell">
                  {{ item.orderNo }}
                </v-col>
                <v-col class="data-cell">
                  {{ item.orderType }}
                </v-col>
                <v-col class="data-cell">
                  {{ item.serviceDate }}
                </v-col>
                <v-col class="data-cell">
                  {{ item.orderDate }}
                </v-col>
                <v-col class="data-cell">
                  {{ item.payment }}
                </v-col>
                <v-col class="data-cell">
                  {{ item.orderStatus }}
                </v-col>
                <v-col class="data-cell">
                  {{ item.notice }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="use-in-mobile">
      <v-row>
        <v-col cols="12" md="6" lg="4">
          <v-card
            v-for="(value, key) in tableData"
            :key="key"
            class="order-card"
          >
            <v-card-text>
              <div><strong>訂單編號:</strong> {{ value.orderNo }}</div>
              <div><strong>預約類型:</strong> {{ value.type }}</div>
              <div><strong>服務日期:</strong> {{ value.serviceDate }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <OrderDetailCard
      v-if="orderCardShow"
      @closeOrderCard="
        () => {
          console.log
          orderCardShow = false
        }
      "
    />
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { memberData } from '@/data/index'
import Tabs from '@/components/Tabs.vue'
import OrderDetailCard from '@/components/OrderDetailCard.vue'

export default {
  name: 'MemberPage',
  components: {
    Tabs,
    OrderDetailCard,
  },
  setup() {
    const router = useRouter()

    const tabIndex = ref(0)
    const tabList = ref(memberData.tabList)

    const name = ref('測試測試') // 串 api 取會員資料
    const gender = ref('male') // 串 api 取會員資料 male or female
    const phone = ref('0912345678') // 串 api 取會員資料
    const email = ref('aa@bb.cc') // 串 api 取會員資料
    const editing = ref(false)
    const showError = ref(false)
    const errorMessage = ref('')

    const nameRules = [(value) => !!value || '請輸入姓名']

    const genderRules = [(value) => !!value || '請選擇性別']

    const phoneRules = [
      (value) => !!value || '請輸入手機號碼',
      (value) => /^\d{10}$/.test(value) || '手機號碼必須是10位數字',
    ]

    const emailRules = [
      (value) => !!value || '請輸入電子郵件',
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || '電子郵件格式不正確',
    ]

    const startEditing = () => {
      editing.value = true
    }

    const cancel = () => {
      editing.value = false
    }

    const save = () => {
      if (validateFields()) {
        // 在这里执行儲存逻辑
        console.log('儲存成功')
        editing.value = false
      }
    }

    const validateFields = () => {
      showError.value = false

      if (!name.value || !gender.value || !phone.value || !email.value) {
        showError.value = true
        errorMessage.value = '請填寫所有必填欄位'
        return false
      }

      if (!phoneRules.every((rule) => rule(phone.value) === true)) {
        showError.value = true
        errorMessage.value = '手機號碼格式不正確'
        return false
      }

      if (!emailRules.every((rule) => rule(email.value) === true)) {
        showError.value = true
        errorMessage.value = '電子郵件格式不正確'
        return false
      }

      return true
    }

    watchEffect(() => {
      if (tabIndex.value === 2) {
        console.log('logout')
        localStorage.removeItem('memberToken')
        router.push({ name: 'Index' })
      }
    })

    const tableHeaders = ref([
      '訂單編號',
      '預約類型',
      '服務日期',
      '訂購日期',
      '訂單金額',
      '訂單狀態',
      '備註',
    ])

    // from api
    const tableData = ref([
      {
        orderNo: '0001',
        orderType: '美容',
        serviceDate: '2023-07-30',
        orderDate: '2023-07-28',
        payment: '1000',
        orderStatus: '已完成',
        notice: '備註內容1',
      },
      {
        orderNo: '0002',
        orderType: '按摩',
        serviceDate: '2023-08-02',
        orderDate: '2023-07-29',
        payment: '1500',
        orderStatus: '處理中',
        notice: '備註內容2',
      },
      {
        orderNo: '0002',
        orderType: '按摩',
        serviceDate: '2023-08-02',
        orderDate: '2023-07-29',
        payment: '1500',
        orderStatus: '處理中',
        notice: '備註內容2',
      },
      {
        orderNo: '0002',
        orderType: '按摩',
        serviceDate: '2023-08-02',
        orderDate: '2023-07-29',
        payment: '1500',
        orderStatus: '處理中',
        notice: '備註內容2',
      },
    ])

    const getRowColorClass = (index) => {
      return index % 2 === 0 ? 'even-row' : 'odd-row'
    }

    const orderCardShow = ref(false)
    const openOrderCard = () => {
      orderCardShow.value = true
    }

    return {
      tabIndex,
      tabList,
      name,
      gender,
      phone,
      email,
      editing,
      showError,
      errorMessage,
      nameRules,
      genderRules,
      phoneRules,
      emailRules,
      tableHeaders,
      tableData,
      orderCardShow,
      getRowColorClass,
      startEditing,
      cancel,
      save,
      openOrderCard,
    }
  },
}
</script>

<style lang="scss" scoped>
.member {
  padding: 24px 0 72px 0;

  .tabs {
    margin: 35px 0;
  }
}

.v-card {
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.v-card-title {
  padding: 8px 16px;
}

.v-card-title v-icon {
  cursor: pointer;
}

.v-card-text {
  padding: 24px;
}

.v-card-actions {
  padding: 8px 16px;
}

.v-btn {
  margin-top: 16px;
}

.table-header {
  background-color: #f0f0f0;
  font-weight: bold;
}

.header-cell,
.data-cell {
  padding: 10px;
  border: 1px solid #ccc;
}

.even-row,
.odd-row {
  cursor: pointer;
}

.even-row {
  background-color: #f8f8f8;
}

.odd-row {
  background-color: #e0e0e0;
}
.order-card ~ .order-card {
  margin-top: 24px;
}

:deep(.header-cell) {
  border: none;
  background-color: var(--primary);
  color: var(--white);
  text-align: center;
}
:deep(.data-cell) {
  border: none;
  text-align: center;
  color: var(--brown);
}
</style>
