import { createRouter, createWebHashHistory } from 'vue-router';
import Test from "../pages/home.vue";
import Account from '../pages/account.vue';

const routes = [
    { path: '/', name: 'test', component: Test },
    { path: '/myaccount', name: 'account', component: Account },
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;