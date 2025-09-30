import { createRouter, createWebHashHistory } from 'vue-router';
import Test from "../pages/home.vue";

const routes = [
    { path: '/', name: 'test', component: Test },
    // { path: '/add', name: 'add', component: AddNote },
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;