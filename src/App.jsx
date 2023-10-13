import { useState, lazy, Suspense, useEffect, useRef, useContext } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
//LOADERS
import { perfumePageLoaders } from "./pages/Perfume";
import { showMoreUsersAction, userLoader } from "./pages/User";
import { perfumesByNoteLoader } from "./pages/Notes";
import { perfumesByGenderLoader } from "./pages/Gender";
import { perfumesByBrandLoader } from "./pages/Brand";
import { limitedNumberOfPerfumesLoader } from "./pages/Perfumes";
// ACTIONS
import { perfumePageActions } from "./pages/Perfume";
import { showMoreAction } from "./pages/Perfumes";
// LAYOUT
import Layout from "./components/Layout";
//PAGES - LAZY LOADING
const Home = lazy(() => import("./pages/Home"));
const Perfume = lazy(() => import("./pages/Perfume"));
const Search = lazy(() => import("./pages/Search"));
const Gender = lazy(() => import("./pages/Gender"));
const Brand = lazy(() => import("./pages/Brand"));
const User = lazy(() => import("./pages/User"));
const Delivery = lazy(() => import("./pages/Delivery"));
const Perfumes = lazy(() => import("./pages/Perfumes"));
const Notes = lazy(() => import("./pages/Notes"));
const Loading = lazy(() => import("./components/Loading"));

// Create Routes
const router = createBrowserRouter([
  {
    element: <Layout />,
    id: "root",
    // Token Validation
    loader: checkTokenLoader,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
        //
        loader: () =>
          import("./pages/Home").then((module) => module.homePageLoaders()),
        action: showMoreAction,
      },
      {
        path: "/perfumes",
        element: (
          <Suspense fallback={<Loading />}>
            <Perfumes />
          </Suspense>
        ),
        loader: limitedNumberOfPerfumesLoader,
        action: showMoreAction,
      },
      {
        path: "/perfumes/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Perfume />
          </Suspense>
        ),
        loader: perfumePageLoaders,
        action: perfumePageActions,
      },

      {
        path: "/brand/:brand",
        element: (
          <Suspense fallback={<Loading />}>
            <Brand />
          </Suspense>
        ),
        loader: perfumesByBrandLoader,
        action: showMoreAction,
      },
      {
        path: "/gender/:gender",
        element: (
          <Suspense fallback={<Loading />}>
            <Gender />
          </Suspense>
        ),
        loader: perfumesByGenderLoader,
        action: showMoreAction,
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<Loading />}>
            <Search />
          </Suspense>
        ),
        action: showMoreAction,
      },
      {
        path: "/:username",
        element: (
          <Suspense fallback={<Loading />}>
            <User />
          </Suspense>
        ),
        loader: userLoader,
        action: showMoreUsersAction,
      },
      {
        path: "/notes/:note",
        element: (
          <Suspense fallback={<Loading />}>
            <Notes />
          </Suspense>
        ),
        loader: perfumesByNoteLoader,
        action: showMoreAction,
      },
      {
        path: "/delivery",
        element: (
          <Suspense fallback={<Loading />}>
            <Delivery />
          </Suspense>
        ),
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
// TOKEN Validation
export async function checkTokenLoader() {
  const token = localStorage.getItem("token");

  if (token === null) {
    return false;
  } else {
    return true;
  }
}
