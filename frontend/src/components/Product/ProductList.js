// src/components/Product/ProductList.js
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditProductForm from './EditProductForm';
import axios from 'axios';
const backendBasePath = "http://localhost:8081/";

const ProductList = ({ products, setProducts, user, onAddToCart, onEditProduct, userRole }) => {
const [editProduct, setEditProduct] = useState(null);
const [productList, setProductList] = useState(products);

  const handleEditClick = (product) => {
    setEditProduct(product);
  };

  const handleEditClose = () => {
    setEditProduct(null);
  };

  const fetchUpdatedProducts = async () => {
    try {
      const auth = localStorage.getItem("authToken");
	    const response = await axios.get(`${backendBasePath}getProducts`, { headers: { 'Authorization': `Bearer ${auth}` }});
      const updatedProducts = response.data;

      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error fetching updated products:', error.message);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {

   try {
      // Make a POST request to your backend endpoint
      const auth = localStorage.getItem("authToken");
      const response = await axios.post(`${backendBasePath}updateProduct`, { updatedProduct, headers: { 'Authorization': `Bearer ${auth}` } });
      if (response.data.success) {
        // Product updated successfully
        console.log('Product updated successfully:', response.data.message);

        // Fetch the updated product list after a successful update
        fetchUpdatedProducts();

      } else {
        // Product update failed
        console.error('Product update failed:', response.data.message);
      }
    } catch (error) {
      // Handle error
      console.error('Error updating product:', error.message);
    }

    // Close the edit form regardless of success or failure
    handleEditClose();
  };

  return (
    <Grid container spacing={3} mt={4}>
      {products.map((product) => (
        <Grid item key={product.sku} xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardHeader title={product.name} subheader={`$${product.price.toFixed(2)}`} />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {product.description}
              </Typography>
              <p></p>
              {userRole !== 'admin' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onAddToCart(product)}
                >
                  Add to Cart
                </Button>
              )}
              {userRole === 'admin' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditClick(product)}
                >
                  Edit Product
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
      {editProduct && (
        <EditProductForm
          product={editProduct}
          onUpdateProduct={handleUpdateProduct}
          onClose={handleEditClose}
        />
      )}
    </Grid>
  );
};

export default ProductList;
