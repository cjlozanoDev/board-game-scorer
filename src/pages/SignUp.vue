<template>
  <q-page class="sign-up" padding>
    <h2>Crea tu cuenta</h2>
    <div class="box-form__credentials-user">
      <q-input v-model="name" color="secondary" label="Nombre">
        <template v-slot:prepend>
          <q-icon name="ti-user" />
        </template>
      </q-input>

      <q-input v-model="email" color="secondary" label="Email">
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
          @click="createUser('carlos')"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
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

    const createUser = () => {
      createUserWithEmailAndPasswordApi(email.value, password.value)
        .then((result) => {
          const user = result.user;
          addUserInCollectionApi(name.value, email.value, user.uid)
            .then(() => {
              console.log("hola");
              goToHome();
            })
            .catch((error) => {
              console.log("error al guardar ", error);
            });
        })
        .catch((error) => {
          console.log("error es:", error);
        });
    };

    const goToHome = () => {
      router.push({ path: "/home" });
    };

    return {
      name,
      email,
      password,
      passwordConfirm,
      isPwd,
      createUser,
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
