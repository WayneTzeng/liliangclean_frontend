import { ref } from 'vue';

export const showLoading = ref(false);
export const setLoading = (show) => {
  showLoading.value = show;
};
