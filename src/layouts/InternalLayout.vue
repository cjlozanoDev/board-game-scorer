<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-secondary text-white" height-hint="98">
      <q-toolbar>
        <ButtonBsg
          v-if="!routerMeta.backButton"
          dense
          flat
          round
          icon="menu"
          class="text-white"
          @click="toggleLeftDrawer"
        />
        <ButtonBsg
          v-else
          dense
          flat
          round
          icon="arrow_back"
          class="text-white"
          @click="goToBackRouter"
        />
        <q-toolbar-title>
          {{ routerMeta.nameHeader }}
        </q-toolbar-title>
      </q-toolbar>

      <TabsLayoutInternal
        v-model="tab"
        class="internat-layout__tabs-header"
        @click-tab-internal="clickTabInternal"
      />
    </q-header>

    <q-drawer
      v-if="!routerMeta.backButton"
      v-model="leftDrawerOpen"
      :width="200"
      :breakpoint="400"
    >
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
            @click="resetTabActive"
            exact
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Inbox </q-item-section>
          </q-item>

          <q-item
            to="/boardgames"
            clickable
            v-ripple
            active-class="interna-layout__drawer__link-active"
            @click="resetTabActive"
          >
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Juegos </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="resetTabActive">
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
      <TabsLayoutInternal
        v-model="tab"
        class="internat-layout__tabs-footer"
        @click-tab-internal="clickTabInternal"
      />
    </q-footer>
  </q-layout>
</template>

<script>
import { ref, watch, computed } from "vue";
import { signOutApi } from "../api/auth";
import { useRouter } from "vue-router";
import { useBgsStore } from "../stores/bgs";
import TabsLayoutInternal from "../components/TabsLayoutInternal.vue";
import ButtonBsg from "src/components/elements/ButtonBgs.vue";

export default {
  name: "InternalLayout",
  components: {
    ButtonBsg,
    TabsLayoutInternal,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const tab = ref("Inicio");
    const router = useRouter();
    const bgsStore = useBgsStore();

    const user = computed(() => {
      return bgsStore.getUserData;
    });

    const routerMeta = computed(() => router.currentRoute.value.meta);

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

    const clickTabInternal = (pathTab) => {
      router.push({ path: pathTab });
    };

    const resetTabActive = () => {
      tab.value = "";
    };

    const goToBackRouter = () => {
      router.push({ path: routerMeta.value.backPagePath });
    };

    return {
      tab,
      toggleLeftDrawer,
      leftDrawerOpen,
      signOut,
      resetTabActive,
      user,
      routerMeta,
      goToBackRouter,
      clickTabInternal,
    };
  },
};
</script>

<style scoped>
div ::v-deep(.q-tabs__content--align-center) {
  justify-content: space-around;
  width: 100%;
}
.internal-layout__avatar {
  background-color: #fff;
}
.interna-layout__drawer__link-active {
  color: var(--color-primary);
}
.internat-layout__tabs-header {
  display: none;
}

@media (min-width: 1024px) {
  div ::v-deep(.q-tabs__content--align-center) {
    justify-content: center;
  }
  .internat-layout__tabs-footer {
    display: none;
  }
  .internat-layout__tabs-header {
    display: block;
  }
}
</style>
