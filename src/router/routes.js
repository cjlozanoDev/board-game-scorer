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
    children: [{ path: "", component: () => import("pages/HomePage.vue") }],
  },
  {
    path: "/boardgames",
    name: "BoardGames",
    meta: {
      Auth: true,
    },
    component: () => import("layouts/InternalLayout.vue"),
    children: [
      { path: "", component: () => import("pages/BoardGamesPage.vue") },
    ],
  },
  {
    path: "/localplayers",
    name: "Games",
    meta: {
      Auth: true,
    },
    component: () => import("layouts/InternalLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/LocalPlayers.vue"),
      },
      {
        path: "localplayer",
        component: () =>
          import("src/pages/LocalPlayerPage/LocalPlayerPage.vue"),
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
