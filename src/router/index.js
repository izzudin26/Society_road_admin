import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "root",
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

export default router;
