import axios from 'axios'
import mock from './mock.js'
import errorHandler from './errorHandler'
import { ErrorCodes, Methods, CODE_TIMEOUT } from './const'
import { setLoading } from '../helpers/loading'

const MOCK_DELAY_TIME = 500
const IS_USE_MOCK = import.meta.env.VITE_ENV_TYPE === 'mock'
// const isUAT = import.meta.env.VITE_ENV_TYPE === 'uat'
// const isPRD = import.meta.env.VITE_ENV_TYPE === 'prd'
const API_URL = 'https://liliangclean-backend-ueate2jz3q-de.a.run.app/FrontEnd/'
// ? 'https://localhost:8085/liliangclean-api/'
// : isPRD
//   ? 'https://localhost:8085/liliangclean-api/'
//   : ''

export class Axios {
  constructor(token = '', timeout = 15, recallOn = true, recallTimes = 3) {
    this._axios = axios.create()
    this._baseURL = API_URL
    this._timeout = timeout * 1000
    this._token = token
    this._recallOn = recallOn
    this._recallTimes = recallTimes
  }

  _setOption(option) {
    if (option.baseURL) this._baseURL = option.baseURL
    if (option.timeout) this._timeout = option.timeout
    if (option.recallOn === false) this._timeout = option.timeout
    if (option.recallTimes) this._recallTimes = option.recallTimes
  }

  _init(option) {
    this._setOption(option)

    this._axios = axios.create({
      baseURL: this._baseURL,
      timeout: this._timeout,
      headers: {
        Authorization: `Bearer ${this._token}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  async _api(apiMethod, url, params) {
    if (IS_USE_MOCK)
      return new Promise((resolve) => {
        setLoading(true)
        setTimeout(() => {
          resolve(mock[url])
          setLoading(false)
        }, MOCK_DELAY_TIME)
      })

    const isGet = apiMethod === Methods.GET
    const isPost = apiMethod === Methods.POST
    const typeError = { message: 'error: api method invalid' }
    if (apiMethod !== Methods.GET && apiMethod !== Methods.POST) throw typeError

    let response = null
    let requestTimes = 0
    const requestTimesLimit = this._recallOn ? this._recallTimes : 0

    let callAxios

    while (
      (!response || response.code === CODE_TIMEOUT) &&
      requestTimes < requestTimesLimit
    ) {
      callAxios = isGet
        ? this._axios.get(url, { params })
        : isPost
        ? this._axios.post(url, params)
        : null

      setLoading(true)

      response = await callAxios
        .then((res) => {
          const resCode = res.data.code
          if (ErrorCodes.includes(resCode)) throw res
          return res.data
        })
        .catch((error) => errorHandler(error, requestTimes, requestTimesLimit))

      requestTimes++
      setLoading(false)
    }

    return response
  }

  /**
   * Get data from server
   * @param url target path
   * @param params request params
   */
  get(url, params, option = {}) {
    this._init(option)
    return this._api(Methods.GET, url, params)
  }

  /**
   * Post data to server
   * @param url target path
   * @param params request params
   * @param recallOn enable recall (default: true)
   * @param recallTimes times of recall (default: 3)
   */
  post(url, params, option = {}) {
    this._init(option)
    return this._api(Methods.POST, url, params)
  }

  /**
   * Update the token of API instance
   * @param token the new token to update
   */
  updateToken(token) {
    this._token = token
    this._init()
  }
}

export default new Axios()
