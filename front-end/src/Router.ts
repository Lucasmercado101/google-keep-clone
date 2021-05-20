import createRouter from "router5";
import browserPlugin from "router5-plugin-browser";

export default function configureRouter() {
  const routes = [
    { name: "login", path: "/" },
    { name: "register", path: "/register" },
    {
      name: "notes",
      path: "/notes",
      forwardTo: "notes.home",
      children: [
        {
          name: "home",
          path: "/home"
        },
        {
          name: "archived",
          path: "/archived"
        }
      ]
    }
  ];

  const router = createRouter(routes, { defaultRoute: "login" });

  router.usePlugin(browserPlugin());

  return router;
}
