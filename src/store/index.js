import { createStore } from 'vuex';

const store = {
  state() {
    const apiToken = '';

    return {
      apiToken,
    };
  },
  mutations: {
    setToken: (state, newToken) => {
      state.apiToken = newToken;
    },
  },
  getters: {
    getToken: (state) => () => state.apiToken,
  },
};

export default createStore(store);
