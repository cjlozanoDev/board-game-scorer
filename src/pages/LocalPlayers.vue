<template>
  <q-page
    :class="[
      'page-center-flex',
      { 'local-players--not-players': !localPlayers },
    ]"
  >
    <div class="text-center" v-if="!localPlayers">
      <q-icon name="supervised_user_circle" size="10em" />
      <h6>¡Aún no has creado ningún jugador!</h6>
      <p class="p-subtitle">
        Pulsa en el botón crear nuevo jugador para añadir tu primer jugador
      </p>

      <ButtonBsg
        size="md"
        label="Crear un nuevo jugador"
        class="local-players-btn-create-player"
        @click="createNewPlayer"
      />
    </div>

    <div v-else>
      <h4>Jugadores disponibles</h4>
      <p class="p-subtitle">
        Esta es la lista de jugadores que has añadido, puedes pulsar en cada uno
        de ellos para ver detalles o editarlos.
      </p>

      <div class="local-players__container-list">
        <div class="local-players__container-list__header">
          <span class="local-players__info-number-players">
            {{ localPlayers.length }} jugadores
          </span>
          <ButtonBsg
            class="local-players__container-list__header__button"
            size="sm"
            icon-right="person_add"
            label="Crear nuevo jugador"
            @click="createNewPlayer"
          />
        </div>

        <q-list class="local-players__list-players" bordered separator>
          <q-item
            v-for="localPlayer in localPlayers"
            :key="localPlayer.uid"
            clickable
            v-ripple
          >
            <q-item-section>
              <q-item-label>{{ localPlayer.name }}</q-item-label>
              <q-item-label caption
                >apodo: {{ localPlayer.nickName }}</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useBgsStore } from "../stores/bgs";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import ButtonBsg from "src/components/elements/ButtonBgs.vue";

export default {
  name: "LocalPlayers",
  components: {
    ButtonBsg,
  },
  setup() {
    const bgsStore = useBgsStore();
    const router = useRouter();

    const localPlayers = computed(() => {
      return bgsStore.getUserData.localUsers;
    });

    const createNewPlayer = () => {
      router.push({
        path: "/localplayers/localplayer",
      });
    };

    return { localPlayers, createNewPlayer };
  },
};
</script>

<style scoped>
.local-players__container-not-players {
  justify-content: center;
}
.local-players .local-players__header {
  font-size: 2em;
}
.local-players-btn-create-player {
  margin-top: 20px;
}
.local-players__container-list__header__button {
  padding: 8px;
}
.local-players__container-list {
  margin: 30px 0px;
}
.local-players__container-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.local-players__info-number-players {
  font-style: italic;
  font-weight: bold;
}
.local-players__list-players {
  font-size: 1.2em;
  margin-top: 10px;
  background-color: #fff;
}
</style>
