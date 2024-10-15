import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantModal from "./RestaurantModal"; // Adjust the import path as needed
import { FetchRestaurant, DeleteRestaurant } from "../../../Services/Restaurant"; // Add delete API service
import DeleteComponent from "../../DeleteComponent";
import { toast } from 'react-toastify';

const Restaurants = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch restaurant data from API
  const fetchRestaurants = async () => {
    try {
      const { data } = await FetchRestaurant();
      setRestaurantList(data);
    } catch (err) {
      console.error("Failed to fetch restaurants", err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Handle restaurant deletion

  const handleDelete = async (restaurantId) => {
    try {
      
      const response = await DeleteRestaurant(restaurantId);
      if (response.status === 200) {
        toast.success(response.message || 'Restaurant deleted successfully');
        fetchRestaurants(); // Refresh restaurant list
        return { status: response.status, message: response.message }; // Return response
      } else {
        toast.error(response.message || 'Failed to delete restaurant');
        return { status: response.status, message: response.message }; // Return response
      }
    } catch (error) {
      console.error("Failed to delete restaurant", error);
      toast.error('Failed to delete restaurant');
      return { status: 500, message: 'Failed to delete restaurant' }; // Return error response
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setModalVisible(false);
    fetchRestaurants(); // Refresh restaurant list after modal closes
  };

  return (
    <>
      <div className="dashboard-right">
        <div className="nav_heading">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <h5 className="mb-0">
                <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon>{" "}
                Restaurants
              </h5>
            </div>
            <div className="col-lg-6">
              <div className="btn_sec txt_right">
                <button
                  type="button"
                  className="btnn"
                  onClick={() => setModalVisible(true)}
                >
                  Add New Restaurant
                </button>
              </div>
            </div>
          </div>
        </div>

        <RestaurantModal isVisible={modalVisible} onClose={handleCloseModal} />

        <div className="row g-0">
          <div className="col-12 col-md-12">
            <div className="ongoing_courses_sec">
              <div className="row g-0">
                <div className="dashboard-card" id="table-card">
                  <div className="dashboard-card-heading">
                    <div className="tb-heading">
                      <h5 className="mb-0">
                        <iconify-icon icon="hugeicons:menu-restaurant"></iconify-icon>
                        Restaurants List
                      </h5>
                    </div>
                  </div>
                  <div className="data-searc-se">
                    <div className="opp-othe">
                      <div className="gorups-btn">
                        
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
                            <th>Owner</th>
                            <th>Mobile</th>
                            <th>Restaurant</th>
                            <th>Address</th>
                            <th>Creation Date</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {restaurantList.map((restaurant, index) => (
                            <tr key={restaurant.id}>
                              <td>
                                <span>{index + 1}</span>
                              </td>
                              <td className="">
                                <span className="car-badge">
                                  {restaurant.owner}
                                </span>
                              </td>
                              <td className="">
                                <span className="car-badge">
                                  {restaurant.mobile}
                                </span>
                              </td>
                              <td className="">
                                <span className="car-badge">
                                  {restaurant.restaurant_name}
                                </span>
                              </td>
                              <td>
                                <span>{restaurant.address}</span>
                              </td>
                              <td>
                                <span>{restaurant.cr_date}</span>
                              </td>
                              <td className="">
                                <span
                                  className={`status bg-${
                                    restaurant.status === "Active"
                                      ? "success"
                                      : "danger"
                                  }`}
                                >
                                  {restaurant.status}
                                </span>
                              </td>
                              <td className="">
                                <div className="buttn_grop">
                                  <button className="action-btn" type="button">
                                    <iconify-icon icon="hugeicons:view" />
                                  </button>
                                  <button className="action-btn">
                                    <iconify-icon icon="ic:baseline-key" />
                                  </button>

                                  <DeleteComponent
                                    entityName={restaurant.restaurant_name}
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

export default Restaurants;
