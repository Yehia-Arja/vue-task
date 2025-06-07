import { createRouter, createWebHistory } from "vue-router";
import LoginVue from "../features/login/views/LoginVue.vue"
import VerifyEmail from "../features/login/views/VerifyEmail.vue";

const routes = [
    { path: "/", name: "Login", component: LoginVue },
    { path: "/verifyCode", name: "Verify Email", component: VerifyEmail }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router