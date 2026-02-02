import { lazy } from "react";
import { useRoutes, type RouteObject } from "react-router-dom";
import { Loadable } from "@shared/components/Loadable";
import { MainLayout } from "@components/layouts";
import { AuthMiddleware, GuestMiddleware } from "@middlewares/index";
import SearchPart from "@/pages/(searchPart)";
import CartPage from "@/pages/cart";
import BillingDetails from "@/pages/(billing)";
import Order from "@/pages/(order)";
import ScrollToTop from "@/components/ScrollToTop";

// Lazy load pages
const Dashboard = Loadable(lazy(() => import("@pages/(dashboard)/index")));
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
        { path: "search", element: <SearchPart /> },
        { path: "cart", element: <CartPage /> },
        { path: "checkout", element: <BillingDetails /> },
        { path: "order/:id", element: <Order /> },
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

  return (
    <>
      <ScrollToTop />
      {useRoutes(routes)}
    </>
  );
};

export { Routes };
