<template>
  <transition
    appear
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideInLeft"
  >
    <q-page padding>
      <p class="p-title">Crear jugador</p>
      <FormLocalPlayer />
    </q-page>
  </transition>
</template>

<script>
import FormLocalPlayer from "./components/FormLocalPlayer.vue";

export default {
  components: {
    FormLocalPlayer,
  },
  setup() {},
};
</script>
