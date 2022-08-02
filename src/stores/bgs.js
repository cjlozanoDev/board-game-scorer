import { defineStore } from "pinia";

export const useBgsStore = defineStore("bgs", {
  state: () => {
    return {
      user: {},
      loading: {
        isLoading: false,
        message: "",
      },
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
    setLocalUser(user) {
      if (this.user.localUsers) {
        this.user.localUsers.push(user);
      } else {
        this.user.localUsers = [...user];
      }
    },
    updateLocalUser(user) {
      let localUserIndex = this.user.localUsers.findIndex(
        (localUser) => localUser.uid === user.uid
      );
      this.user.localUsers[localUserIndex] = user;
    },
    setLoading(isLoading, message) {
      this.loading.isLoading = isLoading;
      this.loading.message = message;
    },
  },
  persist: {
    paths: ["user"],
  },
});
