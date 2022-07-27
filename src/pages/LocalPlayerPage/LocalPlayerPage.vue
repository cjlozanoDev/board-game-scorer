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
          router.push({
            path: "/localplayers",
          });
        })
        .finally(() => {
          showLoading(false);
        });
    };

    return {
      createLocalPlayer,
    };
  },
};
</script>
