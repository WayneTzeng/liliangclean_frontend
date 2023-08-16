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

  /**
   * 取得活動列表頁與活動詳細頁資訊
   * @param params 參數
   * @param params.memberCode 會員號碼
   */
  login({ memberCode } = { params: '091234567' }) {
    return new Promise((resolve, reject) => {
      const params = { memberCode }
      axios
        .post('Login', params)
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
