<template>
  <LoadingComponent />
  <router-view />
  <!-- router-view v-slot="{ Component }">
    <transition
      appear
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideInLeft"
    >
      <component :is="Component" />
    </transition>
  </router-view> -->
</template>

<script>
import LoadingComponent from "./components/LoadingComponent.vue";
import { getUser } from "src/api/index.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import { useBgsStore } from "./stores/bgs";

onAuthStateChanged(auth, (user) => {
  if (user) {
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
  components: {
    LoadingComponent,
  },
};
</script>
