import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout, Login } from "./components/index.js";
const Loader = lazy(() => import("./components/Loader/Loader.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const AddPost = lazy(() => import("./pages/AddPost.jsx"));
const AllPosts = lazy(() => import("./pages/AllPosts.jsx"));
const EditPost = lazy(() => import("./pages/EditPost.jsx"));
const Post = lazy(() => import("./pages/Post.jsx"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Suspense fallback={<Loader />}>
              <Signup />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/forget-password",
        element: (
          <AuthLayout authentication={false}>
            <Suspense fallback={<Loader />}>
              <ForgetPassword />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <AuthLayout authentication={false}>
            <Suspense fallback={<Loader />}>
              <ResetPassword />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/your-posts",
        element: (
          <AuthLayout authentication>
            <Suspense fallback={<Loader />}>
              <AllPosts />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <Suspense fallback={<Loader />}>
              <AddPost />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <Suspense fallback={<Loader />}>
              <EditPost />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <AuthLayout authentication>
            <Suspense fallback={<Loader />}>
              <Post />
            </Suspense>
          </AuthLayout>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
