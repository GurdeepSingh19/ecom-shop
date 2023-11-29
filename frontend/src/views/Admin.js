// src/views/Admin.js
import React from 'react';
import ProductList from '../components/Product/ProductList';

const Admin = ({ products, user, onEditProduct }) => {
  return (
    <div>
      <h2>Welcome, Admin {user.username}!</h2>
      <ProductList products={products} user={user} onEditProduct={onEditProduct} />
    </div>
  );
};

export default Admin;
