import { createRouter, createWebHistory } from "vue-router";
import ListOverview from "@/components/pages/movies/ListOverview.vue";

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
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
