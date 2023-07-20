<template>
  <v-container>
    <v-form ref="formRef">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.name"
            label="姓名"
            :rules="commonRules"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="formData.gender"
            :items="genderOptions"
            label="性別"
            :rules="commonRules"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <div class="date-picker">
            <div class="title">出生日期</div>
            <DatePicker v-model="formData.birthDate" label="出生日期" />
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.phone"
            label="手機"
            :rules="phoneRules"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="formData.address"
            label="居住地址"
            :rules="commonRules"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12">
          <v-file-input
            v-model="formData.profilePicture"
            label="大頭照"
            accept="image/jpeg, image/png"
            :rules="profilePictureRules"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="formData.cleaningExperience"
            :items="cleaningExperienceOptions"
            label="是否有清潔相關經驗"
            :rules="commonRules"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="formData.serviceExperience"
            :items="serviceExperienceOptions"
            label="是否有服務業相關經驗"
            :rules="commonRules"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" class="text-surface" @click="submitForm">
            確定送出
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { ref, reactive } from 'vue'
import DatePicker from 'vue3-datepicker'

export default {
  name: 'RegisterComponent',
  components: {
    DatePicker,
  },
  setup() {
    const formRef = ref(null)
    const selectedDate = ref(null)
    const formData = ref({
      name: '',
      gender: '',
      birthDate: new Date(),
      phone: '',
      address: '',
      profilePicture: null,
      cleaningExperience: '',
      serviceExperience: '',
    })

    const genderOptions = reactive(['男', '女'])

    const cleaningExperienceOptions = reactive([
      '是，經驗3年以上',
      '是，經驗小於3年',
      '無，平常會做家事',
      '無，完全沒有經驗，但有興趣',
    ])

    const serviceExperienceOptions = reactive(['是', '否'])

    const commonRules = [(value) => !!value || '欄位不能為空']

    const phoneRules = [
      (value) => !!value || '手機不能為空',
      (value) => /^\d{10}$/.test(value) || '手機號碼格式不正確',
    ]

    const profilePictureRules = [
      (value) => !!value || '請上傳大頭照',
      (value) => !value || value.size <= 1048576 || '檔案大小不能超過 1MB',
    ]

    const submitForm = () => {
      if (formRef.value.validate()) {
        // 在這裡執行表單提交的相關邏輯
        console.log('表單提交成功', formData.value)
      }
    }
    return {
      formData,
      selectedDate,
      genderOptions,
      cleaningExperienceOptions,
      serviceExperienceOptions,
      commonRules,
      phoneRules,
      profilePictureRules,
      submitForm,
    }
  },
}
</script>

<style lang="scss" scoped>
.join {
}
.v-form,
.v-container {
  max-width: 600px;
}
.date-picker {
  width: 100%;
  height: 56px;
  padding: 15px 16px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.38);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  .title {
    padding: 0 4px;
    font-size: 10px;
    color: rgba(0, 0, 0, 0.58);
    position: absolute;
    left: 16px;
    top: -6px;
    background: #efe8e1;
  }

  :deep(input) {
    outline: none;
    color: rgba(0, 0, 0, 0.58);
  }
}

@media (max-width: 460px) {
  .join {
  }
}
</style>
