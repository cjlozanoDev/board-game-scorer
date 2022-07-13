<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-secondary text-white" height-hint="98">
      <q-toolbar>
        <ButtonBsg
          dense
          flat
          round
          icon="menu"
          class="text-white"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          {{ tab }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :width="200" :breakpoint="400">
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item
            to="/home"
            clickable
            v-ripple
            active-class="interna-layout__drawer__link-active"
            exact
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Inbox </q-item-section>
          </q-item>

          <q-item
            to="/games"
            clickable
            v-ripple
            active-class="interna-layout__drawer__link-active"
          >
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Juegos </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section> Send </q-item-section>
          </q-item>

          <q-item @click="signOut" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="ti-shift-right" />
            </q-item-section>

            <q-item-section> Cerrar sesión </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">{{ user.name }}</div>
          <div>{{ user.email }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-tabs v-model="tab" class="shadow-2 full-width">
        <q-tab name="Inicio" icon="ti-home" label="Inicio" />
        <q-tab name="Partidas" icon="ti-game" label="partidas" />
        <q-tab name="Juegos" icon="ti-layout-grid4-alt" label="juegos" />
        <q-tab name="Buscar" icon="ti-search" label="buscar" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { signOutApi } from "../api/auth";
import { useRouter } from "vue-router";
import { useBgsStore } from "../stores/bgs";
import ButtonBsg from "src/components/elements/ButtonBgs.vue";

export default {
  name: "InternalLayout",
  components: {
    ButtonBsg,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const tab = ref("Inicio");
    const router = useRouter();
    const bgsStore = useBgsStore();
    const user = bgsStore.getUserData;

    const signOut = () => {
      signOutApi()
        .then(() => {
          router.push({ path: "/" });
        })
        .catch((err) => {
          console.log("he entrado por el error");
          console.log(err);
        });
    };

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    return {
      tab,
      toggleLeftDrawer,
      leftDrawerOpen,
      signOut,
      user,
    };
  },
};
</script>

<style scoped>
div ::v-deep(.q-tabs__content--align-center) {
  justify-content: space-around;
}
.internal-layout__avatar {
  background-color: #fff;
}
.interna-layout__drawer__link-active {
  color: var(--color-primary);
}
</style>
