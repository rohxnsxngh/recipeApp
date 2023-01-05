import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/sign-in",
      name: "signin",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/feed",
      name: "feed",
      component: () => import("../views/Feed.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/About.vue"),
    },
    {
      path: "/groceries",
      name: "groceries",
      component: () => import("../views/Groceries.vue"),
    },
  ],
});

export default router;
