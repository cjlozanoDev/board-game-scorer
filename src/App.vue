<template>
  <router-view />
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import { useRouter } from "vue-router";
const router = useRouter();
onAuthStateChanged(auth, (user) => {
  console.log("hola");
  // window.location.pathname = "/home";
});

export default {
  name: "App",
};
</script>
