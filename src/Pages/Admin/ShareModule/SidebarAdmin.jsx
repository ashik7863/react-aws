import React from "react";
import { Link } from "react-router-dom";

function SidebarAdmin() {

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-top">
   
            <div className="sidebar-content">
              <h4 className="sidebar-heading">Admin</h4>
              <ul className="list-unstyled p-0 m-0 ul-top">
                <li>
                  <Link to="/admin">
                    <iconify-icon icon="radix-icons:dashboard"></iconify-icon>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/menu">
                    <iconify-icon icon="mdi:book-open-page-variant"></iconify-icon>
                    <span>Menu</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/menu-item">
                    <iconify-icon icon="mdi:silverware-fork-knife"></iconify-icon>
                    <span>Menu Items</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/staff">
                    <iconify-icon icon="mdi:account-group-outline"></iconify-icon>
                    <span>Staff</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/table">
                    <iconify-icon icon="mdi:table-furniture"></iconify-icon>
                    <span>Table Management</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/customer">
                    <iconify-icon icon="mdi:account-outline"></iconify-icon>
                    <span>Customer</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/order-list">
                    <iconify-icon icon="mdi:clipboard-list-outline"></iconify-icon>
                    <span>Order List</span>
                  </Link>
                </li>
              </ul>
            </div>
          
        </div>
        <div className="sidebar-btm">
          <button className="logout">
            <iconify-icon icon="humbleicons:logout"></iconify-icon>
            <span>logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default SidebarAdmin;
