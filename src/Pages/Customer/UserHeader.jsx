import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const UserHeader = ({ toggleCart }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQty = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <header className="header_main custom-sticky">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="logo_sec">
                <Link to="./">
                  <img src="assets/images/logo.png" alt="" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="header_cart">
                <button to="" className="cart_btn" onClick={toggleCart}>
                  <i className="fa fa-shopping-cart" />
                  <span className="cart-text">
                    Cart<span className="cartcount">{totalQty}</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

    </>
  )
}

export default UserHeader