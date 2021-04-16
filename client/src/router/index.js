import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/superhero/:id",
    name: "Superhero",
    component: () =>
      import(/* webpackChunkName: "superhero" */ "../views/Superhero.vue"),
  },
  {
    path: "/comic/:id",
    name: "Comic",
    component: () =>
      import(/* webpackChunkName: "comic" */ "../views/Comic.vue"),
  },
  {
    path: "/movie/:id",
    name: "Movie",
    component: () =>
      import(/* webpackChunkName: "movie" */ "../views/Movie.vue"),
  },
  {
    path: "/movies",
    name: "MoviesOverview",
    component: () =>
      import(
        /* webpackChunkName: "moviesoverview" */ "../views/MoviesOverview.vue"
      ),
  },
  {
    path: "/comics",
    name: "ComicsOverview",
    component: () =>
      import(
        /* webpackChunkName: "comicsoverview" */ "../views/ComicsOverview.vue"
      ),
  },
  {
    path: "/superheroes",
    name: "SuperheroesOverview",
    component: () =>
      import(
        /* webpackChunkName: "superheroesoverview" */ "../views/SuperheroesOverview.vue"
      ),
  },
  {
    path: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notfound" */ "../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
