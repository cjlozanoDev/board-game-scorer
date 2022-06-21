<template>
  <q-page class="login-page" padding>
    <h3>¡Hola!</h3>
    <div class="login-page__box">
      <q-input color="secondary" v-model="email" label="Email">
        <template v-slot:prepend>
          <q-icon name="ti-email" />
        </template>
      </q-input>

      <q-input
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

      <div class="login-page__box__actions">
        <q-btn
          color="primary"
          class="login-page__box__actions__button-entry"
          label="Entrar"
        />
        <q-btn :no-caps="true" flat label="Regístrate" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LoginPage",
  setup() {
    const email = ref("");
    const password = ref("");
    const isPwd = ref(true);

    return {
      email,
      password,
      isPwd,
    };
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);
  color: #fff;
}
.login-page__box {
  width: 80%;
  padding: 30px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 8px 18px;
  border-radius: 8px;
}
.login-page__box__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  color: #000;
}
.login-page__box__actions__button-entry {
  width: 100%;
  margin-bottom: 20px;
}

@media (min-width: 600px) {
  .login-page__box {
    width: 60%;
  }
}
@media (min-width: 1024px) {
  .login-page__box {
    width: 40%;
  }
}
</style>
