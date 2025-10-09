export const navigations = [{ label: "Dashboard", to: "/dashboard" }];

export const otherNavigations = [
  {
    icon: new URL("@/assets/icons/Github.svg", import.meta.url).href,
    to: "https://github.com/CrzxaExe",
  },
];

export const dashboardNavigation = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: new URL("@/assets/icons/Dashboard.svg", import.meta.url).href,
  },
  {
    label: "Testing",
    to: "/dashboard/test",
    icon: new URL("@/assets/icons/Code.svg", import.meta.url).href,
  },
];
