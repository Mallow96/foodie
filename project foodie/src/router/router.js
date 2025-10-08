import { createRouter, createWebHashHistory } from "vue-router";
import Test from "../pages/home.vue";
import Account from "../pages/account.vue";
import RestaurantList from "../pages/fake_list.vue";
import RestaurantPage from "../pages/restaurant_page.vue";
import AccountSetting from "../pages/account_setting.vue";
import ReservationHistory from "../pages/reservation_history.vue";
import SearchResult from "../pages/search_result.vue";
import PageUnfinish from "../pages/page_unfinish.vue";

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
  {
    path: "/reservation-history",
    name: "reservationHistory",
    component: ReservationHistory,
  },
  { path: "/search-result", name: "searchResult", component: SearchResult },
  {
    path: "/this-page-is-developing",
    name: "developing",
    component: PageUnfinish,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
