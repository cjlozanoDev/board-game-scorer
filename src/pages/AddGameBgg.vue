<template>
  <transition
    appear
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideInLeft"
  >
    <div v-if="Object.keys(gameInfoParse).length">
      <div class="add-game-bgg__header">
        <img
          :src="gameInfoParse.thumb_url"
          @error="handlerError"
          alt="Front page boarg game"
          class="img-header"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AddGameBgg",
  props: {
    gameInfo: {
      type: String,
      default: "{}",
    },
  },
  setup(props) {
    const gameInfoParse = ref(JSON.parse(props.gameInfo));

    return {
      gameInfoParse,
    };
  },
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
