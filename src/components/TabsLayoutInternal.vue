<template>
  <q-tabs
    :value="modelValue"
    @update:model-value="updateTab"
    class="full-width"
  >
    <q-tab name="Inicio" icon="ti-home" label="Inicio" />
    <q-tab name="Partidas" icon="ti-game" label="partidas" />
    <q-tab name="Juegos" icon="ti-layout-grid4-alt" label="juegos" />
    <q-tab name="Buscar" icon="ti-search" label="buscar" />
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

    return {
      updateTab,
    };
  },
};
</script>
