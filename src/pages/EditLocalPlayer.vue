<template>
  <transition
    appear
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideInLeft"
  >
    <q-page class="edit-local-player page-center-flex">
      <p class="p-title">Editar jugador</p>
      <div class="text-center">
        <q-icon name="assignment_ind" size="10em" />
        <q-form @submit.prevent="updateLocalPlayer()">
          <q-input
            v-model="name"
            label="Nombre *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'El nombre es obligario',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input v-model="nickName" label="Apodo">
            <template v-slot:prepend>
              <q-icon name="accessibility" />
            </template>
          </q-input>

          <div class="edit-local-player__actions">
            <ButtonBsg size="md" type="submit" label="Guardar cambios" />
            <ButtonBsg
              @click="showDialogRemoveConfirm"
              size="md"
              label="Eliminar"
              icon-right="delete"
              color="negative"
            />
          </div>
        </q-form>
      </div>
      <DialogConfirm
        :show-dialog="showDialog"
        icon="delete"
        messageDialog="Va a eliminar este usuario, ¿Estás seguro que quieres hacerlo?"
        @confirm="confirm"
        @cancel="cancel"
      />
    </q-page>
  </transition>
</template>

<script>
import { ref } from "vue";
import { useBgsStore } from "../stores/bgs";
import { showLoading } from "../utils/loading";
import { showNotify } from "src/utils/notify";
import { useRouter } from "vue-router";
import {
  updateLocalUserApi,
  updateLocalUsersInsideUserApi,
} from "../api/index";
import ButtonBsg from "src/components/elements/ButtonBgs.vue";
import DialogConfirm from "src/components/DialogConfirm.vue";

export default {
  name: "EditLocalPlayer",
  components: {
    ButtonBsg,
    DialogConfirm,
  },
  props: {
    localPlayer: {
      type: String,
      default: "{}",
    },
  },
  setup(props) {
    const bgsStore = useBgsStore();
    const router = useRouter();

    const localPlayerParser = ref(JSON.parse(props.localPlayer));
    const name = ref(localPlayerParser.value.name);
    const nickName = ref(localPlayerParser.value.nickName);

    const showDialog = ref(false);

    const updateLocalPlayer = () => {
      showLoading(true);
      const localPlayerObject = {
        name: name.value,
        nickName: nickName.value,
        uid: localPlayerParser.value.uid,
      };
      bgsStore.updateLocalUser({ ...localPlayerObject });

      updateLocalUsersInsideUserApi(bgsStore.getUserData.localUsers)
        .then(() => {
          return updateLocalUserApi(localPlayerObject);
        })
        .then(() => {
          showNotification({
            message: "Se ha editado correctamente al jugador",
            color: "secondary",
          });
          router.push({
            path: "/localplayers",
          });
        })
        .catch((error) => {
          showNotification({
            message:
              "Ha habido un problema al editar el jugador, por favor, inténtalo de nuevo",
            color: "negative",
          });
        })
        .finally(() => {
          showLoading(false);
        });
    };

    const showDialogRemoveConfirm = () => {
      showDialog.value = true;
    };

    const cancel = () => {
      showDialog.value = false;
    };

    const confirm = () => {
      showDialog.value = false;
    };

    const showNotification = ({ message, color }) => {
      showNotify({
        message,
        color,
      });
    };

    return {
      name,
      nickName,
      updateLocalPlayer,
      showDialogRemoveConfirm,
      showDialog,
      confirm,
      cancel,
    };
  },
};
</script>

<style scoped>
.edit-local-player__actions {
  display: flex;
  gap: 10px;
  margin-top: 40px;
}
.q-input {
  margin-bottom: 10px;
}
</style>
