// utils.js
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Excel Export Utility
export const exportToExcel = (data, columns, fileName = 'data.xlsx') => {
    // Filter the data based on specified columns
    const filteredData = data.map(item =>
      columns.reduce((obj, key) => {
        obj[key] = item[key]; // Include only specified keys
        return obj;
      }, {})
    );
  
    const worksheet = XLSX.utils.json_to_sheet(filteredData); // Create worksheet
    const workbook = XLSX.utils.book_new(); // Create workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); // Add sheet
    XLSX.writeFile(workbook, fileName); // Export to Excel
  };

// PDF Export Utility
export const exportToPDF = (columns, data, fileName = 'data.pdf') => {
  const doc = new jsPDF();
  const tableData = data.map((item) =>
    columns.map((col) => item[col])
  );
  doc.autoTable({
    head: [columns],
    body: tableData,
  });
  doc.save(fileName);
};
