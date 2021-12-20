import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import LoginRegister from '../views/LoginRegister.vue';
import Market from '../views/Market.vue';
import DetailAktie from '../views/akDetail.vue';
import MainMenu from '../views/MainMenu.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    // Anmelde und Account erstellen
    path: '/LoginRegister',
    name: 'LoginRegister',
    component: LoginRegister,
  },
  {
    // Alle verfpgbaren Aktien Market
    path: '/Market/:user_id',
    props: true,
    name: 'Market',
    component: Market,
  },
  {
    // Chart.js angezeigt
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
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
    path: '/mainmenu/:user_id',
    props: true,
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
