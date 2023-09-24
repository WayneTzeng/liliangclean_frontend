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
        password,
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
        userAddress,
      }
      axios
        .post('member/register', params)
        .then((res) => {
          resolve(res.data)
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
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getArticleCategory(category_id) {
    const _params = { category_id }
    return new Promise((resolve, reject) => {
      axios
        .get('category/articlesSitbarCategory', _params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getArticleList(categoryid) {
    const _params = { categoryid }
    return new Promise((resolve, reject) => {
      axios
        .get('category/articleList', _params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getArticle(id) {
    const _params = { id }
    return new Promise((resolve, reject) => {
      axios
        .get('category/article', _params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  joinUs(fromData) {
    return new Promise((resolve, reject) => {
      const _params = {
        name: fromData.value.name,
        birthday: fromData.value.birthday,
        phone: fromData.value.phone,
        address: fromData.value.address,
        profilePicture: fromData.value.profilePicture,
        pictureName: fromData.value.pictureName,
        cleaningExperience: fromData.value.cleaningExperience,
        cleaningSeniority: fromData.value.cleaningSeniority,
        serviceExperience: fromData.value.serviceExperience,
        serviceSeniority: fromData.value.serviceSeniority,
        gender: fromData.value.gender,
      }

      axios
        .post('liliangclean-api/joinus/', _params)
        .then((res) => {
          resolve(res.data)
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
  getReserve(reserveType) {
    const _params = { reserveType }
    return new Promise((resolve, reject) => {
      axios
        .get('category/reserve', _params)
        .then((res) => {
          resolve(res.data)
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
}
