import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../Layout/TopLayout.vue"),
      children: [
        {
          path: "",
          name: "Home",
          component: HomeView,
          children: [],
        },
      ],
    },
    {
      path: "/dashboard",
      component: () => import("../Layout/SidebarLayout.vue"),
      children: [
        {
          path: "",
          name: "Dashboard",
          component: () => import("../views/DashboardView.vue"),
        },
        {
          path: "home-sensor",
          name: "Home Sensor",
          component: () => import("../views/HomeSensorDashboard.vue"),
        },
        {
          path: "test",
          name: "Testing",
          component: () => import("../views/TestView.vue"),
        },
      ],
    },
  ],
});

export default router;
