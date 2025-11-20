import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { HomePage } from "../heroes/pages/home/HomePage";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/layouts/HeroesLayout";

const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeroesLayout></HeroesLayout>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "heroes/:idSlug",
        element: <HeroPage></HeroPage>,
      },
      {
        path: "search",
        element: <SearchPage></SearchPage>,
      },

      {
        path: "*",
        element: <Navigate to="/"></Navigate>,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage></AdminPage>,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/"></Navigate>,
  },
]);
