<template>
  <q-btn
    :label="label"
    :color="color"
    :size="size"
    :no-caps="noCaps"
    :class="className"
    :outline="outline"
    :rounded="rounded"
    :type="type"
    :round="round"
    :flat="flat"
    :icon="icon"
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
    type: {
      type: String,
      default: "button",
    },
    round: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.q-btn {
  padding: 15px;
}
</style>
