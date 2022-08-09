<template>
  <q-form @submit.prevent="createLocalPlayer()">
    <q-input
      v-model="name"
      label="Nombre *"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'El nombre es obligario']"
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

    <div class="form-local-player__actions">
      <ButtonBsg size="md" type="submit" label="Guardar jugador" />
    </div>
  </q-form>
</template>

<script>
import { ref } from "vue";
import { DateTime } from "luxon";
import ButtonBsg from "src/components/elements/ButtonBgs.vue";

export default {
  name: "FormLocalPlayer",
  components: {
    ButtonBsg,
  },
  setup(props, context) {
    const name = ref("");
    const nickName = ref("");

    const createLocalPlayer = () => {
      context.emit("create-local-player", {
        name: name.value,
        nickName: nickName.value,
        created_at: DateTime.now().toLocaleString(DateTime.DATETIME_FULL),
      });
    };

    return {
      createLocalPlayer,
      name,
      nickName,
    };
  },
};
</script>

<style scoped>
.q-input {
  margin-bottom: 10px;
}
.form-local-player__actions {
  margin-top: 40px;
}
</style>
