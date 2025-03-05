import { Layout } from "@components";
import { useAuth } from "@store/authStore";
import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

const HomePage = lazy(() => import("../pages/Home"));
const ProductsPage = lazy(() => import("../pages/ProductsPage"));
const CheckoutPage = lazy(() => import("../pages/Checkout"));
const DashBoardPage = lazy(() => import("../pages/Dashboard"));
const LoginPage = lazy(() => import("../pages/Login"));

const AdminRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Cargando...</div>}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "products",
        element: (
          <SuspenseWrapper>
            <ProductsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "checkout",
        element: (
          <SuspenseWrapper>
            <CheckoutPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "login",
        element: (
          <SuspenseWrapper>
            <LoginPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: "/admin",
        element: <Layout />,
        children: [
          {
            index: true,
            element: (
              <SuspenseWrapper>
                <DashBoardPage />
              </SuspenseWrapper>
            ),
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
