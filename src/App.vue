<template>
  <router-view />
</template>

<script>
import { getUser } from "src/api/index.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import { useBgsStore } from "./stores/bgs";

onAuthStateChanged(auth, (user) => {
  if (user && !localStorage.getItem("signedin")) {
    localStorage.setItem("signedin", "true");
    getUser()
      .then((user) => {
        const bgsStore = useBgsStore();
        bgsStore.setUser(user.data());
      })
      .catch((error) => {
        console.log(error);
      });
  }
  if (!user) {
    localStorage.removeItem("signedin");
    const bgsStore = useBgsStore();
    bgsStore.setUser({});
  }
});

export default {
  name: "App",
};
</script>
