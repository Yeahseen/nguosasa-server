import React from 'react';
import { Router } from '@reach/router';
import NavBar from './NavBar';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import Signup from './Signup';
import Admin from './Admin';
import Adminlogin from './Adminlogin';
import './App.css';
import Login from './Login';
import Login2 from './Login2';
import SellerDetails from './SellerDetails';
import StripeContainer from './Stripe/StripeContainer';

function App() {
  return (
    <div className="mvls-app">
      <header className="mvls-header">
        <NavBar />
      </header>
      <main className="mvls-main">
        <Router>
          <ProductList path="/" />
          <ProductDetails path="/product/:productId" />
          <SellerDetails path="/SellerDetails/:sellerId" />
          <Login path="/Login" />
          <Login2 path="/Login2" />
          <Adminlogin path="/Adminlogin" />
          <StripeContainer path="/StripeContainer" />

          <Signup path="/Signup" />
          <Cart path="/Cart" />
          <Admin path="/Admin001" />
        </Router>
      </main>
    </div>
  );
}

export default App;
