<template>
  <div class="login">
    <v-app>
      <v-main>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-card class="elevation-12">
                <v-card-title class="text-center">
                  <img :src="ImageLogo" alt="Logo" height="50" />
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="手機號碼或E-mail"
                      color="primary"
                      variant="outlined"
                    />
                    <v-text-field
                      v-if="!isForgetPW"
                      v-model="password"
                      :rules="passwordRules"
                      label="請輸入密碼"
                      color="primary"
                      variant="outlined"
                      type="password"
                      class="mt-6"
                    />
                    <v-alert v-if="showError" type="error" dense outlined>{{
                      errorMessage
                    }}</v-alert>
                    <v-btn
                      color="primary"
                      class="text-surface"
                      size="large"
                      block
                      @click="login"
                      >登入</v-btn
                    >
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="primary" @click="goToRegister"
                    >前往註冊</v-btn
                  >
                  <v-spacer />
                  <v-btn text color="primary" @click="forgetPassword">{{
                    isForgetPW ? '返回登入' : '忘記密碼'
                  }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
    <Overlay @click="closeLogin" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/index'
import emitter from '../helpers/emitter'
import Overlay from './Overlay.vue'
import ImageLogo from '../assets/image/image/image-logo.png'
import IconMenuCross from '../assets/image/icon/icon-menu-cross.svg'

export default {
  name: 'LoginComponent',
  components: {
    Overlay
  },
  setup() {
    const router = useRouter()

    const email = ref('')
    const password = ref('')
    const showError = ref(false)
    const errorMessage = ref('')

    const emailRules = [
      (value) => !!value || '此欄位不可空白',
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^\d{10}$/
        return (
          emailRegex.test(value) ||
          phoneRegex.test(value) ||
          '請輸入正確手機號碼或電子信箱'
        )
      }
    ]

    const passwordRules = [
      (value) => !!value || '此欄位不可空白',
      (value) => (value.length >= 6 && value.length <= 12) || '請輸入正確的密碼'
    ]

    const login = () => {
      if (isForgetPW.value) {
        // api
        //   .gorgetPW() // request: email.value
        //   .then(()=> {
        //     // 彈窗通知寄出密碼
        //   })
        console.log('send forget pw')
      }
      if (validateFields()) {
        // console.log(api)
        // localStorage.setItem('memberToken', 'fake-token')
        // todo
        closeLogin()
        api
          .login()
          .then((res) => {
            localStorage.setItem('memberToken', JSON.stringify(res.token))
            router.push({ name: 'Member' })
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }

    const isForgetPW = ref(false)
    const forgetPassword = () => {
      isForgetPW.value = !isForgetPW.value
    }

    const closeLogin = () => {
      emitter.emit('closeLoginOrRegister', false)
    }

    const goToRegister = () => {
      emitter.emit('callRegister', true)
    }

    const validateFields = () => {
      showError.value = false

      if (!email.value || !password.value) {
        showError.value = true
        errorMessage.value = '所有欄位不可空白'
        return false
      }

      if (!emailRules.every((rule) => rule(email.value) === true)) {
        showError.value = true
        errorMessage.value = '手機號碼或電子信箱錯誤'
        return false
      }

      if (!passwordRules.every((rule) => rule(password.value) === true)) {
        showError.value = true
        errorMessage.value = '密碼錯誤'
        return false
      }

      return true
    }

    return {
      email,
      password,
      showError,
      errorMessage,
      emailRules,
      passwordRules,
      isForgetPW,
      login,
      forgetPassword,
      closeLogin,
      goToRegister,
      ImageLogo,
      IconMenuCross
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10000;

  :deep(.v-application) {
    background: rgba(0, 0, 0, 0) !important;
  }
  .v-main {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .v-card {
    position: relative;
    z-index: 10000;
    border-radius: 4px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }

  .v-card-title img {
    width: 160px;
  }

  .v-card-text {
    padding: 24px;
  }

  .v-btn {
    margin-top: 16px;
  }
}
</style>
