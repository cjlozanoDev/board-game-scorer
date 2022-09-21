<template>
  <div v-if="Object.keys(gameInfo).length">
    <div class="add-game-bgg__header">
      <img
        :src="gameInfo.thumb_url"
        @error="handlerError"
        alt="Front page boarg game"
        class="img-header"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "AddGameBgg",
  props: {
    gameInfo: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {},
};
</script>

<style scoped>
.add-game-bgg__header {
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.add-game-bgg__header::before {
  content: "";
  position: absolute;
  background: #000;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.75;
  z-index: -1;
}
.img-header {
  height: 300px;
}
</style>
