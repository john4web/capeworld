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
    path: "/person/:id",
    name: "Person",
    component: () =>
      import(/* webpackChunkName: "person" */ "../views/Person.vue"),
  },
  {
    path: "/people",
    name: "PeopleOverview",
    component: () =>
      import(
        /* webpackChunkName: "peopleoverview" */ "../views/PeopleOverview.vue"
      ),
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
    path: "/legal",
    name: "Legal",
    component: () =>
      import(/* webpackChunkName: "legal" */ "../views/Legal.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notfound" */ "../views/NotFound.vue"),
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: () => import(/* webpackChunkName: "quiz" */ "../views/Quiz.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "quiz" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
