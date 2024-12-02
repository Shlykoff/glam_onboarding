import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Onboarding from "@/views/Onboarding.vue";
import Statistic from "@/views/Statistic.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/onboarding",
    name: "Onboarding",
    component: Onboarding,
  },
  {
    path: "/statistic",
    name: "Statistic",
    component: Statistic,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
