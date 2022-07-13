<template>
  <h1>Estás en la home</h1>
  <h2>¿Como estás {{ user.name }}?</h2>
</template>

<script>
import { useBgsStore } from "../stores/bgs";

export default {
  name: "HomePage",
  setup() {
    const bgsStore = useBgsStore();
    const user = bgsStore.userData;
    return { user };
  },
};
</script>
