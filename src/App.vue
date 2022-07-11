<template>
  <router-view />
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import { useBgsStore } from "./stores/bgs";
import { computed } from "vue";

onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem("signedin", "true");
  } else {
    localStorage.removeItem("signedin");
  }
});

export default {
  name: "App",
  setup() {
    const valor = computed(() => store.doubleCount);

    const store = useBgsStore();
    store.increment();
    return {
      valor,
    };
  },
};
</script>
