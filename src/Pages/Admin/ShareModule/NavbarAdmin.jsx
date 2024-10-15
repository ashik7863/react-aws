import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserRole } from "../../../redux/userSlice";

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUserRole());
    localStorage.removeItem('role');
    localStorage.removeItem('rst_id');
    navigate("/admin/login");
  };

  return (
    <>
      <div className="top_ber">
        <div className="logo">
          <a href="./" className="logo-sm">
            <img src="assets/images/logo.png" alt="" />
          </a>
        </div>
        <div className="dashboard-left-header">
          <div className="bars">
            <iconify-icon icon="prime:bars"></iconify-icon>
          </div>
          <p className="mb-0">Welcome To RMS</p>
        </div>
        <div className="dashboard-right-header">
          <div className="search">
            <form action="">
              <input type="text" placeholder="Search Here" />
              <button type="submit">
                <iconify-icon icon="ic:baseline-search"></iconify-icon>
              </button>
            </form>
          </div>
          <div className="notification">
            <iconify-icon icon="ci:notification"></iconify-icon>
          </div>
          <div className="user_con">
            <ul className="list-unstyled dropdown">
              <li>
                <a href="">
                  <img src="../assets/images/user.jpg" alt="" />
                  <iconify-icon
                    icon="formkit:down"
                    className="down"
                    style={{ color: "white" }}
                  ></iconify-icon>
                </a>
                <ul className="list-unstyled sub_dropdown">
                  <li>
                    <a href="">
                      <iconify-icon icon="iconamoon:profile-thin"></iconify-icon>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="" onClick={handleLogout}>
                      <iconify-icon icon="solar:logout-outline"></iconify-icon>
                      Log Out
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarAdmin;
