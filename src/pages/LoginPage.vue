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

    <div class="box-form__credentials-user">
      <q-input color="secondary" v-model="email" label="Email">
        <template v-slot:prepend>
          <q-icon name="ti-email" />
        </template>
      </q-input>

      <q-input
        v-model="password"
        color="secondary"
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

      <div class="box-form__credentials-user__actions">
        <ButtonBsg
          color="secondary"
          class="box-form__credentials-user__actions__button-entry"
          label="Entrar"
          @click="saludar('carlos')"
        />
        <ButtonBsg
          class="box-form__credentials-user__actions__button-entry--google"
          label="Entrar con Google"
          icon="ti-google"
          @click="accessWithGoogle"
        />
        <ButtonBsg
          :no-caps="true"
          color="secondary"
          flat
          label="Regístrate"
          to="signUp"
        />
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
import ButtonBsg from "src/components/elements/ButtonBgs.vue";
import { accessWithGoogleApi } from "src/api/auth";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  components: {
    ButtonBsg,
  },
  setup() {
    const router = useRouter();
    const textInfo = ref(
      "Tu app para llevar las puntuaciones de tus partidas de juegos mesa, estadísticas y mucho más"
    );
    const email = ref("");
    const password = ref("");
    const isPwd = ref(true);

    const accessWithGoogle = () => {
      accessWithGoogleApi()
        .then((result) => {
          const user = result.user;
          goToHome();
        })
        .catch((error) => {
          console.log("error es:", error);
        });
    };
    const saludar = (nombre) => {
      alert("hola", nombre);
    };
    const goToHome = () => {
      router.push({ path: "/home" });
    };
    return {
      email,
      password,
      isPwd,
      textInfo,
      saludar,
      accessWithGoogle,
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
  color: #fff;
  background-color: var(--color-primary);
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
