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
import { showLoading } from "../../utils/loading";
import { useBgsStore } from "../../stores/bgs";
import { useRouter } from "vue-router";
import { showNotify } from "src/utils/notify";

export default {
  components: {
    FormLocalPlayer,
  },
  setup() {
    const bgsStore = useBgsStore();
    const router = useRouter();

    const createLocalPlayer = (user) => {
      showLoading(true);
      addLocalUserApi(user)
        .then((localUser) => {
          bgsStore.setLocalUser({ ...user, uid: localUser.id });
          return addLocalUserInsideUserApi(user, localUser.id);
        })
        .then(() => {
          showNotification({
            message: "El jugador ha sido añadido correctamente",
            color: "secondary",
          });
          router.push({
            path: "/localplayers",
          });
        })
        .catch((error) => {
          showNotification({
            message:
              "Ha habido un problema al añadir al jugador, por favor, inténtalo de nuevo",
            type: "negative",
          });
        })
        .finally(() => {
          showLoading(false);
        });
    };

    const showNotification = ({ message, color }) => {
      showNotify({
        message,
        color,
      });
    };

    return {
      createLocalPlayer,
    };
  },
};
</script>
