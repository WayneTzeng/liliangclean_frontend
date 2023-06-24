import axios from './axios';
import { ApiResponseCode as Code } from './const';

const IS_USE_MOCK = process.env.VUE_APP_USE_MOCK === 'true';
const MOCK_ID = 'mock';

export default {
  /**
   * 更新 API Token
   * @param token 新的 token
   */
  updateToken(token) {
    axios.updateToken(token);
  },

  /**
   * 取得活動列表頁與活動詳細頁資訊
   * @param params 參數
   * @param params.memberCode 會員號碼
   */
  getProject() {
    return new Promise((resolve, reject) => {
      axios
        .get('Project')
        .then((res) => {
          if (res.code === Code.Success) {
            resolve(res.data);
          } else {
            throw res;
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getProjectById(projectId) {
    const _projectId = projectId;

    return new Promise((resolve, reject) => {
      axios
        .get(`Project/${_projectId}`, {})
        .then((res) => {
          if (res.code === Code.Success) {
            resolve(res.data);
          } else {
            throw res;
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getGifts(projectId) {
    const _projectId = IS_USE_MOCK ? MOCK_ID : projectId;

    return new Promise((resolve, reject) => {
      axios
        .get(`Project/${_projectId}/awards`, {})
        .then((res) => {
          if (res.code === Code.Success) {
            resolve(res.data);
          } else {
            throw res;
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getGiftById(projectId, giftId) {
    const _projectId = IS_USE_MOCK ? MOCK_ID : projectId;

    return new Promise((resolve, reject) => {
      axios
        .get(`Project/${_projectId}/awards/${giftId}`, {})
        .then((res) => {
          if (res.code === Code.Success) {
            resolve(res.data);
          } else {
            throw res;
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getHistory(projectId, type) {
    const _projectId = IS_USE_MOCK ? MOCK_ID : projectId;

    return new Promise((resolve, reject) => {
      axios
        .get(`Project/${_projectId}/${type}`, {})
        .then((res) => {
          if (res.code === Code.Success) {
            resolve(res.data);
          } else {
            throw res;
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
