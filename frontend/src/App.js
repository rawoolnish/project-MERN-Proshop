import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from 'react-bootstrap'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import CartScreen from "./screens/cartScreen";
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/registerScreen";
import ProfileScreen from "./screens/profileScreen";
import ShippingScreen from "./screens/shippingScreen";
import PaymentScreen from "./screens/paymentScreen";
import PlaceorderScreen from "./screens/placeorderScreen";
import OrderScreen from "./screens/orderScreen";
import UserScreen from "./screens/userListScreen";
import UserEditScreen from "./screens/userEditScreen";
import ProductListScreen from './screens/productListScreen';
import ProductEditScreen from "./screens/productEditScreen";
import OrderListScreen from "./screens/orderListScreen";




function App() {


  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/product/:id' element={<ProductScreen />} exact />
            <Route path='/admin/userlist' element={<UserScreen />} exact />
            <Route path='/admin/orderlist' element={<OrderListScreen />} exact />
            <Route path='/orders/:id' element={<OrderScreen />} exact />
            <Route path='/payment' element={<PaymentScreen />} exact />
            <Route path='/placeorder' element={<PlaceorderScreen />} exact />
            <Route path='/login/shipping' element={<ShippingScreen />} exact />
            <Route path='/shipping' element={<ShippingScreen />} exact />
            <Route path='/login' element={<LoginScreen />} exact />
            <Route path='/register' element={<RegisterScreen />} exact />
            <Route path='/profile' element={<ProfileScreen />} exact />
            <Route path='/cart/:id/*' element={<CartScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/search/:keyword" element={<HomeScreen />} exact />
            <Route path="/page/:pageNumber" element={<HomeScreen />} exact />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} exact />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} exact />
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} exact />
            <Route path="/admin/productlist" element={<ProductListScreen />} exact />
            <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
