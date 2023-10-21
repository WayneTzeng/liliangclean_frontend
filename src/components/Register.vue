<template>
  <div class="register">
    <v-app>
      <v-main>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="8" md="6" lg="4">
              <v-card class="elevation-12">
                <v-card-title class="text-center">
                  <img :src="ImageLogo" alt="Logo" height="50" />
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="name"
                      :rules="nameRules"
                      label="Name"
                      color="primary"
                      variant="outlined"
                    />
                    <v-radio-group v-model="gender" :rules="genderRules" inline>
                      <v-radio label="男性" value="male" color="primary" />
                      <v-radio label="女性" value="female" color="primary" />
                    </v-radio-group>
                    <v-text-field
                      v-model="phone"
                      :rules="phoneRules"
                      label="手機號碼"
                      color="primary"
                      variant="outlined"
                    />
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      color="primary"
                      variant="outlined"
                      class="mt-3"
                    />
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      label="請輸入密碼"
                      color="primary"
                      variant="outlined"
                      type="password"
                      class="mt-3"
                    />
                    <v-text-field
                      v-if="password"
                      v-model="confirmPassword"
                      :rules="confirmPasswordRules"
                      label="再次確認密碼"
                      color="primary"
                      variant="outlined"
                      type="password"
                      class="mt-3"
                    />
                    <v-alert v-if="showError" type="error" dense outlined>{{
                      errorMessage
                    }}</v-alert>
                    <v-btn
                      color="primary"
                      class="text-surface"
                      size="large"
                      block
                      @click="register"
                    >
                      註冊
                    </v-btn>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="primary" @click="goToLogin"
                    >返回登入</v-btn
                  >
                  <v-spacer />
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
import emitter from '../helpers/emitter'
import Overlay from './Overlay.vue'
import ImageLogo from '../assets/image/image/image-logo.png'
import api from '../api/index.js'
import { Base64 } from 'js-base64'

export default {
  name: 'RegisterComponent',
  components: {
    Overlay,
  },
  setup() {
    const name = ref('')
    const gender = ref('')
    const phone = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const showError = ref(false)
    const errorMessage = ref('')

    const nameRules = [(value) => !!value || 'Name is required']

    const genderRules = [(value) => !!value || 'Gender is required']

    const phoneRules = [
      (value) => !!value || 'Phone is required',
      (value) => /^\d{10}$/.test(value) || 'Phone must be 10 digits',
    ]

    const emailRules = [
      (value) => !!value || 'Email is required',
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Email must be valid',
    ]

    const passwordRules = [
      (value) => !!value || 'Password is required',
      (value) => value.length >= 6 || 'Password must be at least 6 characters',
    ]

    const confirmPasswordRules = [
      (value) => !!value || 'Confirm Password is required',
      (value) => value === password.value || 'Passwords do not match',
    ]

    const register = () => {
      if (validateFields()) {
        api
          .register(
            name.value,
            gender.value,
            phone.value,
            email.value,
            Base64.encode(password.value)
          )
          .then(() => {
            // 註冊後重新登入
          })
        console.log('注册成功, 請重新登入  <--- 彈窗')
      }
    }

    const closeLogin = () => {
      emitter.emit('closeLoginOrRegister', false)
    }

    const goToLogin = () => {
      emitter.emit('callLogin', true)
    }

    const validateFields = () => {
      showError.value = false

      if (
        !name.value ||
        !gender.value ||
        !phone.value ||
        !email.value ||
        !password.value ||
        !confirmPassword.value
      ) {
        showError.value = true
        errorMessage.value = 'Please fill in all fields.'
        return false
      }

      if (!nameRules.every((rule) => rule(name.value) === true)) {
        showError.value = true
        errorMessage.value = 'Invalid name.'
        return false
      }

      if (!genderRules.every((rule) => rule(gender.value) === true)) {
        showError.value = true
        errorMessage.value = 'Please select your gender.'
        return false
      }

      if (!phoneRules.every((rule) => rule(phone.value) === true)) {
        showError.value = true
        errorMessage.value = 'Invalid phone number.'
        return false
      }

      if (!emailRules.every((rule) => rule(email.value) === true)) {
        showError.value = true
        errorMessage.value = 'Invalid email format.'
        return false
      }

      if (!passwordRules.every((rule) => rule(password.value) === true)) {
        showError.value = true
        errorMessage.value = 'Password must be at least 6 characters.'
        return false
      }

      if (
        !confirmPasswordRules.every(
          (rule) => rule(confirmPassword.value) === true
        )
      ) {
        showError.value = true
        errorMessage.value = 'Passwords do not match.'
        return false
      }

      return true
    }

    return {
      name,
      gender,
      phone,
      email,
      password,
      confirmPassword,
      showError,
      errorMessage,
      nameRules,
      genderRules,
      phoneRules,
      emailRules,
      passwordRules,
      confirmPasswordRules,
      register,
      closeLogin,
      goToLogin,
      ImageLogo,
    }
  },
}
</script>

<style lang="scss" scoped>
.register {
  width: 100vw;
  max-height: 100vh;
  position: fixed;
  z-index: 10000;

  :deep(.v-application) {
    background: rgba(0, 0, 0, 0) !important;
  }
}

.v-main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-card {
  max-height: 75vh !important;
  position: relative;
  z-index: 10000;
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  overflow: scroll;
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

.v-btn {
  margin-top: 16px;
}
</style>
