import React, { useEffect, useState } from "react"; // Import useState
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter,useLocation } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserRole } from "./redux/userSlice";
import Routing from "./Routes/Routing";

// Import shared modules for each role
import NavbarSuper from "./Pages/SuperAdmin/ShareModule/NavbarSuper";
import SidebarSuper from "./Pages/SuperAdmin/ShareModule/SidebarSuper";
import NavbarAdmin from "./Pages/Admin/ShareModule/NavbarAdmin";
import SidebarAdmin from "./Pages/Admin/ShareModule/SidebarAdmin";
import SidebarStaff from "./Pages/StaffPanel/SidebarStaff";
import Footer from "./ShareModule/Footer";
import Loader from "./ShareModule/Loader";

const Layout = () => {
  const userRole = useSelector((state) => state.user.role);
  const location = useLocation();

  // Define routes where layout is not required
  const noLayoutRoutes = ["/", "/admin/login", "/super-admin/login", "/register", "/user-menu", "/user-login"];

  const shouldRenderLayout = !noLayoutRoutes.includes(location.pathname);

  // Component mappings for Navbar and Sidebar based on userRole
  const layoutComponents = {
    "Super Admin": { Navbar: NavbarSuper, Sidebar: SidebarSuper },
    "Admin": { Navbar: NavbarAdmin, Sidebar: SidebarAdmin },
    "Staff": { Navbar: NavbarAdmin, Sidebar: SidebarStaff },
  };

  const { Navbar, Sidebar } = layoutComponents[userRole] || {};

  return (
    <>
      {shouldRenderLayout && Navbar && <Navbar />}
      {shouldRenderLayout && Sidebar && <Sidebar />}
      <Routing />
      {shouldRenderLayout && <Footer />}
    </>
  );
};

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const rst_id = localStorage.getItem("rst_id");
    if (storedRole) {
      dispatch(setUserRole({ role: storedRole, rst_id: rst_id }));
    }
    // Set loading to false after checking local storage
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <Loader />; // Show loader while loading
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Layout />
    </BrowserRouter>
  );
}

export default App;
