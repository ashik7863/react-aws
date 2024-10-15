import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import MenuItemModal from './MenuItemModal';
import { FetchMenuItem,DeleteMenuItem} from '../../../Services/MenuItem';
import DeleteComponent from "../../DeleteComponent";
import { toast } from 'react-toastify';
import { exportToExcel,exportToPDF } from "../../Utils/Utils";

const MenuItem = () => {
  const [menuList, setMenuList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const rst_id = btoa(localStorage.getItem("rst_id"));

  const fetchMenu = async (id) => {
    try {
      const { data } = await FetchMenuItem(id);
      setMenuList(data);
      console.log(data)
    } catch (err) {
      console.error('Failed to fetch restaurants', err);
    }
  };

  useEffect(() => {
    fetchMenu(rst_id);
  }, []);

  const handleCloseModal = () => {
    setModalVisible(false);
    fetchMenu(rst_id);
  };

  const handleDelete = async (id) => {
    try {
      
      const response = await DeleteMenuItem(id);
      if (response.status === 200) {
        toast.success(response.message || 'Menu Item deleted successfully');
        fetchMenu(rst_id);
        return { status: response.status, message: response.message };
      } else {
        toast.error(response.message || 'Failed to delete Menu Item');
        return { status: response.status, message: response.message };
      }
    } catch (error) {
      console.error("Failed to delete Menu Item", error);
      toast.error('Failed to delete Menu Item');
      return { status: 500, message: 'Failed to delete Menu Item' };
    }
  };

  const columns = ['menu_name','menu_id', 'name', 'item_type']; // Columns to export

  const handleExcelExport = () => {
    exportToExcel(menuList, columns, 'menuItem.xlsx');
  };
  const handlePDFExport = () => {
    exportToPDF(columns, menuList, 'menuItem.pdf');
  };


  const printTable = () => {
    // Clone the table to avoid modifying the original one
    const tableClone = document.querySelector('.table').cloneNode(true);
  
    // Remove the Action column from the cloned table
    const actionIndex = Array.from(tableClone.querySelectorAll('th')).findIndex(
      th => th.textContent === 'Action'
    );
    
  
    tableClone.querySelectorAll('tr').forEach(row => {
      if (actionIndex !== -1) {
        row.deleteCell(actionIndex); // Remove the cell at the Action column index
      }
    });
  
    // Create a new window and write the modified content with a heading
    const newWindow = window.open('', '', 'width=800,height=600');
    newWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            h1 {
              text-align: center;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: auto;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h1>Menu Item</h1>
          ${tableClone.outerHTML}
        </body>
      </html>
    `);
  
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <>
      <div className="dashboard-right">
        <div className="nav_heading">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <h5 className="mb-0">
                <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon> Menu Item
              </h5>
            </div>
            <div className="col-lg-6">
              <div className="btn_sec txt_right">
                <button
                  type="button"
                  className="btnn"
                  onClick={() => setModalVisible(true)}
                >
                  Add Menu Item
                </button>
              </div>
            </div>
          </div>
        </div>

        <MenuItemModal isVisible={modalVisible} onClose={handleCloseModal} />

        <div className="row g-0">
          <div className="col-12 col-md-12">
            <div className="ongoing_courses_sec">
              <div className="row g-0">
                <div className="dashboard-card" id="table-card">
                <div class="dashboard-card-heading">
                    <div className="tb-heading">
                        <h5 class="mb-0"> <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon>Item List</h5>
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
                        <Link to="" className="btns" onClick={handleExcelExport}>
                          <iconify-icon icon="uiw:file-excel"></iconify-icon>
                        </Link>
                        {/* <Link to="" className="btns">
                          <iconify-icon icon="uil:file-alt"></iconify-icon>
                        </Link> */}
                        <Link to="" className="btns" onClick={handlePDFExport}>
                          <iconify-icon icon="formkit:filepdf"></iconify-icon>
                        </Link>
                        <Link to="" className="btns" onClick={printTable}>
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
                            <th>Menu</th>
                            <th>Item ID</th>
                            <th>Item</th>
                            <th>Type</th>
                            <th>Image</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {menuList?.map((restaurant, index) => (
                            <tr key={restaurant.id}>
                              <td><span>{index + 1}</span></td>
                              <td className=""><span className="car-badge">{restaurant.menu_name}</span></td>
                              <td className=""><span className="car-badge">{restaurant.item_id}</span></td>
                              <td className=""><span className="car-badge">{restaurant.name}</span></td>
                              <td className=""><span className="car-badge">{restaurant.item_type}</span></td>
                              <td className="">
                              <img src={`https://localhost:4500/uploads/${restaurant.image}`} alt="Restaurant" />
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
                                    entityName={restaurant.name}
                                    onDelete={() => handleDelete(restaurant.id)}
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

export default MenuItem;
