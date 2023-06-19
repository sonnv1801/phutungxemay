import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./index.css";
import { Cart } from "./pages/home/cart/Cart";
import { HomePage } from "./pages/home/homepage/HomePage";
import { ProductDetail } from "./pages/home/productDetail/ProductDetail";
import { Shop } from "./pages/home/shop/Shop";
import { ProductDetailComBo } from "./pages/home/productDetailComBo/ProductDetailComBo";
import { ProductDetailSupplier } from "./pages/home/productDetailSupplier/ProductDetailSupplier";
import Login from "./pages/home/login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShopCombo } from "./pages/home/shopCombo/ShopCombo";
import { ShopSupplier } from "./pages/home/shopSupplier/ShopSupplier";
import { CartPage } from "./pages/home/cartpage/CartPage";
import OrderPage from "./pages/home/orderpage/OrderPage";
import Delivery from "./pages/home/delivery/Delivery";
import PurchaseHistory from "./pages/home/purchasehistory/PurchaseHistory";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop/:id" element={<Shop />} />
          <Route path="/shopcombo/:id" element={<ShopCombo />} />
          <Route path="/shopsupplier/:id" element={<ShopSupplier />} />
          <Route path="/shop/product-dt/:id" element={<ProductDetail />} />
          <Route path="/shop/product-dt/cart" element={<Cart />} />
          <Route
            path="/shop/product-dt-combo/:id"
            element={<ProductDetailComBo />}
          />
          <Route
            path="/shop/product-dt-supplier/:id"
            element={<ProductDetailSupplier />}
          />
          <Route path="/history" element={<PurchaseHistory />} />
          <Route path="/cart-supplier" element={<CartPage />} />
          <Route path="/orderpage" element={<OrderPage />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
