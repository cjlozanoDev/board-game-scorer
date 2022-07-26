<template>
  <transition
    appear
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideInLeft"
  >
    <q-page padding>
      <p class="p-title">Crear jugador</p>
      <FormLocalPlayer @create-local-player="createLocalPlayer" />
    </q-page>
  </transition>
</template>

<script>
import FormLocalPlayer from "./components/FormLocalPlayer.vue";
import { addLocalUserApi, addLocalUserInsideUserApi } from "../../api/index";

export default {
  components: {
    FormLocalPlayer,
  },
  setup() {
    const createLocalPlayer = (user) => {
      addLocalUserApi(user)
        .then((localUser) => {
          return addLocalUserInsideUserApi(user, localUser.id);
        })
        .then(() => {
          console.log("Ahora sí, usuario creado");
        });
    };

    return {
      createLocalPlayer,
    };
  },
};
</script>
