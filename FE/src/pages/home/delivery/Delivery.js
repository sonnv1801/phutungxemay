import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Delivery = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deliveryQuantity, setDeliveryQuantity] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/v1/order");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setSelectedProduct(null);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setDeliveryQuantity(0);
  };

  const handleDelivery = async () => {
    try {
      if (!selectedOrder || !selectedProduct) {
        toast.error("Vui lòng chọn đơn hàng và sản phẩm cần giao.", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      const response = await axios.post(
        `http://localhost:8000/v1/delivery/${selectedOrder._id}`,
        {
          productCode: selectedProduct.productCode,
          quantity: deliveryQuantity,
          customerId: selectedOrder.customerId,
        }
      );
      toast.success("Giao hàng thành công!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setSelectedOrder(null);
      setSelectedProduct(null);
      setDeliveryQuantity(0);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Gửi hàng còn thiếu</h1>

      {orders.length > 0 ? (
        <div>
          <h2 className="sub-heading">Danh sách đơn hàng:</h2>
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order._id} className="order-item-huhu">
                <p className="order-id">ID: {order._id}</p>
                <p className="customer-id">ID Khách hàng: {order.customerId}</p>
                <p className="missing-products">
                  Số lượng sản phẩm còn thiếu:{" "}
                  {
                    order.products.filter(
                      (product) =>
                        product.quantityDelivered < product.quantityOrdered
                    ).length
                  }
                </p>
                <button
                  className="order-button"
                  onClick={() => handleOrderClick(order)}
                >
                  Xem chi tiết
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="no-order">Không có đơn hàng nào.</p>
      )}

      {selectedOrder && (
        <div>
          <h2 className="sub-heading">Thông tin đơn hàng:</h2>
          <p className="order-id">ID: {selectedOrder._id}</p>
          <p className="customer-id">
            ID Khách hàng: {selectedOrder.customerId}
          </p>
          <h3 className="missing-products-heading">Sản phẩm còn thiếu:</h3>
          <ul className="product-list">
            {selectedOrder.products.map(
              (product) =>
                product.quantityDelivered < product.quantityOrdered && (
                  <li key={product._id} className="product-item">
                    <p className="product-code">
                      Mã sản phẩm: {product.productCode}
                    </p>
                    <p className="missing-quantity">
                      Số lượng còn thiếu:{" "}
                      {product.quantityOrdered - product.quantityDelivered}
                    </p>
                    <button
                      className="delivery-button"
                      onClick={() => handleProductClick(product)}
                    >
                      Giao hàng
                    </button>
                  </li>
                )
            )}
          </ul>
        </div>
      )}

      {selectedProduct && (
        <div>
          <h2 className="sub-heading">Giao hàng:</h2>
          <p className="order-id">Đơn hàng: {selectedOrder._id}</p>
          <p className="product-code">
            Mã sản phẩm: {selectedProduct.productCode}
          </p>
          <label htmlFor="deliveryQuantity" className="label">
            Số lượng giao:
          </label>
          <input
            type="number"
            id="deliveryQuantity"
            className="input"
            value={deliveryQuantity}
            onChange={(e) => setDeliveryQuantity(e.target.value)}
            inputMode="numeric"
          />

          <button className="delivery-button" onClick={handleDelivery}>
            Gửi hàng
          </button>
        </div>
      )}
    </div>
  );
};

export default Delivery;
