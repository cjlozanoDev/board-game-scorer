import { defineStore } from "pinia";

export const useBgsStore = defineStore("bgs", {
  state: () => {
    return {
      user: {},
    };
  },

  getters: {
    userData(state) {
      return state.user;
    },
  },

  actions: {
    setUser(userData) {
      this.user = userData;
    },
  },
  persist: true,
});
