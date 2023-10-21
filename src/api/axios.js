import axios from 'axios'
import errorHandler from './errorHandler'
import { ErrorCodes, Methods, CODE_TIMEOUT } from './const'
import { setLoading } from '../helpers/loading'

const isUAT = import.meta.env.VITE_ENV_TYPE === 'uat'

const uatApiUrl = 'https://uat'
const prdApiUrl = 'https://prd'
const API_URL = isUAT ? uatApiUrl : prdApiUrl

export class Axios {
  constructor(token = '', timeout = 15, recallOn = true, recallTimes = 3) {
    this._axios = axios.create()
    this._baseURL = API_URL
    this._timeout = timeout * 1000
    this._token = token
    this._recallOn = recallOn
    this._recallTimes = recallTimes

    this._init()
  }

  _init() {
    this._axios = axios.create({
      baseURL: this._baseURL,
      timeout: this._timeout,
      headers: {
        'access-control-allow-origin': '*',
        'x-csrf-token': this._token,
      },
    })
  }

  async _api(apiMethod, url, params) {
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
        .catch((error) => {
          setLoading(false)
          errorHandler(error, requestTimes, requestTimesLimit)
        })

      requestTimes++
      setLoading(false)
    }

    return response
  }
  async get(url, params, needToken = false) {
    needToken &&
      (await this._axios.get(`${API_URL}/getToken`, {}).then((res) => {
        this.updateToken(res.data.cft)
        this._init()
      }))

    return this._api(Methods.GET, url, params)
  }
  async post(url, params, needToken = false) {
    needToken &&
      (await this._axios.get(`${API_URL}/getToken`, {}).then((res) => {
        this.updateToken(res.data.cft)
      }))

    return this._api(Methods.POST, url, params)
  }
  updateToken(token) {
    this._token = token
    this._init()
  }
}

export default new Axios()
