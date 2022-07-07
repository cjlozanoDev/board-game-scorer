const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/LoginPage.vue") },
      { path: "/signUp", component: () => import("pages/SignUp.vue") },
    ],
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("layouts/InternalLayout.vue"),
    children: [{ path: "", component: () => import("pages/HomePage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
