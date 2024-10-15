import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FetchTableByStaff } from "../../Services/Table";
import { toast } from "react-toastify";

const TableList = () => {
  const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
  const [menuList, setMenuList] = useState([]);
  const staff_id = "STF824466739";

  const fetchTable = async (id) => {
    try {
      const { data } = await FetchTableByStaff(id);
      setMenuList(data);
      console.log(data);
    } catch (err) {
      console.error("Failed to fetch table", err);
    }
  };

  useEffect(() => {
    fetchTable(staff_id);
  }, []);


  const reservedItems = [
    {
        id: 7,
        rst_id: "RS429643379",
        menu_id: "MN671876438",
        item_id: "MNI175623367",
        name: "Stuffed Mushrooms",
        image: "https://gramentheme.com/html/fresheat/assets/img/dishes/dishes1_2.png",
        description: "Start your meal with a delightful selection of small bites and savory starters.",
        qty: 0,
        price: 580,
        menu_name: "Appetizers",
        quantity: 1
    },
    {
        id: 8,
        rst_id: "RS429643379",
        menu_id: "MN682940856",
        item_id: "MNI667260918",
        name: "Creamy Tomato Basil Soup",
        image: "https://gramentheme.com/html/fresheat/assets/img/dishes/dishes1_2.png",
        description: "Fresh, flavorful, and healthy options to kick off your dining experience.",
        qty: 0,
        price: 630,
        menu_name: "Soups & Salads",
        quantity: 2
    }
];

const handleShowDetails = () => {
  setModalData(reservedItems);
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
  setModalData(null);
};

  return (
    <>
      <div className="dashboard-right">
        <div className="nav_heading">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <h5 className="mb-0">
                <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon>{" "}
                Table
              </h5>
            </div>
          </div>
        </div>

        <div className="row g-0">
          <div className="col-12 col-md-12">
            <div className="ongoing_courses_sec">
              <div className="row g-0">
                <div className="dashboard-card" id="table-card">
                  <div class="dashboard-card-heading">
                    <div className="tb-heading">
                      <h5 class="mb-0">
                        {" "}
                        <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon>
                        Table List
                      </h5>
                    </div>
                    <div class="dashboard-card-heading-right"></div>
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

                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {menuList?.map((table, index) => (
                            <tr key={table.id}>
                              <td>
                                <span>{index + 1}</span>
                              </td>
                              <td className="">
                                <span className="car-badge">
                                  {table.tbl_id}
                                </span>
                              </td>
                              <td className="">
                                <span className="car-badge">
                                  {table.tbl_no}
                                </span>
                              </td>
                              <td className="">
                                <span className="car-badge">{table.seat}</span>
                              </td>

                              <td className="">
                                <span
                                  className={`badge ${
                                    table.status === "Available"
                                      ? "bg-success"
                                      : "bg-danger"
                                  }`}
                                >
                                  {table.status}
                                </span>
                              </td>
                              <td className="">
                                {table.status === "Reserved" && (
                                  <button
                                    className="btn btn-info blinking-button"
                                    onClick={() => handleShowDetails()}
                                  >
                                    View
                                  </button>
                                )}
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

{/* Modal for displaying item details */}
<div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-hidden={!showModal}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Item Details</h5>
                            <button type="button" className="close" onClick={handleCloseModal}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {modalData && modalData.map(item => (
                                    <div className="col-md-6 mb-4" key={item.id}>
                                        <div className="card item-card">
                                            <img src={item.image} alt={item.name} className="card-img-top" />
                                            <div className="card-body text-center">
                                                <h5 className="card-title">{item.name}</h5>
                                                <p className="card-text">Quantity: <strong>{item.quantity}</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>


    </>
  );
};

export default TableList;
