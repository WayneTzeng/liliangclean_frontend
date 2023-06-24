import axios from 'axios';
import mock from './mock.js';
import errorHandler from './errorHandler';
import { ErrorCodes, Methods, CODE_TIMEOUT } from './const';
import { setLoading } from '../helpers/loading';

const MOCK_DELAY_TIME = 1500;
const IS_USE_MOCK = process.env.VUE_APP_USE_MOCK === 'true';
const API_URL = process.env.VUE_APP_BASE_API_URL;

export class Axios {
  constructor(token = '', timeout = 15, recallOn = true, recallTimes = 3) {
    this._axios = axios.create();
    this._baseURL = API_URL;
    this._timeout = timeout * 1000;
    this._token = token;
    this._recallOn = recallOn;
    this._recallTimes = recallTimes;

    this._init();
  }

  _init() {
    this._axios = axios.create({
      baseURL: this._baseURL,
      timeout: this._timeout,
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    });
  }

  async _api(apiMethod, url, params) {
    if (IS_USE_MOCK)
      return new Promise((resolve) => {
        setLoading(true);
        setTimeout(() => {
          resolve(mock[url]);
          setLoading(false);
        }, MOCK_DELAY_TIME);
      });

    const isGet = apiMethod === Methods.GET;
    const isPost = apiMethod === Methods.POST;
    const typeError = { message: 'error: api method invalid' };
    if (apiMethod !== Methods.GET && apiMethod !== Methods.POST)
      throw typeError;

    let response = null;
    let requestTimes = 0;
    const requestTimesLimit = this._recallOn ? this._recallTimes : 0;

    let callAxios;

    while (
      (!response || response.code === CODE_TIMEOUT) &&
      requestTimes < requestTimesLimit
    ) {
      callAxios = isGet
        ? this._axios.get(url, { params })
        : isPost
        ? this._axios.post(url, params)
        : null;

      setLoading(true);

      response = await callAxios
        .then((res) => {
          const resCode = res.data.code;
          if (ErrorCodes.includes(resCode)) throw res;
          return res.data;
        })
        .catch((error) => errorHandler(error, requestTimes, requestTimesLimit));

      requestTimes++;
      setLoading(false);
    }

    return response;
  }

  /**
   * Get data from server
   * @param url target path
   * @param params request params
   */
  get(url, params) {
    return this._api(Methods.GET, url, params);
  }

  /**
   * Post data to server
   * @param url target path
   * @param params request params
   * @param recallOn enable recall (default: true)
   * @param recallTimes times of recall (default: 3)
   */
  post(url, params) {
    return this._api(Methods.POST, url, params);
  }

  /**
   * Update the token of API instance
   * @param token the new token to update
   */
  updateToken(token) {
    this._token = token;
    this._init();
  }
}

export default new Axios();
