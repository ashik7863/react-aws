import React from "react";
import { Link } from "react-router-dom";

function SidebarStaff() {

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-top">
   
            <div className="sidebar-content">
              <h4 className="sidebar-heading">Staff</h4>
              <ul className="list-unstyled p-0 m-0 ul-top">
                <li>
                  <Link to="/staff">
                    <iconify-icon icon="radix-icons:dashboard"></iconify-icon>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/staff/table">
                    <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon>
                    <span>Table</span>
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

export default SidebarStaff;
