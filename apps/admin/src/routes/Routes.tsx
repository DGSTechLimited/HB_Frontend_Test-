import { lazy } from "react";
import { useRoutes, type RouteObject } from "react-router-dom";
import { Loadable } from "@shared/components/Loadable";
import { MainLayout } from "@components/layouts";
import { AuthMiddleware, GuestMiddleware } from "@middlewares/index";
import OrderLogs from "@/pages/(orderLogs)";
import UserManagement from "@/pages/(userManagement)";
import ContentManagement from "@/pages/(contentManagement)";

// Lazy load pages
const Dashboard = Loadable(lazy(() => import("@pages/(dashboard)/index")));
const DealersList = Loadable(lazy(() => import("@pages/(dealers)/list/index")));
const Login = Loadable(lazy(() => import("@pages/(auth)/login/index")));

const Routes = () => {
  const routes: RouteObject[] = [
    // Protected routes
    {
      path: "/",
      element: (
        <AuthMiddleware>
          <MainLayout />
        </AuthMiddleware>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dealers", element: <DealersList /> },
        { path: "order-logs", element: <OrderLogs /> },
        { path: "user-management", element: <UserManagement /> },
        { path: "content-management", element: <ContentManagement /> },
      ],
    },
    // Auth routes (guest only)
    {
      path: "/login",
      element: (
        <GuestMiddleware>
          <Login />
        </GuestMiddleware>
      ),
    },
  ];

  return useRoutes(routes);
};

export { Routes };
