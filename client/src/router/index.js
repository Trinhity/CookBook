import Vue from "vue";
import VueRouter from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import BookmarkedView from "../views/BookmarkedView.vue";
import SearchRecipeView from "../views/SearchRecipeView.vue";
import LoginView from "../views/LoginView.vue";
import UserProfileView from "../views/UserProfileView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    props: {},
    component: DashboardView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/userprofile",
    name: "profile",
    props: true,
    component: UserProfileView,
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
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
