<template>
  <q-page class="login-page bg-img-main" padding>
    <div class="login-page__block-info">
      <div class="login-page__block-info__title">
        <h2 class="login-page__block-info__title__h2">¡Bienvenido!</h2>
      </div>

      <q-toolbar class="text-center gt-sm">
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <span> Board Game Scorer </span>
        </q-toolbar-title>
      </q-toolbar>
    </div>

    <div class="login-page__block__box">
      <div class="box-form__credentials-user">
        <q-form @submit.prevent="saludar()">
          <q-input
            lazy-rules
            :rules="[() => validateEmail() || messageMailForm]"
            v-model="email"
            label="Email"
          >
            <template v-slot:prepend>
              <q-icon name="ti-email" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'La contraseña es obligatoria para entrar en la aplicación',
            ]"
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
              type="submit"
              color="secondary"
              class="box-form__credentials-user__actions__button-entry"
              label="Entrar"
            />
            <ButtonBsg
              class="box-form__credentials-user__actions__button-entry--google"
              label="Entrar con Google"
              icon="ti-google"
              @click="accessWithGoogle"
            />
            <ButtonBsg
              :no-caps="true"
              class="box-form__credentials-user__actions__button-register"
              color="secondary"
              flat
              label="Regístrate"
              to="signUp"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import ButtonBsg from "src/components/elements/ButtonBgs.vue";
import { onMounted, ref } from "vue";
import {
  accessWithGoogleApi,
  getRedirectResultApi,
  addUserInCollectionApi,
} from "src/api/auth";
import { useRouter } from "vue-router";
import { validateEmailRegex } from "../utils/validations-regex";

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
    const messageMailForm = ref(
      "El email es necesario para entrar en la aplicación"
    );

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
    const validateText = (text) => {
      return text.trim() && text.length > 0;
    };
    const validateEmail = () => {
      const isTextValidate = validateText(email.value);
      messageMailForm.value =
        "El email es necesario para entrar en la aplicación";

      if (!isTextValidate) {
        return false;
      }
      if (!validateEmailRegex(email.value)) {
        messageMailForm.value = "El email introducido no es válido";
        return false;
      }

      return true;
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
      messageMailForm,
      saludar,
      accessWithGoogle,
      validateEmail,
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
.login-page__block-info {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.login-page__block__box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.box-form__credentials-user__actions__button-register {
  text-decoration: underline;
}

@media (min-width: 1024px) {
  .login-page {
    flex-direction: row;
    justify-content: inherit;
    padding: 0;
  }
  .login-page__block-info {
    position: relative;
    flex-direction: column;
    padding: 10px;
    width: 50%;
    height: 100vh;
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
