<template>
  <router-view />
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";

onAuthStateChanged(auth, (user) => {
  console.log("hola");
  // window.location.pathname = "/home";
});

export default {
  name: "App",
};
</script>
