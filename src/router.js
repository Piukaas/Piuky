import CreateMovie from "@/components/pages/movies/CreateMovie.vue";
import SearchMovie from "@/components/pages/movies/SearchMovie.vue";
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
    name: "SearchMovie",
    component: SearchMovie,
    children: [
      {
        path: ":id",
        name: "CreateMovie",
        component: CreateMovie,
      },
    ],
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
