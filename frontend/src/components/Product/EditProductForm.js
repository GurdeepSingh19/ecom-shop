// src/components/Product/EditProductForm.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditProductForm = ({ product, onUpdateProduct, onClose }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleUpdateClick = () => {
    onUpdateProduct(editedProduct);
    onClose();
  };

  return (
    <div>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="name"
        value={editedProduct.name}
        onChange={handleInputChange}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        name="description"
        value={editedProduct.description}
        onChange={handleInputChange}
      />
      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        margin="normal"
        name="price"
        value={editedProduct.price}
        onChange={handleInputChange}
      />
      <Button variant="contained" color="primary" onClick={handleUpdateClick}>
        Update Product
      </Button>
    </div>
  );
};

export default EditProductForm;
