import React, { useState } from "react";
import { CreateMenu } from "../../../Services/Menu";
import { toast } from "react-toastify";

const MenuModal = ({ isVisible, onClose }) => {
  const [menuData, setMenuData] = useState({
    rst_id: "",
    menu_name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuData({
      ...menuData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const rst_id = localStorage.getItem("rst_id");
      
      const updatedMenuData = {
        ...menuData,
        rst_id: rst_id,
      };
  
      let res = await CreateMenu(updatedMenuData);
      if (res.status === 500) {
        toast.error(res.msg);
      } else {
        toast.success(res.msg);
        setMenuData({
          rst_id: '',
          menu_name: '',
          description: '',
        });
        onClose();
      }
    } catch (err) {
      console.log(err);
      setError("Failed to create menu");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div
      className={`modal fade ${isVisible ? "show" : ""}`}
      id="menuModal"
      tabIndex="-1"
      aria-labelledby="menuModalLabel"
      aria-hidden="true"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="menuModalLabel">
              Add New Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={handleSubmit}
              className="contact-form aos-init"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="row g-3">
                {["menu_name", "description"].map((field) => (
                  <div key={field} className="col-lg-12">
                    <div className="input-box">
                      <label>{field.replace("_", " ").toUpperCase()}</label>
                      {field === "description" ? (
                        <textarea
                          className="form-control"
                          name={field}
                          value={menuData[field]}
                          onChange={handleInputChange}
                          placeholder={`Enter ${field.replace("_", " ")}`}
                          required
                        />
                      ) : (
                        <input
                          type={field === "rst_id" ? "text" : "text"}
                          className="form-control"
                          name={field}
                          value={menuData[field]}
                          onChange={handleInputChange}
                          placeholder={`Enter ${field.replace("_", " ")}`}
                          required
                        />
                      )}
                    </div>
                  </div>
                ))}
                <div className="col-lg-12 text-center">
                  <button type="submit" className="btnn" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>

                {error && (
                  <div className="col-lg-12 text-center">
                    <p style={{ color: "red" }}>{error}</p>
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

export default MenuModal;
