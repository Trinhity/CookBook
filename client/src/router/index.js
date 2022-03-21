import Vue from "vue";
import VueRouter from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import BookmarkedView from "../views/BookmarkedView.vue";
import SearchRecipeView from "../views/SearchRecipeView.vue";
import LoginView from "../views/LoginView.vue";
import RegistrationView from "../views/RegistrationView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    props: true,
    component: DashboardView,
  },
  {
    path: "/searchrecipes",
    name: "search",
    props: true,
    component: SearchRecipeView,
  },
  {
    path: "/",
    name: "login",
    props: true,
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegistrationView,
  },
  {
    path: "/bookmarked",
    name: "bookmarked",
    component: BookmarkedView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
