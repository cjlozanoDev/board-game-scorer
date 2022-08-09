<template>
  <q-page class="board-games-page page-center-flex">
    <div class="text-center" v-if="!userGames || !userGames.length">
      <q-icon name="o_bento" size="10em" />
      <h6>¡Aún no tienes ningún juego!</h6>
      <p class="p-subtitle">
        Pulsa en el botón añadir nuevo juego para añadir tu primer juego
      </p>

      <ButtonBgs size="md" label="Añadir un nuevo juego" @click="addNewGame" />
    </div>
  </q-page>
</template>

<script>
import ButtonBgs from "src/components/elements/ButtonBgs.vue";
import { computed } from "vue";
import { useBgsStore } from "../stores/bgs";

export default {
  name: "BoardGamesPage",
  components: { ButtonBgs },
  setup() {
    const bgsStore = useBgsStore();

    const userGames = computed(() => {
      return bgsStore.getUserData.userGames;
    });

    const addNewGame = () => {};

    return {
      userGames,
      addNewGame,
    };
  },
};
</script>
