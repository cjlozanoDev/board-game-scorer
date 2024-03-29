const routes = [
  {
    path: "/",
    name: "login",
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("signedin")) {
        next({ path: "/home" });
      } else {
        next();
      }
    },
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/LoginPage.vue") },
      { path: "/signUp", component: () => import("pages/SignUp.vue") },
    ],
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      Auth: true,
    },
    component: () => import("layouts/InternalLayout.vue"),
    children: [
      {
        path: "",
        meta: {
          nameHeader: "Inicio",
          backButton: false,
          backPagePath: null,
        },
        component: () => import("pages/HomePage.vue"),
      },
    ],
  },
  {
    path: "/boardgames",
    name: "BoardGames",
    meta: {
      Auth: true,
    },
    component: () => import("layouts/InternalLayout.vue"),
    children: [
      {
        path: "",
        meta: {
          nameHeader: "Juegos",
          backButton: false,
          backPagePath: null,
        },
        component: () => import("pages/BoardGamesPage.vue"),
      },
      {
        path: "addgame/",
        name: "AddGame",
        meta: {
          nameHeader: "Añadir juego",
          backButton: true,
          backPagePath: "/boardgames",
        },
        component: () => import("pages/AddGame/AddGame.vue"),
      },
      {
        path: "addgame/bgg",
        name: "AddGameBgg",
        meta: {
          nameHeader: "Añadir juego de la Bgg",
          backButton: true,
          backPagePath: "/boardgames/addGame",
        },
        component: () => import("pages/AddGameBgg.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/localplayers",
    name: "Players",
    meta: {
      Auth: true,
    },
    component: () => import("layouts/InternalLayout.vue"),
    children: [
      {
        path: "",
        meta: {
          nameHeader: "Jugadores",
          backButton: false,
          backPagePath: null,
        },
        component: () => import("pages/LocalPlayers.vue"),
      },
      {
        path: "localplayer",
        meta: {
          nameHeader: "Crear Jugador",
          backButton: true,
          backPagePath: "/localplayers",
        },
        component: () =>
          import("src/pages/LocalPlayerPage/LocalPlayerPage.vue"),
      },
      {
        path: "editlocalplayer/",
        name: "editPlayer",
        meta: {
          nameHeader: "Editar Jugador",
          backButton: true,
          backPagePath: "/localplayers",
        },
        component: () => import("src/pages/EditLocalPlayer.vue"),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
