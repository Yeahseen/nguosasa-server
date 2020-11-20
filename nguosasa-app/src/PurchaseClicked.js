import React from 'react';
import Stripe from './Stripe/StripeContainer';
export default function purchaseClicked(res) {
  var priceElement = document.getElementsByClassName('cart-total-price')[0];
  var total = parseFloat(priceElement.innerText.replace('Ksh', ''));

  window.open('./StripeContainer', total);

  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  while (cartItemContainer.hasChildNodes()) {
    cartItemContainer.removeChild(cartItemContainer.firstChild);
  }
  console.log(total);
  return total;
}
