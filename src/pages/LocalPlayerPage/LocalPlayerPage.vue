<template>
  <transition
    appear
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideInLeft"
  >
    <q-page class="local-player-page page-center-flex">
      <div class="text-center">
        <p class="p-title">Crear jugador</p>
        <q-icon name="face" size="10em" />
        <FormLocalPlayer @create-local-player="createLocalPlayer" />
      </div>
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
