import React, { useState,useEffect } from 'react';
import { CreateTable } from '../../../Services/Table';
import { FetchStaff } from '../../../Services/Staff';  
import { toast } from "react-toastify";

const TableModal = ({ isVisible, onClose }) => {
  const [menuData, setMenuData] = useState({
    staff: '', 
    tbl_no: '', 
    seat: '',
    status: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const rst_id = btoa(localStorage.getItem("rst_id"));
  const[staff,setStaff]=useState();
  const fetchStaff = async (id) => {
    try {
      const { data } = await FetchStaff(id);
      setStaff(data);
      console.log(data)
    } catch (err) {
      console.error('Failed to fetch staff', err);
    }
  };
  useEffect(()=>{
    fetchStaff(rst_id);
  },[])

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuData({
      ...menuData,
      [name]: value,
    });
  };
  console.log(rst_id)
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create a new FormData object
    const formData = new FormData();
      
      const updatedMenuData = {
        ...menuData,
        rst_id: atob(rst_id),
      };
      

    // Append all fields from menuData to the FormData object
    Object.keys(updatedMenuData).forEach((key) => {
        formData.append(key, updatedMenuData[key]);
    });

    try {
        let res = await CreateTable(updatedMenuData); // Call the API with formData
        if (res.status === 200) {
          toast.success(res.msg);
          setMenuData({
              tbl_no: '',
              seat: '',
              status: '',
              staff:'' 
          });
          fetchStaff(rst_id);
          onClose(); // Close the modal after submission
        } else {
          toast.error(res.msg);
        }
    } catch (err) {
        console.log(err);
        setError('Failed to create table');
    } finally {
        setLoading(false);
    }
};


  return (
    <div
      className={`modal fade ${isVisible ? 'show' : ''}`}
      id="tableModal"
      tabIndex="-1"
      aria-labelledby="tableModalLabel"
      aria-hidden="true"
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="tableModalLabel">
              Add New Table
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="contact-form aos-init" data-aos="fade-up" data-aos-duration="1000">
              <div className="row g-3">
              <div className="col-lg-12 input-box">
                          <label>SELECT STAFF</label>
                          <select
                            name="staff"
                            value={menuData.staff}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                          >
                            <option value="">---SELECT STAFF---</option>
                            {staff?.map((emp) => (
                              <option key={emp.id} value={emp.emp_id}>
                                {emp.name} [{emp.emp_id}]
                              </option>
                            ))}
                          </select>
                        </div>
                {['tbl_no', 'seat'].map((field) => (
                  <div key={field} className="col-lg-12">
                    <div className="input-box">
                      <label>{field.replace('_', ' ').toUpperCase()}</label>
                      <input
                        type="text"
                        className="form-control"
                        name={field}
                        value={menuData[field]}
                        onChange={handleInputChange}
                        placeholder={`Enter ${field.replace('_', ' ')}`}
                        required
                      />
                    </div>
                  </div>
                ))}

                <div className="col-lg-12">
                  <div className="input-box">
                    <label>STATUS</label>
                    <select
                      name="status"
                      className="form-control"
                      value={menuData.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Available">Available</option>                 
                      <option value="Reserved">Reserved</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-12 text-center">
                  <button type="submit" className="btnn" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>

                {error && (
                  <div className="col-lg-12 text-center">
                    <p style={{ color: 'red' }}>{error}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableModal;
