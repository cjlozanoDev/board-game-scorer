<template>
  <q-page padding>
    <h1>Estás en la home</h1>
    <h2>¿Como estás {{ user.name }}?</h2>
  </q-page>
</template>

<script>
import { useBgsStore } from "../stores/bgs";
import { computed } from "vue";

export default {
  name: "HomePage",
  setup() {
    const bgsStore = useBgsStore();
    const user = computed(() => {
      return bgsStore.getUserData;
    });
    return { user };
  },
};
</script>
