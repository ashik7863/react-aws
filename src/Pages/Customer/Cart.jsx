import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../../redux/cartSlice';

const Cart = ({ cartActive, toggleCart }) => {
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to handle Razorpay Payment
  const handleCheckout = async () => {

    try {
      let name=localStorage.getItem('user');
      name=atob(name);
      let mobile=localStorage.getItem('mobile');
      mobile=atob(mobile);

      let rst_id=localStorage.getItem('rst_id');
      let tbl_id=localStorage.getItem('tbl_id');

      const orderUrl = 'http://localhost:4500/api/create-order';
      const orderResponse = await axios.post(orderUrl, {
        amount: totalPrice,
        name:name,
        mobile:mobile,
        cart_items:cartItems,
        rst_id:rst_id,
        tbl_id:tbl_id
      });

      const { orderId } = orderResponse.data;

      const options = {
        key: "rzp_test_TV0YmDeOxM4XQi",
        amount: totalPrice * 100,
        currency: "INR",
        name: "Restaurant Management System",
        description: "Purchase Description",
        image: "https://example.com/logo.png",

        handler: async (response) => {
          try {
            const paymentSuccessUrl = 'http://localhost:4500/api/payment-success';
            const paymentResponse = await axios.post(paymentSuccessUrl, {
              order_id: orderId,
              payment_id: response.razorpay_payment_id,
              cartItems: cartItems,
              totalAmount: totalPrice,
            });

            if (paymentResponse.data.status === 200) {
              toast.success('Payment successful! Your order has been placed.');
            } else {
              toast.error('Payment successful, but failed to record details.');
            }
          } catch (error) {
            console.error('Error while saving payment details', error);
          }
        },
        prefill: {
          name: name,
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during payment initiation', error);
    }
  };

  return (
    <div className={`cart ${cartActive ? 'active' : ''}`}>
      <div className="cart-header">
        <span>My Cart</span>
        <span className="close-cart" onClick={toggleCart}>&times;</span>
      </div>
      <div className="cart-body">
        {cartItems?.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt="Product" />
            <div className="cart-item-details">
              <p>{item.name}</p>
              <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-quantity">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => handleDecrease(item.id)}
              >
                <i className="fa fa-minus"></i>
              </button>
              <span className="quantity">{item.quantity}</span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => handleIncrease(item.id)}
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleRemove(item.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div className="total-price">
          <span>Total: </span>
          <span className="price">₹{totalPrice.toFixed(2)}</span>
        </div>
        <button className="btn btn-success btn-block" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
