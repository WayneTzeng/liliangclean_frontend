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
                  <v-form @submit="login">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="Email"
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      label="Password"
                      outlined
                      type="password"
                    ></v-text-field>
                    <v-alert v-if="showError" type="error" dense outlined>{{
                      errorMessage
                    }}</v-alert>
                    <v-btn type="submit" color="primary" block>登入</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
    <Overlay @click="handleClick" />
  </div>
</template>

<script>
import { ref } from 'vue'
import emitter from '../helpers/emitter'
import Overlay from './Overlay.vue'
import ImageLogo from '../assets/image/image/image-logo.png'
import IconMenuCross from '../assets/image/icon/icon-menu-cross.svg'

export default {
  name: 'LoginComponent',
  components: {
    Overlay,
  },
  setup() {
    const email = ref('')
    const password = ref('')
    const showError = ref(false)
    const errorMessage = ref('')

    const emailRules = [
      (value) => !!value || 'Email is required',
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Email must be valid',
    ]

    const passwordRules = [
      (value) => !!value || 'Password is required',
      (value) => value.length >= 6 || 'Password must be at least 6 characters',
    ]

    const login = () => {
      if (validateFields()) {
        // 在这里执行登录逻辑
        console.log('登录成功')
      }
    }

    const handleClick = () => {
      emitter.emit('callLogin', false)
    }

    const validateFields = () => {
      showError.value = false

      if (!email.value || !password.value) {
        showError.value = true
        errorMessage.value = 'Please fill in all fields.'
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

      return true
    }

    return {
      email,
      password,
      showError,
      errorMessage,
      emailRules,
      passwordRules,
      login,
      handleClick,
      ImageLogo,
      IconMenuCross,
    }
  },
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
