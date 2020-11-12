import React, { Component } from 'react';

export default class Cart extends Component {
  render() {
    return (
      <section>
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
      </section>
    );
  }
}
