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
        <q-form @submit.prevent="createLocalPlayer()">
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
              size="md"
              label="Eliminar"
              icon-right="delete"
              color="negative"
            />
          </div>
        </q-form>
      </div>
    </q-page>
  </transition>
</template>

<script>
import { ref } from "vue";
import ButtonBsg from "src/components/elements/ButtonBgs.vue";

export default {
  name: "EditLocalPlayer",
  components: {
    ButtonBsg,
  },
  props: {
    localPlayer: {
      type: String,
      default: "{}",
    },
  },
  setup(props) {
    const localPlayerParser = ref(JSON.parse(props.localPlayer));
    const name = ref(localPlayerParser.value.name);
    const nickName = ref(localPlayerParser.value.nickName);

    return {
      name,
      nickName,
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
