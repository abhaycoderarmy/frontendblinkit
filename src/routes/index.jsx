import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// Public Pages
import Home from "../pages/Home.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import VerifyOTP from "../pages/VerifyOTP.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import UserMenuMobile from "../pages/UserMenuMobile.jsx";
import ProductDisplayPage from "../pages/ProductDisplayPage.jsx";
import CartMobile from "../pages/CartMobile.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import Success from "../pages/Success.jsx";
import Cancel from "../pages/Cancel.jsx";

// Dashboard and Protected Pages
import Dashboard from "../layout/Dashboard.jsx";
import Profile from "../pages/Profile.jsx";
import MyOrder from "../pages/MyOrder.jsx";
import Address from "../pages/Address.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";
import SubCategoryPage from "../pages/SubCategoryPage.jsx";
import UploadProduct from "../pages/UploadProduct.jsx";
import ProductAdmin from "../pages/ProductAdmin.jsx";
import Allusers from "../pages/Allusers.jsx";
import AdminPermission from "../layout/AdminPermission.jsx";

// Product List by Category/SubCategory
import ProductListPage from "../pages/ProductListPage.jsx";

const dashboardChildren = [
  { path: "profile", element: <Profile /> },
  { path: "myorders", element: <MyOrder /> },
  { path: "address", element: <Address /> },
  { path: "category", element: <AdminPermission><CategoryPage /></AdminPermission> },
  { path: "subcategory", element: <AdminPermission><SubCategoryPage /></AdminPermission> },
  { path: "upload-product", element: <AdminPermission><UploadProduct /></AdminPermission> },
  { path: "product", element: <AdminPermission><ProductAdmin /></AdminPermission> },
  { path: "getAllUsers", element: <AdminPermission><Allusers /></AdminPermission> },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <SearchPage /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verify-otp", element: <VerifyOTP /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "userMenuMobile", element: <UserMenuMobile /> },
      { path: "product/:product", element: <ProductDisplayPage /> },
      { path: "cart", element: <CartMobile /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "success", element: <Success /> },
      { path: "cancel", element: <Cancel /> },

      // Dashboard
      {
        path: "dashboard",
        element: <Dashboard />,
        children: dashboardChildren,
      },

      // Dynamic category/subcategory route
      {
        path: ":category",
        children: [
          {
            path: ":subCategory",
            element: <ProductListPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
