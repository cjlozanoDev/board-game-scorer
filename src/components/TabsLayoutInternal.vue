<template>
  <q-tabs
    :value="modelValue"
    @update:model-value="updateTab"
    class="full-width bg-accent"
  >
    <q-tab
      @click="clickTabInternal('/')"
      name="Inicio"
      icon="ti-home"
      label="Inicio"
    />
    <q-tab
      @click="clickTabInternal('/')"
      name="Partidas"
      icon="ti-game"
      label="partidas"
    />
    <q-tab
      @click="clickTabInternal('/boardgames')"
      name="Juegos"
      icon="ti-layout-grid4-alt"
      label="juegos"
    />
    <q-tab
      @click="clickTabInternal('/localplayers')"
      name="Jugadores"
      icon="groups"
      label="Jugadores"
    />
  </q-tabs>
</template>

<script>
export default {
  name: "TabsLayoutInternal",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const updateTab = (e) => {
      context.emit("update:modelValue", e);
    };

    const clickTabInternal = (pathTab) => {
      context.emit("click-tab-internal", pathTab);
    };

    return {
      updateTab,
      clickTabInternal,
    };
  },
};
</script>
