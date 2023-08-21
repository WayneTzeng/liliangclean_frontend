<template>
  <div>
    <div class="advantage">
      <ChapterTitle idData="ct-j1" title="團隊優勢" />
      <div class="advantage-cards">
        <div
          class="advantage-card"
          v-for="(item, idx) in advantageList"
          :key="idx"
        >
          <img :src="item.image" />
          <div>{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="join-us">
      <ChapterTitle idData="ct-j2" title="加入團隊" />
      <v-container class="mt-9">
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
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { joinData } from '../data'
import DatePicker from 'vue3-datepicker'
import ChapterTitle from '../components/ChapterTitle.vue'

export default {
  name: 'RegisterComponent',
  components: {
    DatePicker,
    ChapterTitle,
  },
  setup() {
    const advantageList = joinData.advantageList

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
        console.log('表單提交成功', formData.value)
        // 彈窗 感謝您的填寫！若有適合您的職缺，我們將盡快與您聯繫。
      }
    }
    return {
      advantageList,
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
.advantage {
  padding: 72px 0;
  background-color: var(--white);
  .advantage-cards {
    width: 480px;
    display: flex;
    flex-wrap: wrap;
    margin: 72px auto 0 auto;
    .advantage-card {
      padding: 24px 48px;
      width: 220px;
      border-radius: 10px;
      box-shadow: 0px 0px 8px 0px #888888;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        max-width: 100px;
      }
      div {
        margin-top: 16px;
        font-size: var(--font-l);
        color: var(--brown);
      }
    }
    .advantage-card:nth-child(2n) {
      margin-left: 40px;
    }
    .advantage-card:nth-child(3),
    .advantage-card:nth-child(4) {
      margin-top: 40px;
    }
  }
}

.join-us {
  padding: 72px 0;
  background-color: var(--beige);
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
  .advantage {
    .advantage-cards {
      width: 100vw !important;
      padding: 0 10vw;
      .advantage-card {
        width: 80vw;
      }

      .advantage-card:nth-child(2) {
        margin-top: 40px;
      }

      .advantage-card:nth-child(2n) {
        margin-left: 0;
      }
    }
  }
}
</style>
