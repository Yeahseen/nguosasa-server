import React from 'react';
import { Link } from '@reach/router';
import addToCartClicked from './cartFunction';
import formSuccess from './ProductForm';
import addToCart from './cartFunction';
import Cart from './Cart';
import './App.css';

function Product({ productDisplay }) {
  const { id, name, price, poster, type, imgSrc } = productDisplay;
  let typeIs = '';

  if (type === 'Retail') {
    typeIs = 'Item is in Retail';
  } else if (type === 'Wholesale') {
    typeIs = 'Item is in Wholesale';
  }
  if (type === 'Wholesale') {
    return (
      <div className="mvls-product">
        <img className="mvls-poster" src={poster} alt={imgSrc} />
        <div className="mvls-product-body">
          <div className="mvls-name">{name}</div>
          <div className="mvls-price">Ksh {price}</div>
        </div>
        <div className="mvls-product-footer">
          <Link to={`product/${id}`} className="mvls-btn-retail">
            See {name}
          </Link>
          <form className="mvls-form" onClick={addToCartClicked}>
            {formSuccess && (
              <button
                className="btn btn-primary shop-item-button"
                type="button"
              >
                Add to Cart.
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mvls-container">
      <div className="mvls-product">
        <img className="mvls-poster" src={poster} alt={poster} />
        <div className="mvls-product-body">
          <div className="mvls-title">{name}</div>
          <div className="mvls-title">Ksh {price}</div>

          <p className="mvls-cinema-count">{typeIs}</p>
        </div>
        <div className="mvls-product-footer">
          <Link to={`/product/${id}`} className="mvls-btn-retail">
            See {name}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
