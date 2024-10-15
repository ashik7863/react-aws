import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import TableModal from './TableModal';
import { FetchTable,DeleteTable } from '../../../Services/Table';
import { toast } from 'react-toastify';
import DeleteComponent from "../../DeleteComponent";

const Table = () => {
  const [menuList, setMenuList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const rst_id = btoa(localStorage.getItem("rst_id"));

  // Fetch restaurant data from API
  const fetchMenu = async (id) => {
    try {
      const { data } = await FetchTable(id);
      setMenuList(data);
      console.log(data)
    } catch (err) {
      console.error('Failed to fetch table', err);
    }
  };

  useEffect(() => {
    fetchMenu(rst_id);
  }, []);

  // Handle modal close
  const handleCloseModal = () => {
    setModalVisible(false);
    fetchMenu(rst_id);
  };

  const handleDelete = async (id) => {
    try {
      
      const response = await DeleteTable(id);
      if (response.status === 200) {
        toast.success(response.message || 'Table deleted successfully');
        fetchMenu(rst_id);
        return { status: response.status, message: response.message }; // Return response
      } else {
        toast.error(response.message || 'Failed to delete Table');
        return { status: response.status, message: response.message }; // Return response
      }
    } catch (error) {
      console.error("Failed to delete Table", error);
      toast.error('Failed to delete Table');
      return { status: 500, message: 'Failed to delete Table' }; // Return error response
    }
  };

  return (
    <>
      <div className="dashboard-right">
        <div className="nav_heading">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <h5 className="mb-0">
                <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon> Table
              </h5>
            </div>
            <div className="col-lg-6">
              <div className="btn_sec txt_right">
                <button
                  type="button"
                  className="btnn"
                  onClick={() => setModalVisible(true)}
                >
                  Add New Table
                </button>
              </div>
            </div>
          </div>
        </div>

        <TableModal isVisible={modalVisible} onClose={handleCloseModal} />

        <div className="row g-0">
          <div className="col-12 col-md-12">
            <div className="ongoing_courses_sec">
              <div className="row g-0">
                <div className="dashboard-card" id="table-card">
                <div class="dashboard-card-heading">
                                        <div className="tb-heading">
                                            <h5 class="mb-0"> <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon>Table List</h5>
                                        </div>
                                        <div class="dashboard-card-heading-right">

                                        </div>
                                    </div>
                <div className="data-searc-se">
                    <div className="opp-othe">
                      <div className="gorups-btn">
                        {/* <Link to="" className="btns">
                          <iconify-icon icon="cil:copy"></iconify-icon>
                        </Link> */}
                        <Link to="" className="btns">
                          <iconify-icon icon="uiw:file-excel"></iconify-icon>
                        </Link>
                        {/* <Link to="" className="btns">
                          <iconify-icon icon="uil:file-alt"></iconify-icon>
                        </Link> */}
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
                            <th>Table ID</th>                         
                            <th>Table No.</th>
                            <th>Seat</th>
                            <th>Staff</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {menuList?.map((table, index) => (
                            <tr key={table.id}>
                              <td><span>{index + 1}</span></td>
                              <td className=""><span className="car-badge">{table.tbl_id}</span></td>
                              <td className=""><span className="car-badge">{table.tbl_no}</span></td>
                              <td className=""><span className="car-badge">{table.seat}</span></td>
                              <td className=""><span className="car-badge">{table.staff_name}</span></td>
                              <td className="">
                              <span
                                className={`badge ${
                                  table.status === "Available" ? "bg-success" : "bg-danger"
                                }`}
                              >
                                {table.status}
                              </span>
                              </td>
                              <td className="">
                                <div className="buttn_grop">
                                  <button className="action-btn" type="button">
                                    <iconify-icon icon="hugeicons:view" />
                                  </button>
                                  <button className="action-btn">
                                    <iconify-icon icon="ph:arrow-circle-right-thin" />
                                  </button>
                                  <DeleteComponent
                                    entityName={'Table'}
                                    onDelete={() => handleDelete(table.id)}
                                  />
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

export default Table;
