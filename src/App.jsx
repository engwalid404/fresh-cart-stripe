import { useState } from "react";

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import Profile from "./Components/Profile/Profile";
import { AuthProvider } from "./Components/Context/authContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/Register/ProductDetails/ProductDetails";
import { CartContextProvider } from "./Components/Context/CartContext";
import { Toaster } from "react-hot-toast";
import Cart from "./Components/Cart/Cart";
import Payement from "./Components/Payement/Payement";
import AllOrders from "./Components/AllOrders/AllOrders";
import { Offline } from "react-detect-offline";

function App() {
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        { 
          path: "prodDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "pay",
          element: (
            <ProtectedRoute>
              <Payement />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
    
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "prof",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  let clientQuery = new QueryClient();
  return (
    <>
   <CartContextProvider>
      <AuthProvider>
        <RouterProvider router={myRouter} />
      </AuthProvider>
      </CartContextProvider>
      <Toaster/>
      <Offline>
        <div className="position-fixed top-0 start-0 bg-dark text-white p-3 rounded-3">
        Sorry you are shown offline (surprise!)
          </div></Offline>
    </>
  );
}

export default App;
