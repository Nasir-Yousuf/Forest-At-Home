import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./ui/AppLayout.jsx";
import Error from "./ui/Error.jsx";

import Home from "./ui/Home.jsx";
import Cart from "./features/cart/Cart.jsx";
import Plants from "./features/plants/Plants.jsx";
import Login from "./features/login/Login.jsx";
import RegistrationForm from "./features/registration/Registration.jsx";
import OrderPage from "./features/order/Order.jsx";
import AdminDashboard from "./features/admin/AdminDashboard.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/plants",
        element: <Plants />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order",
        element: <OrderPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <RegistrationForm />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
