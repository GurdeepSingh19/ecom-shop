// src/views/Customer.js
import React from 'react';
import ProductList from '../components/Product/ProductList';

const Customer = ({ products, user, onAddToCart }) => {
  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <ProductList products={products} user={user} onAddToCart={onAddToCart} />
    </div>
  );
};

export default Customer;
