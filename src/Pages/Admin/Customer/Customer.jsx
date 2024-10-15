import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { FetchCustomer } from '../../../Services/Customer';

const Customer = () => {
  const [menuList, setMenuList] = useState([]);

  const rst_id = btoa(localStorage.getItem("rst_id"));

  // Fetch restaurant data from API
  const fetchCustomer = async (id) => {
    try {
      const { data } = await FetchCustomer(id);
      setMenuList(data);
      console.log(data)
    } catch (err) {
      console.error('Failed to fetch customer', err);
    }
  };

  useEffect(() => {
    fetchCustomer(rst_id);
  }, []);


  return (
    <>
      <div className="dashboard-right">
        <div className="nav_heading">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <h5 className="mb-0">
                <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon> Customer
              </h5>
            </div>            
          </div>
        </div>       

        <div className="row g-0">
          <div className="col-12 col-md-12">
            <div className="ongoing_courses_sec">
              <div className="row g-0">
                <div className="dashboard-card">
                <div className="data-searc-se">
                    <div className="opp-othe">
                      <div className="gorups-btn">
                        <Link to="" className="btns">
                          <iconify-icon icon="cil:copy"></iconify-icon>
                        </Link>
                        <Link to="" className="btns">
                          <iconify-icon icon="uiw:file-excel"></iconify-icon>
                        </Link>
                        <Link to="" className="btns">
                          <iconify-icon icon="uil:file-alt"></iconify-icon>
                        </Link>
                        <Link to="" className="btns">
                          <iconify-icon icon="formkit:filepdf"></iconify-icon>
                        </Link>
                        <Link to="" className="btns">
                          <iconify-icon icon="cil:print"></iconify-icon>
                        </Link>
                      </div>
                    </div>
                    <div className="serac-box">
                      <div className="search">
                        <form action="">
                          <input
                            type="text"
                            placeholder="Search Here"
                            fdprocessedid="txryov"
                          />
                          <button type="submit" fdprocessedid="eeeawr">
                            <iconify-icon icon="ic:baseline-search" />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-card-info">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>No.</th>                            
                            <th>ID</th>
                            <th>Name</th>
                            <th>Mobile</th>                             
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {menuList?.map((staff, index) => (
                            <tr key={staff.id}>
                              <td><span>{index + 1}</span></td>
                              <td className=""><span className="car-badge">{staff.emp_id}</span></td>
                              <td className=""><span className="car-badge">{staff.name}</span></td>
                              <td className=""><span className="car-badge">{staff.mobile}</span></td>
                              
                              <td className="">
                                <div className="buttn_grop">
                                  <button className="action-btn" type="button">
                                    <iconify-icon icon="hugeicons:view" />
                                  </button>
                                  <button className="action-btn">
                                    <iconify-icon icon="ph:arrow-circle-right-thin" />
                                  </button>                                  
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>

                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
