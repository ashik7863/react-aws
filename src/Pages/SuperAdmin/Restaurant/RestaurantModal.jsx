// RestaurantModal.js
import React, { useState } from 'react';
import { CreateRestaurant } from '../../../Services/Restaurant';
import { toast } from 'react-toastify';

const RestaurantModal = ({ isVisible, onClose }) => {
  const [restaurantData, setRestaurantData] = useState({
    owner: '',
    email: '',
    mobile: '',
    password: '',
    restaurant_name: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData({
      ...restaurantData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res = await CreateRestaurant(restaurantData);
      if (res.status === 500) {
        toast.error(res.msg);
      } else {
        toast.success(res.msg);
        setRestaurantData({
          owner: '',
          email: '',
          mobile: '',
          password: '',
          restaurant_name: '',
          address: '',
        });
        onClose(); // Close the modal
      }
    } catch (err) {
      setError('Failed to create restaurant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`modal fade ${isVisible ? 'show' : ''}`}
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add New Restaurant
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
                <div className="col-lg-12">
                  <div className="input-box">
                    <label>Owner Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="owner"
                      value={restaurantData.owner}
                      onChange={handleInputChange}
                      placeholder="Owner Name"
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="input-box">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={restaurantData.email}
                      onChange={handleInputChange}
                      placeholder="Owner Email"
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="input-box">
                    <label>Mobile</label>
                    <input
                      type="text"
                      className="form-control"
                      name="mobile"
                      value={restaurantData.mobile}
                      onChange={handleInputChange}
                      placeholder="Mobile Number"
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="input-box">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={restaurantData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="input-box">
                    <label>Restaurant Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="restaurant_name"
                      value={restaurantData.restaurant_name}
                      onChange={handleInputChange}
                      placeholder="Restaurant Name"
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="input-box">
                    <label>Restaurant Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={restaurantData.address}
                      onChange={handleInputChange}
                      placeholder="Restaurant Address"
                      required
                    />
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

export default RestaurantModal;
