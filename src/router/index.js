import { createRouter, createWebHistory } from "vue-router";
import { getToken } from "../webservice/auth";

const routes = [
  {
    path: "/",
    name: "reportRoot",
    component: () => import("../views/adminSidebar.vue"),
    children: [
      { path: "/", component: () => import("../views/admin/report.vue") },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name != "Login" && !getToken()) next({ name: "Login" });
  next();
});

export default router;
