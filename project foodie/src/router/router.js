import { createRouter, createWebHashHistory } from "vue-router";
import Test from "../pages/home.vue";
import Account from "../pages/account.vue";
import RestaurantList from "../pages/fake_list.vue";
import RestaurantPage from "../pages/restaurant_page.vue";
import AccountSetting from "../pages/account_setting.vue";

const routes = [
  { path: "/", name: "test", component: Test },
  { path: "/myaccount", name: "account", component: Account },
  { path: "/fakelist", name: "fakelist", component: RestaurantList },
  { path: "/restaurant/:id", component: RestaurantPage, props: true }, // 動態路由
  {
    path: "/account-setting",
    name: "accountSetting",
    component: AccountSetting,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
