<template>
  <div class="member">
    <Tabs class="tabs" v-model:index="tabIndex" :list="tabList" />
    <div v-if="tabIndex === 0">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card class="elevation-12">
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="startEditing" v-if="!editing">
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
                  <v-alert v-if="showError" type="error" dense outlined>{{
                    errorMessage
                  }}</v-alert>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-btn
                        color="primary"
                        block
                        @click="save"
                        :disabled="!editing"
                        >儲存</v-btn
                      >
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-btn
                        color="red"
                        block
                        @click="cancel"
                        :disabled="!editing"
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
    </div>
    <div v-if="tabIndex === 1"></div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { memberData } from '../data/index'
import Tabs from '../components/Tabs.vue'

export default {
  name: 'MemberPage',
  components: {
    Tabs,
  },
  setup() {
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
      startEditing,
      cancel,
      save,
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
</style>
