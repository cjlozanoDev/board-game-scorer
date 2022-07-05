<template>
  <q-page class="sign-up" padding>
    <h2>Crea tu cuenta</h2>
    <div class="box-form__credentials-user">
      <q-form @submit.prevent="createUser()">
        <q-input
          v-model="name"
          label="Nombre *"
          lazy-rules
          :rules="[() => validateName() || messageNameForm]"
        >
          <template v-slot:prepend>
            <q-icon name="ti-user" />
          </template>
        </q-input>

        <q-input
          v-model="email"
          label="Email *"
          lazy-rules
          :rules="[() => validateEmail() || messageMailForm]"
        >
          <template v-slot:prepend>
            <q-icon name="ti-email" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          label="Contraseña *"
          class="q-mt-md"
          lazy-rules
          :rules="[() => validatePassword() || messagePasswordForm]"
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
          v-model="passwordConfirm"
          :type="isPwd ? 'password' : 'text'"
          label="Confirma tu contraseña *"
          class="q-mt-md"
          lazy-rules
          reactive-rules
          :rules="[() => validatePassWordConfirm() || messagePasswordConfirm]"
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

        <q-banner
          v-if="showErrorBanner"
          inline-actions
          class="sign-up__banner-warning"
        >
          {{ messageErrorBanner }}
        </q-banner>
        <div class="box-form__credentials-user__actions">
          <ButtonBsg
            type="submit"
            color="secondary"
            class="box-form__credentials-user__actions__button-entry"
            label="Registrarme"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { errors } from "../utils/error-messages";
import {
  createUserWithEmailAndPasswordApi,
  addUserInCollectionApi,
} from "src/api/auth";
import { useRouter } from "vue-router";
import ButtonBsg from "src/components/elements/ButtonBgs.vue";

export default {
  name: "SignUp",
  components: {
    ButtonBsg,
  },
  setup() {
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const passwordConfirm = ref("");
    const isPwd = ref(true);
    const showErrorBanner = ref(false);

    const messageNameForm = ref("El nombre es necesario para registrarse");
    const messageMailForm = ref("El email es necesario para registrarse");
    const messagePasswordForm = ref(
      "La contraseña es necesario para registrarse"
    );
    const messagePasswordConfirm = ref("La contraseña no coincide");
    const messageErrorBanner = ref("");

    const createUser = () => {
      if (isValidateForm()) {
        createUserWithEmailAndPasswordApi(email.value, password.value)
          .then((result) => {
            const user = result.user;
            addUserInCollectionApi(name.value, email.value, user.uid)
              .then(() => {
                showErrorBanner.value = false;
                goToHome();
              })
              .catch((error) => {
                console.log("error al guardar ", error);
              });
          })
          .catch((error) => {
            messageErrorBanner.value = errors[error.code];
            showErrorBanner.value = true;
          });
      }
    };

    const goToHome = () => {
      router.push({ path: "/home" });
    };

    const isValidateForm = () => {
      return (
        validateName() &&
        validateEmail() &&
        validatePassword() &&
        validatePassWordConfirm()
      );
    };

    const validateText = (text) => {
      return text.trim() && text.length > 0;
    };

    const validateName = () => {
      return validateText(name.value);
    };

    const validateEmail = () => {
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const isTextValidate = validateText(email.value);

      if (!isTextValidate) {
        messageMailForm.value = "El email es necesario para registrarse";
        return false;
      }
      if (!regexEmail.test(email.value)) {
        messageMailForm.value = "El email introducido no es válido";
        return false;
      }

      return true;
    };

    const validatePassword = () => {
      const isTextValidate = validateText(password.value);

      if (!isTextValidate) {
        messagePasswordForm.value =
          "La contraseña es necesario para registrarse";
        return false;
      }

      if (password.value.length < 6) {
        messagePasswordForm.value =
          "La contraseña tiene que ser mayor a 6 caracteres";
        return false;
      }
      return true;
    };

    const validatePassWordConfirm = () => {
      return password.value === passwordConfirm.value;
    };

    return {
      name,
      email,
      password,
      passwordConfirm,
      isPwd,
      createUser,
      validateName,
      validateEmail,
      validatePassword,
      validatePassWordConfirm,
      messageNameForm,
      messageMailForm,
      messagePasswordForm,
      messagePasswordConfirm,
      messageErrorBanner,
      showErrorBanner,
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
.sign-up__banner-warning {
  background: var(--color-mustard-app);
  margin-bottom: 20px;
}
</style>
