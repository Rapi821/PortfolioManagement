import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import LoginRegister from '../views/LoginRegister.vue';
import Market from '../views/Market.vue';
import DetailAktie from '../views/akDetail.vue';
import MainMenu from '../views/MainMenu.vue';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    // Anmelde und Account erstellen
    path: '/LoginRegister',
    name: 'LoginRegister',
    component: LoginRegister,
  },
  {
    // Alle verfpgbaren Aktien Market
    path: '/Market/',
    // props: true,
    name: 'Market',
    component: Market,
  },
  {
    // Chart.js angezeigt
    path: '/ChartExp',
    name: 'ChartExp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ChartExp.vue'),
  },
  {
    // DetailPage
    path: '/akDetail/:isin',
    props: true,
    name: 'Detail',
    component: DetailAktie,
  },
  {
    // MainMenu Dashboard
    path: '/mainmenu',
    props: false,
    name: 'MainMenu',
    component: MainMenu,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
