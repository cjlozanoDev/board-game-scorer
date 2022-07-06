<template>
  <q-page class="login-page" padding>
    <div class="login-page__block-info">
      <div class="login-page__block-info__title">
        <h2 class="login-page__block-info__title__h2">¡Hola!</h2>
      </div>

      <div class="login-page__block-info__text">
        <p class="text-center">
          {{ textInfo }}
        </p>
      </div>
    </div>

    <div class="login-page__block__box">
      <div class="box-form__credentials-user">
        <q-input v-model="email" label="Email">
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
    </div>

    <div class="login-page__text-info-inferior">
      <p class="text-center q-ma-none">
        {{ textInfo }}
      </p>
    </div>
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import ButtonBsg from "src/components/elements/ButtonBgs.vue";
import {
  accessWithGoogleApi,
  getRedirectResultApi,
  addUserInCollectionApi,
} from "src/api/auth";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  components: {
    ButtonBsg,
  },
  setup() {
    onMounted(() => {
      getRedirectResultApi().then((result) => {
        if (result) {
          addUserInCollection(result.user);
        }
      });
    });
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
          addUserInCollection(result.user);
        })
        .catch((error) => {
          console.log("error es:", error);
        });
    };

    const addUserInCollection = (user) => {
      addUserInCollectionApi(user.displayName, user.email, user.uid)
        .then(() => {
          goToHome();
        })
        .catch((error) => {
          console.log("error al guardar", error);
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
.login-page__block-info__text,
.login-page__text-info-inferior {
  font-size: 1.5em;
  margin-top: 20px;
  padding: 10px;
}
.login-page__block-info__text {
  display: none;
}
.login-page__block-info__title__h2,
.login-page__text-info-inferior,
.login-page__block-info__text {
  position: relative;
}
.login-page__block-info__title__h2::before,
.login-page__text-info-inferior::before,
.login-page__block-info__text::before {
  content: "";
  position: absolute;
  background: #000;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: -1;
  opacity: 0.6;
}

.login-page__block__box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

@media (min-width: 1024px) {
  .login-page {
    flex-direction: row;
    justify-content: inherit;
    padding: 0;
  }
  .login-page__block-info {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: 50%;
    height: 100vh;
    justify-content: center;
  }
  .login-page__text-info-inferior {
    display: none;
  }
  .login-page__block-info__text {
    display: block;
  }
  .login-page__block__box {
    height: 100vh;
    width: 50%;
    padding: 20px;
  }
}
</style>
