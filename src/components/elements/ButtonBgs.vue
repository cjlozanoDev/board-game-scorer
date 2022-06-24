<template>
  <q-btn
    :label="label"
    :color="color"
    :size="size"
    :no-caps="noCaps"
    :class="className"
    :outline="outline"
    :rounded="rounded"
  />
</template>

<script>
export default {
  name: "ButtonBsg",
  props: {
    label: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "primary",
    },
    className: {
      type: String,
      default: "",
    },
    noCaps: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.q-btn {
  padding: 15px;
}
</style>
