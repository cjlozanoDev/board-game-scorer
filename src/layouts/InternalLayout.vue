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
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Inbox </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Star </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section> Send </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> Drafts </q-item-section>
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
          <div class="text-weight-bold">Carlos Javier</div>
          <div>@carlosjlp</div>
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
        <q-tab name="Buscar" icon="ti-search" label="buscar" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import ButtonBsg from "src/components/elements/ButtonBgs.vue";

export default {
  name: "InternalLayout",
  components: {
    ButtonBsg,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const tab = ref("Inicio");

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    return {
      tab,
      toggleLeftDrawer,
      leftDrawerOpen,
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
</style>
