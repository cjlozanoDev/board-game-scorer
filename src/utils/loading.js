import { useBgsStore } from "../stores/bgs";
const bgsStore = useBgsStore();

export const showLoading = (isLoading, message = "") => {
  bgsStore.setLoading(isLoading, message);
};
