import { createRouter, createWebHashHistory } from "vue-router";
import Test from "../pages/home.vue";
import Account from "../pages/account.vue";
import RestaurantList from "../pages/fake_list.vue";
import RestaurantPage from "../pages/restaurant_page.vue";

const routes = [
  { path: "/", name: "test", component: Test },
  { path: "/myaccount", name: "account", component: Account },
  { path: "/fakelist", name: "fakelist", component: RestaurantList },
  { path: "/restaurant/:id", component: RestaurantPage, props: true }, // 動態路由
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
