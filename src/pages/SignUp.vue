<template>
  <q-page class="sign-up" padding>
    <h2>Crea tu cuenta</h2>
    <div class="box-form__credentials-user">
      <q-input color="secondary" label="Nombre">
        <template v-slot:prepend>
          <q-icon name="ti-user" />
        </template>
      </q-input>

      <q-input color="secondary" label="Email">
        <template v-slot:prepend>
          <q-icon name="ti-email" />
        </template>
      </q-input>

      <q-input
        color="secondary"
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        label="Contraseña"
        class="q-mt-md"
      >
        <template v-slot:prepend>
          <q-icon name="ti-key" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input
        color="secondary"
        v-model="passwordConfirm"
        :type="isPwd ? 'password' : 'text'"
        label="Confirma tu contraseña"
        class="q-mt-md"
      >
        <template v-slot:prepend>
          <q-icon name="ti-key" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div class="box-form__credentials-user__actions">
        <ButtonBsg
          color="secondary"
          class="box-form__credentials-user__actions__button-entry"
          label="Registrarme"
          @click="saludar('carlos')"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import ButtonBsg from "src/components/elements/ButtonBgs.vue";

export default {
  name: "SignUp",
  components: {
    ButtonBsg,
  },
  setup() {
    const password = ref("");
    const passwordConfirm = ref("");
    const isPwd = ref(true);

    return {
      password,
      passwordConfirm,
      isPwd,
    };
  },
};
</script>

<style scoped>
.sign-up {
  background-color: var(--color-primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
</style>
