<template>
  <q-page class="add-game page-center-flex">
    <p class="p-title">Buscar juego</p>
    <div class="add-game__searcher">
      <q-input
        outlined
        v-model="gameName"
        label="Nombre"
        @update:model-value="searchGame"
      />
      <div v-if="!flagSearched" class="add-game__searcher__info--inital">
        <q-icon name="o_search" size="10em" />
        <p class="p-subtitle text-center">
          Podrás buscar tus juegos dentro del catálogo online o bien añadir
          juegos que no encuentres.
        </p>
        <p class="p-subtitle text-center">
          Para empezar a buscar, escribe un nombre en la cajita de arriba,
          puedes probar en español y si no lo encuentras te recomendamos ponerlo
          en inglés.
        </p>
      </div>
      <div
        v-if="flagSearched && !listGames.length"
        class="add-game__searcher__info--no-game"
      >
        No se han encontrado juegos
      </div>
      <div>
        <q-list>
          <q-item v-for="game in listGames" :key="game.id">
            <q-item-section avatar>
              <q-avatar rounded>
                <img :src="game.thumb_url" />
              </q-avatar>
            </q-item-section>
            <q-item-section>{{ game.name }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { searchGameApi } from "../api/board-game-atlas";

export default {
  name: "AddGame",
  setup() {
    const gameName = ref("");
    const flagSearched = ref(false);
    const listGames = ref([]);

    const searchGame = () => {
      searchGameApi({ name: gameName.value })
        .then(({ data }) => {
          listGames.value = data.games;
          flagSearched.value = true;
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return {
      gameName,
      flagSearched,
      listGames,
      searchGame,
    };
  },
};
</script>

<style scoped>
.add-game__searcher {
  width: 100%;
}
.add-game__searcher__info--inital {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
