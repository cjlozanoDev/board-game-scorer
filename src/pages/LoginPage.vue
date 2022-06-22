<template>
  <q-page class="login-page" padding>
    <div class="login-page__block-info">
      <div class="login-page__block-info__title">
        <h2>¡Hola!</h2>
      </div>

      <div class="login-page__block-info__text">
        <p class="text-center">
          {{ textInfo }}
        </p>
      </div>
    </div>

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

    <div class="login-page__text-info-inferior">
      <p class="text-center">
        {{ textInfo }}
      </p>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LoginPage",
  setup() {
    const textInfo = ref(
      "Tu app para llevar las puntuaciones de tus partidas de juegos mesa, estadísticas y mucho más"
    );
    const email = ref("");
    const password = ref("");
    const isPwd = ref(true);

    return {
      email,
      password,
      isPwd,
      textInfo,
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
  max-width: 500px;
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
.login-page__block-info__text,
.login-page__text-info-inferior {
  font-size: 1.5em;
}
.login-page__block-info__text {
  display: none;
}
.login-page__text-info-inferior {
  margin-top: 20px;
}

@media (min-width: 600px) {
  .login-page__box {
    width: 60%;
  }
}
@media (min-width: 1024px) {
  .login-page {
    flex-direction: row;
    gap: 50px;
  }
  .login-page__text-info-inferior {
    display: none;
  }
  .login-page__block-info__text {
    display: block;
  }
  .login-page__block-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
