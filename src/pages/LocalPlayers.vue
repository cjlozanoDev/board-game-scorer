<template>
  <q-page padding>
    <p class="p-title">Jugadores que has creado</p>
    <p class="p-subtitle" v-if="!user.localUsers">
      No tienes jugadores creados, puedes añadir o crear tu primer jugador
      haciendo click en el botón de abajo
    </p>
    <q-table v-else title="Jugadores creados" :rows="rows" :columns="columns" />
    <ButtonBsg
      @click="createNewPlayer"
      size="md"
      label="Crear un nuevo jugador"
    />
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
    const rows = ref([]);
    const columns = ref([]);

    const user = computed(() => {
      return bgsStore.getUserData;
    });

    const createNewPlayer = () => {
      router.push({
        path: "/localplayers/localplayer",
      });
    };

    columns.value = [
      {
        name: "name",
        label: "Nombre",
        align: "left",
        field: "name",
      },
      {
        name: "nickName",
        label: "Apodo",
        align: "left",
        field: "nickName",
      },
    ];

    if (user.value.localUsers) {
      rows.value = user.value.localUsers.map((user) => ({
        name: user.name,
        nickName: user.nickName,
      }));
    }

    return { user, createNewPlayer, columns, rows };
  },
};
</script>

<style scoped>
.local-players__header {
  font-size: 2em;
}
</style>
