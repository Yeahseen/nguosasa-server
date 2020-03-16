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
      <div className="mvls-movie">
        <img className="mvls-poster" src={poster} alt={poster} />
        <div className="mvls-movie-body">
          <div className="mvls-title">{name}</div>
          <div className="mvls-title">Ksh {price}</div>
          <div className="mvls-title">{description}</div>
        </div>
        <div className="mvls-movie-footer">
          <Link to={'/ProductDetails'} className="mvls-btn-retail">
            see {name}
          </Link>
        </div>

        <div className="mvls-movie-footer">
          <Link to={`/Cart`} className="mvls-btn">
            Order The Product
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mvls-movie">
      <img className="mvls-poster" src={poster} alt={poster} />
      <div className="mvls-movie-body">
        <div className="mvls-title">{name}</div>
        <div className="mvls-title">Ksh {price}</div>
        <div className="mvls-title">{description}</div>
        <p className="mvls-cinema-count">{typeIs}</p>
      </div>
      <div className="mvls-movie-footer">
        <Link to={`/products/${id}`} className="mvls-btn-retail">
          See {name}
        </Link>
      </div>
    </div>
  );
}

export default Product;
