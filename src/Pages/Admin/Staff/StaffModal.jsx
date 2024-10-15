import React, { useEffect, useState } from "react";
import { CreateStaff } from "../../../Services/Staff";
import { FetchTable } from "../../../Services/Table";
import { toast } from "react-toastify";

const StaffModal = ({ isVisible, onClose }) => {
  const rst_id = btoa(localStorage.getItem("rst_id"));
  const [staffData, setStaffData] = useState({
    name: "",
    dob: "",
    mobile: "",
    gender: "",
    email: "",
    address: "",
    role: "",
    salary: "",
    bank: "",
    acc_no: "",
    ifsc: "",
    status: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffData({
      ...staffData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setStaffData({
      ...staffData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedstaffData = {
      ...staffData,
      rst_id: rst_id,
    };

    const formData = new FormData();

    // Ensure proper appending of fields, including the image
    Object.keys(updatedstaffData).forEach((key) => {
      formData.append(key, updatedstaffData[key]);
    });

    try {
      let res = await CreateStaff(formData); // Call the API with form data
      if (res.status == 200) {
        toast.success(res.msg);
        setStaffData({
          name: "",
          dob: "",
          mobile: "",
          gender: "",
          email: "",
          address: "",
          role: "",
          salary: "",
          bank: "",
          acc_no: "",
          ifsc: "",
          status: "",
          image: "",
        });
        onClose(); // Close the modal after submission
      } else {
        toast.error(res.msg);
      }
    } catch (err) {
      toast.error(err);
      setError("Failed to create staff");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`modal fade ${isVisible ? "show" : ""}`}
      id="staffModal"
      tabIndex="-1"
      aria-labelledby="staffModalLabel"
      aria-hidden="true"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="modal-dialog modal-lg">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="staffModalLabel">Add New Staff</h5>
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
    <div className="modal-body">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Personal Info Section */}
          <div className="col-lg-12 mb-3">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white d-flex align-items-center">
                <iconify-icon style={{ fontSize: "20px" }} icon="mdi:account-circle-outline" className="me-2"></iconify-icon>
                <h5 className="mb-0">Personal Info</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  {/* Each field */}
                  <div className="col-lg-4">
                    <div className="input-box">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={staffData.name}
                        onChange={handleInputChange}
                        placeholder="Enter Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-box">
                      <label>DOB</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={staffData.dob}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-box">
                      <label>Mobile</label>
                      <input
                        type="text"
                        className="form-control"
                        name="mobile"
                        value={staffData.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter Mobile"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-box">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={staffData.email}
                        onChange={handleInputChange}
                        placeholder="Enter Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-box">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={staffData.address}
                        onChange={handleInputChange}
                        placeholder="Enter Address"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-box">
                      <label>Role</label>
                      <input
                        type="text"
                        className="form-control"
                        name="role"
                        value={staffData.role}
                        onChange={handleInputChange}
                        placeholder="Enter Role"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-box">
                      <label>Salary</label>
                      <input
                        type="number"
                        className="form-control"
                        name="salary"
                        value={staffData.salary}
                        onChange={handleInputChange}
                        placeholder="Enter Salary"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-box">
                      <label>Gender</label>
                      <select
                        className="form-control"
                        name="gender"
                        value={staffData.gender}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4">
                          <div className="input-box">
                            <label>IMAGE</label>
                            <input
                              type="file"
                              className="form-control"
                              name="image"
                              onChange={handleFileChange}
                              required
                            />
                          </div>
                        </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Info Section */}
          <div className="col-lg-12 mb-3">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white d-flex align-items-center">
                <iconify-icon icon="mdi:bank" className="me-2"></iconify-icon>
                <h5 className="mb-0">Bank Info</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-lg-4">
                    <div className="input-box">
                      <label>Bank Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="bank"
                        value={staffData.bank}
                        onChange={handleInputChange}
                        placeholder="Enter Bank Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-box">
                      <label>Account No</label>
                      <input
                        type="text"
                        className="form-control"
                        name="acc_no"
                        value={staffData.acc_no}
                        onChange={handleInputChange}
                        placeholder="Enter Account Number"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-box">
                      <label>IFSC Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ifsc"
                        value={staffData.ifsc}
                        onChange={handleInputChange}
                        placeholder="Enter IFSC Code"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificates Section */}
          <div className="col-lg-12 mb-3">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white d-flex align-items-center">
                <iconify-icon icon="mdi:file-document-outline" className="me-2"></iconify-icon>
                <h5 className="mb-0">Certificates</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-lg-4">
                    <div className="input-box">
                      <label>Aadhaar Card</label>
                      <input
                        type="file"
                        className="form-control"
                        name="aadhaar"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-box">
                      <label>Voter Card</label>
                      <input
                        type="file"
                        className="form-control"
                        name="voter"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-box">
                      <label>Qualification Certificate</label>
                      <input
                        type="file"
                        className="form-control"
                        name="qualification"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-lg-12 text-center">
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>



    </div>
  );
};

export default StaffModal;
