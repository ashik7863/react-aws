import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { clearUserRole } from '../redux/userSlice';


function Sidebar() {
    const userRole = useSelector((state) => state.user.role);
    const navigate=useNavigate();
    function handleLogout(){
        if(userRole=='Super Admin'){
            clearUserRole();
            navigate('/super-admin/login');
        }
    }

    return (
       <>
           <div className="sidebar">
            <div className="sidebar-top">
               {userRole=='Super Admin'?
                <div className="sidebar-content">
                    <h4 className="sidebar-heading">Super Admin</h4>
                    <ul className="list-unstyled p-0 m-0 ul-top">
                        <li>
                            <Link to="./">
                                <iconify-icon icon="radix-icons:dashboard"></iconify-icon>
                                <span>dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/restaurants">
                            <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon>
                                <span>restaurants</span>
                            </Link>
                        </li>
                        <li>
    <Link to="/reports">
        <iconify-icon icon="mdi:chart-bar"></iconify-icon>
        <span>Reports</span>
    </Link>
</li>

                     
                    </ul>

                    
                </div>
:
                <div className="sidebar-content">                    
                <h4 className="sidebar-heading"> Admin</h4>
                    <ul className="list-unstyled p-0 m-0 ul-top">
                        <li>
                            <Link to="./">
                                <iconify-icon icon="radix-icons:dashboard"></iconify-icon>
                                <span>dashboard</span>
                            </Link>
                        </li>
                        <li>
    <Link to="/menu">
        <iconify-icon icon="mdi:book-open-page-variant"></iconify-icon>
        <span>Menu</span>
    </Link>
</li>
<li>
    <Link to="/menu-item">
        <iconify-icon icon="mdi:silverware-fork-knife"></iconify-icon>
        <span>Menu Items</span>
    </Link>
</li>
<li>
    <Link to="/staff">
        <iconify-icon icon="mdi:account-group-outline"></iconify-icon>
        <span>Staff</span>
    </Link>
</li>
<li>
    <Link to="/table">
        <iconify-icon icon="mdi:table-furniture"></iconify-icon>
        <span>Table Management</span>
    </Link>
</li>
<li>
    <Link to="/customer">
        <iconify-icon icon="mdi:account-outline"></iconify-icon>
        <span>Customer</span>
    </Link>
</li>
<li>
    <Link to="/order-list">
        <iconify-icon icon="mdi:clipboard-list-outline"></iconify-icon>
        <span>Order List</span>
    </Link>
</li>

                    </ul>                    
                </div>
}
            </div>
            <div className="sidebar-btm">
                <button className="logout" onClick={handleLogout}>
                    <iconify-icon icon="humbleicons:logout"></iconify-icon>
                    <span>logout</span>
                </button>
            </div>
        </div>
       </>
    );
}

export default Sidebar;
