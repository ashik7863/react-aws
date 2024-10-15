import React from "react";
import { Link } from "react-router-dom";

function SidebarSuper() {
  console.log('SidebarSuper');
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-top">
   
            <div className="sidebar-content">
              <h4 className="sidebar-heading">Super Admin</h4>
              <ul className="list-unstyled p-0 m-0 ul-top">
                <li>
                  <Link to="/super-admin">
                    <iconify-icon icon="radix-icons:dashboard"></iconify-icon>
                    <span>dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/super-admin/restaurants">
                    <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon>
                    <span>restaurants</span>
                  </Link>
                </li>
                <li>
                  <Link to="/super-admin/reports">
                    <iconify-icon icon="mdi:chart-bar"></iconify-icon>
                    <span>Reports</span>
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

export default SidebarSuper;
