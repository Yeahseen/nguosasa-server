import React from 'react';
import Cart from './Cart';

//Onclick to cart

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement.parentElement;
  var title = shopItem.getElementsByClassName('mvls-name')[0].innerText;
  var price = shopItem.getElementsByClassName('mvls-price')[0].innerText;
  var imgSrc = shopItem.getElementsByClassName('mvls-poster')[0].src;

  console.log(title, price);

  addItemToCart(title, price, imgSrc);
  function addItemToCart(name, price, poster) {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartRow = document.createElement('div');
    var cartRowContents = `
  
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${poster}" width="100" height="100">
            <span class="cart-item-title">${name}</span>
            <span class="cart-price cart-column">${price}</span>
<input class="cart-quantity-input" type="number" value="1">
<button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    function addToCart() {
      var addToCartButtons = document.getElementsByClassName(
        'shop-item-button'
      );
      for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
      }
    }
    return Cart();
  }
  //adding to cart

  // updating cart total

  //removing Items from cart

  //changing quantity number
}
export default addToCartClicked;
