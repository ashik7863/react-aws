import React, { useState, useEffect } from "react";
import { CreateMenuItem } from "../../../Services/MenuItem";
import { toast } from "react-toastify";
import { FetchMenu } from "../../../Services/Menu";

const MenuItemModal = ({ isVisible, onClose }) => {
  const [menuList, setMenuList] = useState([]);
  const rst_id = btoa(localStorage.getItem("rst_id"));

  const fetchMenu = async (id) => {
    try {
      const { data } = await FetchMenu(id);
      console.log(data);
      setMenuList(data);
    } catch (err) {
      console.error("Failed to fetch menu", err);
    }
  };

  useEffect(() => {
    fetchMenu(rst_id);
  }, []);

  const [menuData, setMenuData] = useState({
    menu_id: "",
    item_type: "",
    name: "",
    image: "",
    description: "",
    calorie: "",
    portion: "",
    rate: "",
    swiggyZomatoPercentage: "",
    swiggyZomatoRate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "rate" || name === "swiggyZomatoPercentage") {
      calculateSwiggyZomatoRate(value, name);
    }
  };

  // Calculate Swiggy/Zomato Rate
  const calculateSwiggyZomatoRate = (value, name) => {
    let rate = menuData.rate;
    let percentage = menuData.swiggyZomatoPercentage;

    if (name === "rate") {
      rate = value;
    } else if (name === "swiggyZomatoPercentage") {
      percentage = value;
    }

    if (rate && percentage) {
      // Calculate the additional cost and add to the original rate
      let additionalCost = (rate * percentage) / 100;
      let calculatedRate = parseFloat(rate) + additionalCost;
      setMenuData((prevData) => ({
        ...prevData,
        swiggyZomatoRate: calculatedRate,
      }));
    }
  };

  // Handle image file change
  const handleFileChange = (e) => {
    setMenuData({
      ...menuData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const rst_id = localStorage.getItem("rst_id");

    const updatedMenuItem = {
      ...menuData,
      rst_id: rst_id,
    };

    const formData = new FormData();

    formData.append("rst_id", updatedMenuItem.rst_id);
    formData.append("menu_id", updatedMenuItem.menu_id);
    formData.append("item_type", updatedMenuItem.item_type);
    formData.append("name", updatedMenuItem.name);
    formData.append("description", updatedMenuItem.description);
    formData.append("calorie", updatedMenuItem.calorie);
    formData.append("portion", updatedMenuItem.portion);
    formData.append("rate", updatedMenuItem.rate);
    formData.append("swiggyZomatoPercentage", updatedMenuItem.swiggyZomatoPercentage);
    formData.append("swiggyZomatoRate", updatedMenuItem.swiggyZomatoRate);

    if (updatedMenuItem.image) {
      formData.append("image", updatedMenuItem.image, updatedMenuItem.image.name);
    }

    try {
      let res = await CreateMenuItem(formData);
      if (res.status === 500) {
        toast.error(res.msg);
      } else {
        toast.success(res.msg);
        setMenuData({
          menu_id: "",
          name: "",
          item_type: "",
          image: "",
          description: "",
          calorie: "",
          portion: "",
          rate: "",
          swiggyZomatoPercentage: "",
          swiggyZomatoRate: "",
        });
        onClose();
      }
    } catch (err) {
      console.log(err.response);
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
              Add New Menu Item
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
                {/* Select Menu for menu_id */}
                <div className="col-lg-6 input-box">
                  <label>Menu</label>
                  <select
                    name="menu_id"
                    value={menuData.menu_id}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">---Select Menu---</option>
                    {menuList?.map((menu) => (
                      <option key={menu.id} value={menu.menu_id}>
                        {menu.menu_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Item Type */}
                <div className="col-lg-6 input-box">
                  <label>Item Type</label>
                  <select
                    name="item_type"
                    value={menuData.item_type}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">---Select Item Type---</option>
                    <option value="Veg">Veg</option>
                    <option value="Nonveg">Nonveg</option>
                  </select>
                </div>

                {/* Item Name */}
                <div className="col-lg-6 input-box">
                  <label>Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={menuData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Rate */}
                <div className="col-lg-6 input-box">
                  <label>Rate</label>
                  <input
                    type="number"
                    name="rate"
                    value={menuData.rate}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Swiggy/Zomato Percentage */}
                <div className="col-lg-6 input-box">
                  <label>Swiggy/Zomato Percentage</label>
                  <input
                    type="number"
                    name="swiggyZomatoPercentage"
                    value={menuData.swiggyZomatoPercentage}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                {/* Swiggy/Zomato Rate */}
                <div className="col-lg-6 input-box">
                  <label>Swiggy/Zomato Rate</label>
                  <input
                    type="number"
                    name="swiggyZomatoRate"
                    value={menuData.swiggyZomatoRate}
                    onChange={handleInputChange}
                    className="form-control"
                    readOnly
                  />
                </div>

                {/* Calorie */}
                <div className="col-lg-6 input-box">
                  <label>Calorie</label>
                  <input
                    type="text"
                    name="calorie"
                    value={menuData.calorie}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                {/* Portion */}
                <div className="col-lg-6 input-box">
                  <label>Portion</label>
                  <input
                    type="text"
                    name="portion"
                    value={menuData.portion}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                {/* Upload Image */}
                <div className="col-lg-6 input-box">
                  <label>Upload Image</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Description */}
                <div className="col-lg-12 input-box">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={menuData.description}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="col-lg-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Item"}
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

export default MenuItemModal;
