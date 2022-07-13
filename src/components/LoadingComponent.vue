<template>
  <div></div>
</template>

<script>
import { useQuasar } from "quasar";
import { useBgsStore } from "../stores/bgs";
import { computed } from "vue";

export default {
  setup() {
    const quasar = useQuasar();
    const bgsStore = useBgsStore();

    const isLoading = computed(() => {
      return bgsStore.getLoading;
    });

    /* watch(isLoading, async (newValue, oldValue) => {
      console.log("los valores son", newValue, oldValue);
    }); */
    return {
      isLoading,
      quasar,
    };
  },
  watch: {
    isLoading(newValue, oldValue) {
      if (newValue) {
        this.quasar.loading.show("El mensaje que tu quieres");
      } else {
        this.quasar.loading.hide();
      }
    },
  },
};
</script>
