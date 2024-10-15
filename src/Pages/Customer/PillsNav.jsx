import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { FetchMenuItem } from "../../Services/MenuItem";
import { FetchMenu } from "../../Services/Menu";
import { toast } from "react-toastify";

const PillsNav = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const [activeTab, setActiveTab] = useState("ex1-pills-1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const [menuItemList, setMenuItemList] = useState([]);
  const [menuList, setMenuList] = useState([]);

  const fetchMenuItem = async (id) => {
    try {
      const { data } = await FetchMenuItem(id);
      setMenuItemList(data);
      console.log(data);
    } catch (err) {
      console.error("Failed to fetch restaurants", err);
    }
  };
  const fetchMenu = async (id) => {
    try {
      const { data } = await FetchMenu(id);
      setMenuList(data);
      setActiveTab(`ex1-pills-${data[0].menu_id}`);
    } catch (err) {
      console.error("Failed to fetch restaurants", err);
    }
  };

  useEffect(() => {
    let rstId = "RS429643379";
    fetchMenuItem(rstId);
    fetchMenu(rstId);
  }, []);

  return (
    <>
      <div className="tab_pills">
        <ul className="nav nav-pills mb-3" id="ex1" role="tablist">
          {menuList?.map((menu) => (
            <li className="nav-item" role="presentation" key={menu.menu_id}>
              <a
                className={`nav-link ${
                  activeTab === `ex1-pills-${menu.menu_id}` ? "active" : ""
                }`}
                id={`ex1-tab-${menu.menu_id}`}
                href={`#ex1-pills-${menu.menu_id}`}
                role="tab"
                aria-controls={`ex1-pills-${menu.menu_id}`}
                aria-selected={activeTab === `ex1-pills-${menu.menu_id}`}
                onClick={() => handleTabClick(`ex1-pills-${menu.menu_id}`)}
              >
                {menu.menu_name}
              </a>
            </li>
          ))}
        </ul>
        <div className="tab-content" id="ex1-content">
          {menuList?.map((menu) => (
            <div
              className={`tab-pane fade ${
                activeTab === `ex1-pills-${menu.menu_id}` ? "show active" : ""
              }`}
              id={`ex1-pills-${menu.menu_id}`}
              role="tabpanel"
              aria-labelledby="ex1-tab-1"
            >
              <div className="row">
                <div className="col-lg-12 text-center">
                  <div className="heading_menu">
                    <h2>{menu.menu_name}</h2>
                    <img
                      src="image/divider.png"
                      className="divider-img"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="row g-4">
  {menuItemList?.map((dish) => {
    if (dish.menu_id == menu.menu_id) {
      return (
        <div key={dish.id} className="col-lg-3 col-md-4 col-sm-6 col-6">
          <div className="dishes-card">
            <div className="dishes-thumb">
              <img
                src={dish.image}
                alt="thumb"
              />
            </div>
            <a href="cart.html">
              <h3>{dish.name}</h3>
            </a>
            <div className="m_con">
              <p>{dish.time}</p>
              <div className="rating">
                <i className="fa fa-star" />
                <span>4.5</span>
              </div>
            </div>
            <div className="dishes_pir">
              <h6>₹ {dish.price}</h6>
              <div className="add_cart">
                <button
                  className="add_cart_btn"
                  onClick={() => handleAddToCart(dish)}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  })}
</div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PillsNav;
