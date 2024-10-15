import React,{useState,useEffect} from 'react';
import { FetchOrderByMobile } from '../../Services/Order';

const OrderHistory = () => {
  
    const [itemList, setItemList] = useState([]);

    const fetchMenuItem = async (id) => {
        try {
          const { data } = await FetchOrderByMobile(id);
          setItemList(data);
          console.log(JSON.parse(data[0].cart_items));
        } catch (err) {
          console.error("Failed to fetch restaurants", err);
        }
      };

      useEffect(() => {
        let mobile = atob(localStorage.getItem('mobile'));
        fetchMenuItem(mobile);
      }, []);

  const orders = [
    {
      restaurantName: 'The Gourmet Bistro',
      restaurantAddress: '123 Foodie Lane, Flavor Town, Foodland',
      customerName: 'John Doe',
      customerContact: '123-456-7890',
      orderDate: '2024-09-28',
      orderTime: '14:30',
      transactionId: 'TXN123456789',
      status: 'Cooking (approx 10 min)',
      items: [
        {
          id: 1,
          itemName: 'Stuffed Mushrooms',
          quantity: 2,
          price: 580,
          totalAmount: 1160,
          image: 'https://gramentheme.com/html/fresheat/assets/img/dishes/dishes1_2.png',
        },
        {
          id: 2,
          itemName: 'Caesar Salad with Grilled Chicken',
          quantity: 1,
          price: 250,
          totalAmount: 250,
          image: 'https://gramentheme.com/html/fresheat/assets/img/dishes/dishes1_2.png',
        },
        {
          id: 3,
          itemName: 'Paneer Tikka',
          quantity: 3,
          price: 150,
          totalAmount: 450,
          image: 'https://gramentheme.com/html/fresheat/assets/img/dishes/dishes1_2.png',
        },
      ],
    },
    // You can add more orders here
    {
      restaurantName: 'Spicy Delights',
      restaurantAddress: '456 Spice St, Flavor Town, Foodland',
      customerName: 'Jane Doe',
      customerContact: '987-654-3210',
      orderDate: '2024-09-27',
      orderTime: '18:00',
      transactionId: 'TXN987654321',
      status: 'Delivered',
      items: [
        {
          id: 4,
          itemName: 'Spicy Chicken Wings',
          quantity: 2,
          price: 700,
          totalAmount: 1400,
          image: 'https://gramentheme.com/html/fresheat/assets/img/dishes/dishes1_2.png',
        },
        {
          id: 5,
          itemName: 'Vegetable Fried Rice',
          quantity: 1,
          price: 300,
          totalAmount: 300,
          image: 'https://gramentheme.com/html/fresheat/assets/img/dishes/dishes1_2.png',
        },
      ],
    },
  ];

  // Badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="badge bg-warning text-dark">Pending</span>;
      case 'Approved':
        return <span className="badge bg-success">Approved</span>;
      case 'Cooking (approx 10 min)':
        return <span className="badge bg-info text-dark">Cooking (approx 10 min)</span>;
      case 'Delivered':
        return <span className="badge bg-success">Delivered</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const printBill = (order) => {
    const printWindow = window.open('', '_blank', 'width=600,height=400');
    printWindow.document.write(`
      <html>
        <head>
          <title>Bill</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; margin-bottom: 20px; }
            .order-details { margin-bottom: 20px; }
            .item { margin-bottom: 15px; }
            .item img { max-width: 80px; margin-right: 10px; }
            .item-details { display: flex; align-items: center; }
            .badge { margin-right: 5px; }
            .total { font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; }
            .container { display: flex; justify-content: space-between; }
            .customer-details, .order-summary { width: 48%; }
          </style>
        </head>
        <body>
          <h2>${order.restaurantName}</h2>
          <p class="text-center">${order.restaurantAddress}</p>
          <h2>Order Bill</h2>
          <div class="container">
            <div class="customer-details">
              <h5>Customer Details</h5>
              <p><strong>Name:</strong> ${order.customerName}</p>
              <p><strong>Contact:</strong> ${order.customerContact}</p>
            </div>
            <div class="order-summary">
              <h5>Order Details</h5>
              <p><strong>Order Date:</strong> ${order.cr_date}</p>
              <p><strong>Order Time:</strong> ${order.cr_time}</p>
              <p><strong>Transaction ID:</strong> ${order.tran_id}</p>                
            </div>
          </div>
          <h5>Items Ordered:</h5>
          ${JSON.parse(order.cart_items).map(item => `
            <div class="item">
              <div class="item-details">
                <img src="${item.image}" alt="${item.itemName}" />
                <div>
                  <strong>${item.itemName}</strong><br />
                  <span>Quantity: ${item.quantity}</span><br />
                  <span>Price: ₹${item.price.toFixed(2)}</span><br />
                  <span class="total">Total: ₹${(item.price*item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          `).join('')}
          <div class="footer">
            <p>Thank you for dining with us!</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Order History</h2>
      {itemList.map((order, orderIndex) => (
        <div key={orderIndex} className="order-summary card mb-4 shadow">
          <div className="card-body">
            <h5 className="card-title">Order Details</h5>
            <p>
            <strong>Order Date:</strong> {new Date(order.cr_date).toLocaleDateString()}
            </p>
            <p><strong>Order Time:</strong> {order.cr_time}</p>
            <p><strong>Transaction ID:</strong> {order.tran_id}</p>
            <p><strong>Status:</strong> {getStatusBadge(order.status)}</p>
          </div>
          <h5 className="mb-3 p-2">Items Ordered:</h5>
          <div className="row p-2">
          {JSON.parse(order.cart_items).map((item, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={item.id}>
                <div className="card shadow-sm border-light">
                  <img src={item.image} alt={item.itemName} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{item.itemName}</h5>
                    <p className="card-text">
                      <strong>Quantity:</strong> {item.quantity} <br />
                      <strong>Price:</strong> ₹{item.price.toFixed(2)} <br />
                      <strong>Total Amount:</strong> ₹{(item.price*item.quantity).toFixed(2)} <br />
                    </p>
                    <button className="btn btn-primary">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-success btn-block mt-4" onClick={() => printBill(order)}>
            Print Bill
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
