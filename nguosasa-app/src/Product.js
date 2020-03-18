import React from 'react';
import { Link } from '@reach/router';
import './App.css';

function Product({ productDisplay }) {
  const { id, name, price, description, poster, type } = productDisplay;
  let typeIs = '';

  if (type === 'Retail') {
    typeIs = 'Item is in Retail';
  } else if (type === 'Wholesale') {
    typeIs = 'Item is in Wholesale';
  }
  if (type === 'Wholesale') {
    return (
      <div className="mvls-product">
        <img className="mvls-poster" src={poster} alt={poster} />
        <div className="mvls-product-body">
          <div className="mvls-title">{name}</div>
          <div className="mvls-title">Ksh {price}</div>
          <div className="mvls-title">{description}</div>
        </div>
        <div className="mvls-product-footer">
          <Link to={`product/${id}`} className="mvls-btn-retail">
            See {name}
          </Link>
        </div>

        <div className="mvls-product-footer">
          <form action="http://localhost:3000/Cart" method="post">
            <input type="submit" value="Add To Cart"></input>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mvls-product">
      <img className="mvls-poster" src={poster} alt={poster} />
      <div className="mvls-product-body">
        <div className="mvls-title">{name}</div>
        <div className="mvls-title">Ksh {price}</div>
        <div className="mvls-title">{description}</div>
        <p className="mvls-cinema-count">{typeIs}</p>
      </div>
      <div className="mvls-product-footer">
        <Link to={`/product/${id}`} className="mvls-btn-retail">
          See {name}
        </Link>
      </div>
    </div>
  );
}

export default Product;
