import React from 'react';
import ProductAdmin from './ProductAdmin';
import SellersAdmin from './SellersAdmin';

function Admin() {
  return (
    <div className="mvls-container">
      <ProductAdmin />
      <SellersAdmin />
    </div>
  );
}

export default Admin;
