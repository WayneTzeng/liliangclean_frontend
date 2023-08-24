import axios from './axios'
import { ApiResponseCode as Code } from './const'

export default {
  /**
   * 更新 API Token
   * @param token 新的 token
   */
  updateToken(token) {
    axios.updateToken(token)
  },
  login(username, password) {
    return new Promise((resolve, reject) => {
      const params = {
        username,
        password
      }
      axios
        .post('auth/login', params)
        .then((res) => {
          if (res.code === Code.Success) {
            resolve(res.data)
          } else {
            throw res
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  register(username, userPhone, userHomePhone, userMail, userPwd, userAddress) {
    return new Promise((resolve, reject) => {
      const params = {
        username,
        userPhone,
        userHomePhone,
        userMail,
        userPwd,
        userAddress
      }
      axios
        .post('member/register', params)
        .then((res) => {
          if (res.code === Code.Success) {
            resolve(res.data)
          } else {
            throw res
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getCategory() {
    const _params = {}
    return new Promise((resolve, reject) => {
      axios
        .get('category', _params)
        .then((res) => {
          if (res.code === Code.Success) {
            resolve(res.data)
          } else {
            throw res
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getCategoryDetail(category_id) {
    const _params = { category_id }
    return new Promise((resolve, reject) => {
      axios
        .get('category/detail', _params)
        .then((res) => {
          if (res.code === Code.Success) {
            resolve(res.data)
          } else {
            throw res
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
