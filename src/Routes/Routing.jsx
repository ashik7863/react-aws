import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// Import your components/pages
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPage";
import Restaurants from "../Pages/SuperAdmin/Restaurant/Restaurants";
import Menu from "../Pages/Admin/Menu/Menu";
import MenuItem from "../Pages/Admin/MenuItem/MenuItem";
import Staff from "../Pages/Admin/Staff/Staff";
import Table from "../Pages/Admin/Table/Table";
import Customer from "../Pages/Admin/Customer/Customer";
import OrderList from "../Pages/Admin/Order/OrderList";
import AdminDashboard from "../Pages/Admin/Dashboard/AdminDashboard";
import ForgotPassword from "../Pages/Login/ForgotPassword";
import OtpVerify from "../Pages/Login/OtpVerify";
import ResetPassword from "../Pages/Login/ResetPassword";
import UserHome from "../Pages/Customer/UserHome";
import UserLogin from "../Pages/Customer/UserLogin";

// Staff Table Route
import TableList from "../Pages/StaffPanel/TableList";
import DashboardSuper from "../Pages/SuperAdmin/Dashboard/DashboardSuper";
import SuperAdminLogin from "../Pages/SuperAdmin/Login/SuperAdminLogin";
import AdminLogin from "../Pages/Admin/Login/AdminLogin";
import StaffDashboard from "../Pages/StaffPanel/StaffDashboard";
import StaffLogin from "../Pages/StaffPanel/StaffLogin";
import OrderHistory from "../Pages/Customer/OrderHistory";

// Super Admin Routes
const superAdminRoutes = [
  { path: "/super-admin/restaurants", element: <Restaurants />, protected: true },
  { path: "/super-admin", element: <DashboardSuper />, protected: false },
];

// Admin Routes
const adminRoutes = [
  { path: "/admin", element: <AdminDashboard />, protected: true },
  { path: "/admin/menu", element: <Menu />, protected: true },
  { path: "/admin/menu-item", element: <MenuItem />, protected: true },
  { path: "/admin/staff", element: <Staff />, protected: true },
  { path: "/admin/table", element: <Table />, protected: true },
  { path: "/admin/order-list", element: <OrderList />, protected: true },
];

// Staff Routes
const staffRoutes = [
  { path: "/staff", element: <StaffDashboard />, protected: true },
  { path: "/staff/table", element: <TableList />, protected: true },
];

// Customer Routes
const customerRoutes = [
  { path: "/user", element: <UserHome />, protected: false },
  { path: "/user/order-history", element: <OrderHistory />, protected: false },
];

// Common Routes (like Login, Forgot Password, etc.)
const commonRoutes = [
  { path: "/", element: <HomePage />, protected: false },
  { path: "/staff/login", element: <StaffLogin />, protected: false },
  { path: "/admin/login", element: <AdminLogin />, protected: false },
  { path: "/forgot-password", element: <ForgotPassword />, protected: false },
  { path: "/otp-verify/:id", element: <OtpVerify />, protected: false },
  { path: "/reset-password/:id", element: <ResetPassword />, protected: false },
  { path: "/super-admin/login", element: <SuperAdminLogin />, protected: false },
  { path: "/user/login/:rst_id/:tbl_id", element: <UserLogin />, protected: false },
  { path: "*", element: <ErrorPage />, protected: false },
];

const Routing = () => {
  const userRole = useSelector((state) => state.user.role);

  // Determine the routes to render based on the user's role
  const roleBasedRoutes = {
    'Super Admin': superAdminRoutes,
    'Admin': adminRoutes,
    'Staff': staffRoutes,
    'Customer': customerRoutes,
  };

  const routesToRender = [
    ...commonRoutes,
    ...(roleBasedRoutes[userRole] || []),
  ];

  return (
    <Routes>
      {routesToRender.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Routing;
