import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout/AppLayout";
import Home from "./ui/Home/Home";
import Error from "./ui/Error/Error";
import AuthContextProvider from "./context/AuthContext";
import Login from "./auth/Login/Login";
import Register from "./auth/Register/Register";
import BookDetails from "./components/BookDetails/BookDetails";
import Favorites from "./components/Favorites/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: (
      <AuthContextProvider>
        <AppLayout />
      </AuthContextProvider>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/book/:id",
        element: (
          <ProtectedRoute>
            <BookDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/favorites",
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
