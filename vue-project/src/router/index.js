import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import catchAll from "../views/NotFound.vue";
import EditTask from "../views/EditTask.vue";
import AboutView from "../views/AboutView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/edit/:index",
      name: "edit",
      component: EditTask,
      props: true, // Mengaktifkan prop "index" dari parameter rute
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: catchAll,
    },
  ],
});

export default router;
