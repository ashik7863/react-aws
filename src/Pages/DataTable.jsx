import React from "react";

const TableComponent = ({
  headers,
  data,
  onSort,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key} onClick={() => onSort(header.key)}>
                {header.label}
                <iconify-icon
                  icon={
                    header.sortKey
                      ? header.sortDirection === "ascending"
                        ? "ic:baseline-arrow-upward"
                        : "ic:baseline-arrow-downward"
                      : "ic:baseline-swap-horiz"
                  }
                  className="sort-icon"
                />
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              {headers.map((header) => (
                <td key={header.key}>
                  <span className="car-badge">{item[header.key]}</span>
                </td>
              ))}
              <td>
                <div className="buttn_grop">
                  <button className="action-btn" type="button">
                    <iconify-icon icon="hugeicons:view" />
                  </button>
                  <button className="action-btn">
                    <iconify-icon icon="ph:arrow-circle-right-thin" />
                  </button>
                  {/* Add delete functionality here */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <iconify-icon icon="mdi:chevron-left" />
        </button>
        <span className="page-link active">{currentPage}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>
          <iconify-icon icon="mdi:chevron-right" />
        </button>
      </div>
    </>
  );
};

export default TableComponent;
