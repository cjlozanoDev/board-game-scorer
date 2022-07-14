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
    isLoading: {
      handler(newValue, oldValue) {
        if (newValue.isLoading) {
          this.quasar.loading.show({ message: newValue.message });
        } else {
          this.quasar.loading.hide();
        }
      },
      deep: true,
    },
  },
};
</script>
