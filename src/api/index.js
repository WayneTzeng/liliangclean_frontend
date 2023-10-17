import axios from './axios'
import { ApiResponseCode as Code } from './const'

export default {
  updateToken(token) {
    axios.updateToken(token)
  },
  // getToken() {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post('YrwEUIccHZ/NF15vWoVvtL8h2bz9GHYr50vY2SQG1')
  //       .then((res) => {
  //         this.updateToken(res.cft)
  //       })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // },
  login(email, word) {
    return new Promise((resolve, reject) => {
      const params = {
        email,
        word,
      }
      axios
        .post('api/member/login', params)
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
  register(name, sex, phone, email, word) {
    return new Promise((resolve, reject) => {
      const params = {
        name,
        sex,
        phone,
        email,
        word,
      }
      axios
        .post('api/member/signin', params)
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
        .get('api/category', _params)
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
        .get('api/category/articlesSitbarCategory', _params)
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
        .get('api/category/articleList', _params)
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
        .get('api/category/article', _params)
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
        .post('api/staff/joinus/', _params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getReserve(formtype) {
    const _params = { formtype }
    return new Promise((resolve, reject) => {
      axios
        .get('/api/order/getreserveitem', _params, false)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getPublicTime(formtype) {
    const _params = { formtype }
    return new Promise((resolve, reject) => {
      axios
        .get('/api/order/publicTime', _params, false)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getOrderList(formtype) {
    const _params = { formtype }
    return new Promise((resolve, reject) => {
      axios
        .get('/api/order/orderList', _params, false)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getOrder(formtype) {
    const _params = { formtype }
    return new Promise((resolve, reject) => {
      axios
        .post('/api/order/order', _params, false)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  payment(formtype) {
    const _params = { formtype }
    return new Promise((resolve, reject) => {
      axios
        .post('/api/order/payment', _params, false)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getMemberInfo(t) {
    const _params = { t }
    return new Promise((resolve, reject) => {
      axios
        .post('/api/member/getmemberInfo', _params, false)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
