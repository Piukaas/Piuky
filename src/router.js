import CreateMovie from "@/components/pages/movies/CreateMovie.vue";
import ListOverview from "@/components/pages/movies/ListOverview.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: {},
  },
  {
    path: "/movies",
    name: "Movies",
    component: ListOverview,
  },
  {
    path: "/movies/create",
    name: "CreateMovie",
    component: CreateMovie,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
