import React, { useState } from 'react';
import { Container, Typography, Button, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const Cart = ({ cart, onCheckout, }) => {
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [openCheckout, setOpenCheckout] = useState(false);

  const handleInputChange = (field, value) => {
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [field]: value }));
  };

  const handleOpenCheckout = () => {
    setOpenCheckout(true);
  };

  const handleCloseCheckout = () => {
    setOpenCheckout(false);
  };

  const handleCheckout = () => {
    // Calculate total amount
    const totalAmount = cart.reduce((total, item) => total + item.quantity * item.price, 0);
    console.log('Customer Information:', customerInfo);
    console.log('Total Amount:', totalAmount);

    setCustomerInfo({ firstName: '', lastName: '', email: '' });
    onCheckout();
    handleCloseCheckout();
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Shopping Cart
        </Typography>
        {cart.map((item) => (
          <Paper key={item.sku} elevation={1} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="subtitle1">{item.name}</Typography>
            <Typography variant="body1" color="textSecondary">
              Quantity: {item.quantity} | ${item.price.toFixed(2)} each
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Total: ${item.quantity * item.price.toFixed(2)}
            </Typography>
          </Paper>
        ))}

<Typography variant="h6" sx={{ marginTop: 2 }}>
            Total Amount: ${cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}
          </Typography>

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          
        </Typography>
        <Button variant="contained" color="primary" fullWidth onClick={handleOpenCheckout}>
           Checkout
        </Button>
      </Paper>

      {/* Checkout Dialog */}
      <Dialog open={openCheckout} onClose={handleCloseCheckout}>
        <DialogTitle>Checkout</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={customerInfo.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={customerInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={customerInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </form>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Total Amount: ${cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCheckout}>Shop More</Button>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;
