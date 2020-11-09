import StripeContainer from './Stripe/StripeContainer';
import Stripe from './Stripe/StripeContainer';

//Onclick to cart
function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement.parentElement;
  var title = shopItem.getElementsByClassName('mvls-name')[0].innerText;
  var price = shopItem.getElementsByClassName('mvls-price')[0].innerText;
  var imgSrc = shopItem.getElementsByClassName('mvls-poster')[0].src;

  addItemToCart(title, price, imgSrc);
  updateCartTotal();

  function addItemToCart(name, price, poster) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText === name) {
        alert('This item is already added to the cart');
        return;
      }
    }
    var cartRowContents = `
<div class="cart-item cart-column">
<img class="cart-item-image" src="${poster}" width="100" height="100">
<span class="cart-item-title">${name}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
<input class="cart-quantity-input" type="number" value="1">
<button class="btn btn-danger" type="button">REMOVE</button>
</div>`;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow
      .getElementsByClassName('btn-danger')[0]
      .addEventListener('click', removeCartItem);

    function addToCart() {
      var addToCartButtons = document.getElementsByClassName(
        'shop-item-button'
      );
      for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
      }
    }

    //removing cart items
    function removeCartItem(event) {
      var buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.remove();

      updateCartTotal();
    }
  }
  //updating cart total
  function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var priceElement = cartRow.getElementsByClassName('cart-price')[0];
      var quantityElement = cartRow.getElementsByClassName(
        'cart-quantity-input'
      )[0];
      var price = parseFloat(priceElement.innerText.replace('Ksh', ''));
      var quantity = quantityElement.value;
      total = total + price * quantity;
    }
    document.getElementsByClassName('cart-total-price')[0].innerText =
      'Ksh' + total;

    document
      .getElementsByClassName('btn-purchase')[0]
      .addEventListener('click', purchaseClicked);
    var cartQuantityInputs = document.getElementsByClassName(
      'cart-quantity-input'
    );
    for (i = 0; i < cartQuantityInputs.length; i++) {
      cartQuantityInputs[i].addEventListener('change', quantityChanged);
    }

    ///purchase clicked
    function purchaseClicked() {
      var cartItemContainer = document.getElementsByClassName('cart-items')[0];
      var cartRows = cartItemContainer.getElementsByClassName('cart-row');
      var priceElement = document.getElementsByClassName('cart-total-price')[0];
      var price = parseFloat(priceElement.innerText.replace('Ksh', ''));
      for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];

        var nameElement = cartRow.getElementsByClassName('cart-item-title')[0];

        var name = nameElement.innerText;
      }

      console.log(price, name);
      var cartItemContainer = document.getElementsByClassName('cart-items')[0];
      while (cartItemContainer.hasChildNodes()) {
        cartItemContainer.removeChild(cartItemContainer.firstChild);
      }
      Stripe();
      StripeContainer(price);
      window.open('./StripeContainer');
      updateCartTotal();
    }

    //quanity is changed

    function quantityChanged(event) {
      var quantityInput = event.target;
      if (isNaN(quantityInput.value) || quantityInput.value <= 0) {
        quantityInput.value = 1;
      }
      updateCartTotal();
    }
  }

  //adding item to cart

  // updating cart total

  //removing Items from cart

  //changing quantity number
}

export default addToCartClicked;
