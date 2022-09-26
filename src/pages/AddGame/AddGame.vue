<template>
  <q-page class="page-center-flex">
    <div class="add-game__searcher">
      <p class="p-title">Buscar juego</p>
      <q-input
        outlined
        bottom-slots
        v-model="gameName"
        label="Nombre"
        @update:model-value="searchGame"
      >
        <template v-slot:append>
          <q-spinner-hourglass v-if="showSpinner" color="primary" />
        </template>

        <template v-slot:hint>
          <span v-if="flagSearched && !listGames.length">
            No se han encontrado juegos en el catálogo con el nombre introducido
          </span>
        </template>
      </q-input>

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
        <div>
          <q-icon name="o_casino" class="icon_dice_left" size="8em" />
          <q-icon name="o_casino" class="icon_dice_right" size="8em" />
        </div>

        <p class="p-subtitle text-center">
          El nombre introducido no coincide con ningún juego del catálogo online
        </p>
        <p class="p-subtitle text-center">
          Si no lo has hecho ya, puedes probar a ponerlo en inglés o bien añadir
          tu juego manualmente aquí
          <a href=""> Añadir juego manualmente </a>
        </p>
      </div>
      <div class="add-game__list-games">
        <q-list>
          <q-item
            clickable
            v-for="game in listGames"
            :key="game.id"
            @click="showComponentaddGameBgg(game)"
          >
            <q-item-section avatar>
              <q-avatar rounded>
                <img
                  :src="game.thumb_url"
                  @error="handlerError"
                  alt="Front page boarg game"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section class="section-game-name">
              {{ game.name }}
            </q-item-section>

            <q-item-section avatar>
              <q-avatar rounded>
                <q-icon name="arrow_right" />
              </q-avatar>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { searchGameApi } from "../../api/board-game-atlas";
import { useRouter } from "vue-router";

export default {
  name: "AddGame",
  setup() {
    const gameName = ref("");
    const flagSearched = ref(false);
    const listGames = ref([]);
    const debounce = ref(null);
    const showSpinner = ref(false);
    const gameSelected = ref({});

    const router = useRouter();

    const searchGame = () => {
      showSpinner.value = true;
      clearTimeout(debounce.value);

      debounce.value = setTimeout(() => {
        if (gameName.value !== "") {
          searchGameApi({ name: gameName.value })
            .then(({ data }) => {
              listGames.value = data.games;
              flagSearched.value = true;
              showSpinner.value = false;
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          listGames.value = [];
          showSpinner.value = false;
        }
      }, 400);
    };

    const showComponentaddGameBgg = (game) => {
      const gameObjet = {
        name: game.name,
        description: game.description,
        thumb_url: game.thumb_url,
      };
      router.push({
        name: "AddGameBgg",
        params: {
          gameInfo: JSON.stringify(gameObjet),
        },
      });
    };

    const handlerError = (e) => {
      e.target.src = "";
    };

    return {
      gameName,
      flagSearched,
      listGames,
      showSpinner,
      searchGame,
      handlerError,
      showComponentaddGameBgg,
      gameSelected,
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
.add-game__searcher__info--no-game {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.add-game__searcher__info--no-game p {
  margin-top: 30px;
}
.add-game__list-games {
  margin-top: 20px;
}
.q-item__section--side > .q-avatar {
  font-size: 70px;
}
.section-game-name {
  font-weight: bold;
}
.icon_dice_left {
  transform: rotate(20deg);
}
.icon_dice_right {
  transform: rotate(-20deg);
}
</style>
