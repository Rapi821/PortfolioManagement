import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginRegister from "../views/LoginRegister.vue";
import Market from "../views/Market.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/LoginRegister",
    name: "LoginRegister",
    component: LoginRegister,
  },
  {
    path: "/Market",
    name: "Market",
    component: Market,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
