import React from 'react';
import addToCart from './cartFunction';
function Cart() {
  return (
    <html>
      <div className="mvls-container">
        <div className="section-header">CART</div>
        <div className="cart-row">
          <span className="cart-item cart-header cart-column">ITEM</span>
          <span className="cart-price cart-header cart-column">PRICE</span>
          <span className="cart-quantity cart-header cart-column">
            QUANTITY
          </span>
        </div>
        <div className="cart-items"></div>

        <div className="cart-total">
          <strong className="cart-total-title">Total</strong>
          <span className="cart-total-price">ksh 0</span>
        </div>
        <button className="btn btn-primary btn-purchase" type="button">
          PURCHASE
        </button>
      </div>
    </html>
  );
}

export default Cart;
