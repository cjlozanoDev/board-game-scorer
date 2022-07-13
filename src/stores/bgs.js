import { defineStore } from "pinia";

export const useBgsStore = defineStore("bgs", {
  state: () => {
    return {
      user: {},
      loading: false,
    };
  },

  getters: {
    getUserData(state) {
      return state.user;
    },
    getLoading(state) {
      return state.loading;
    },
  },

  actions: {
    setUser(userData) {
      this.user = userData;
    },
    setLoading(isLoading) {
      this.loading = isLoading;
    },
  },
  persist: {
    paths: ["user"],
  },
});
