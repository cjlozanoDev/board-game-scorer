import { defineStore } from "pinia";

export const useBgsStore = defineStore("bgs", {
  state: () => ({
    counter: 3,
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    increment() {
      this.counter++;
    },
  },
});
