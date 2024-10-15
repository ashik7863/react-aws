import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuModal from "./MenuModal";
import { FetchMenu, DeleteMenu } from "../../../Services/Menu";
import DeleteComponent from "../../DeleteComponent";
import { toast } from "react-toastify";
import { exportToExcel,exportToPDF } from "../../Utils/Utils";

const Menu = () => {
  const [menuList, setMenuList] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "menu_id",
    direction: "ascending",
  });
  const rst_id = useSelector((state) => state.user.rst_id);

  const fetchMenu = async (id) => {
    try {
      const { data } = await FetchMenu(id);
      setMenuList(data);
      setFilteredMenu(data);
      
    } catch (err) {
      console.error("Failed to fetch restaurants", err);
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
      const response = await DeleteMenu(id);
      if (response.status === 200) {
        toast.success(response.message || "Menu deleted successfully");
        fetchMenu(rst_id);
        return { status: response.status, message: response.message }; 
      } else {
        toast.error(response.message || "Failed to delete Menu");
        return { status: response.status, message: response.message };
      }
    } catch (error) {
      console.error("Failed to delete Menu", error);
      toast.error("Failed to delete Menu");
      return { status: 500, message: "Failed to delete Menu" };
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = menuList.filter(
        (menu) =>
          menu.menu_name.toLowerCase().includes(query.toLowerCase()) ||
          menu.menu_id.toString().includes(query)
      );
      setFilteredMenu(filtered);
    } else {
      setFilteredMenu(menuList);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedMenu = [...filteredMenu].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setFilteredMenu(sortedMenu);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMenu.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);


  const columns = ['menu_id', 'menu_name', 'description']; // Columns to export

  const handleExcelExport = () => {
    exportToExcel(currentItems, columns, 'menus.xlsx');
  };
  const handlePDFExport = () => {
    exportToPDF(columns, currentItems, 'menus.pdf');
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
        row.deleteCell(actionIndex);
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
          <h1>Menu</h1>
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
                <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon>{" "}
                Menu
              </h5>
            </div>
            <div className="col-lg-6">
              <div className="btn_sec txt_right">
                <button
                  type="button"
                  className="btnn"
                  onClick={() => setModalVisible(true)}
                >
                  Add New Menu
                </button>
              </div>
            </div>
          </div>
        </div>

        <MenuModal isVisible={modalVisible} onClose={handleCloseModal} />

        <div className="row g-0">
          <div className="col-12 col-md-12">
            <div className="ongoing_courses_sec">
              <div className="row g-0">
                <div className="dashboard-card" id="table-card">
                  <div className="dashboard-card-heading">
                    <div className="tb-heading">
                      <h5 className="mb-0">
                        <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon>
                        Menu List
                      </h5>
                    </div>
                    <div className="dashboard-card-heading-right"></div>
                  </div>

                  <div className="data-searc-se">
                    <div className="opp-othe">
                      <div className="gorups-btn">
                        <Link to="" className="btns" onClick={handleExcelExport}>
                          <iconify-icon icon="uiw:file-excel"></iconify-icon>
                        </Link>

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
                            value={searchQuery}
                            onChange={handleSearch}
                          />
                          <button type="submit">
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
                            <th onClick={() => handleSort("menu_id")}>
                              Menu ID
                              <iconify-icon
                                icon={
                                  sortConfig.key === "menu_id"
                                    ? sortConfig.direction === "ascending"
                                      ? "ic:baseline-arrow-upward"
                                      : "ic:baseline-arrow-downward"
                                    : "ic:baseline-swap-horiz"
                                }
                                className="sort-icon"
                              />
                            </th>
                            <th onClick={() => handleSort("menu_name")}>
                              Menu
                              <iconify-icon
                                icon={
                                  sortConfig.key === "menu_name"
                                    ? sortConfig.direction === "ascending"
                                      ? "ic:baseline-arrow-upward"
                                      : "ic:baseline-arrow-downward"
                                    : "ic:baseline-swap-horiz"
                                }
                                className="sort-icon"
                              />
                            </th>
                            <th>Details</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentItems.map((restaurant, index) => (
                            <tr key={restaurant.id}>
                              <td>
                                <span>{indexOfFirstItem + index + 1}</span>
                              </td>
                              <td className="">
                                <span className="car-badge">
                                  {restaurant.menu_id}
                                </span>
                              </td>
                              <td className="">
                                <span className="car-badge">
                                  {restaurant.menu_name}
                                </span>
                              </td>
                              <td className="">
                                <span className="car-badge">
                                  {restaurant.description}
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
                                    entityName={restaurant.menu_name}
                                    onDelete={() => handleDelete(restaurant.id)}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {/* Pagination */}
                    <div className="pagination">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`page-link ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <iconify-icon icon="mdi:chevron-left" />
                      </button>

                      {/* Show current page and next page */}
                      {currentPage > 1 && (
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="page-link"
                        >
                          {currentPage - 1}
                        </button>
                      )}

                      <button className={`page-link active`}>
                        {currentPage}
                      </button>

                      {currentPage < totalPages && (
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="page-link"
                        >
                          {currentPage + 1}
                        </button>
                      )}

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className={`page-link ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <iconify-icon icon="mdi:chevron-right" />
                      </button>
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

export default Menu;
