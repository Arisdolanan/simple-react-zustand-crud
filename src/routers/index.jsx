import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";

// without lazy loading
import { Loading } from "@/components/Loading";

// with lazy loading
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Student = lazy(() => import("@/pages/Student"));

export const Router = () =>
  useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      ),
      text: "Home",
      private: false,
    },
    {
      path: "/about",
      element: (
        <Suspense fallback={<Loading />}>
          <About />
        </Suspense>
      ),
      text: "About",
    },
    {
      path: "/student",
      element: (
        <Suspense fallback={<Loading />}>
          <Student />
        </Suspense>
      ),
      text: "Student",
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<Loading />}>
          <NotFound />
        </Suspense>
      ),
      text: "NotFound",
    },
  ]);
