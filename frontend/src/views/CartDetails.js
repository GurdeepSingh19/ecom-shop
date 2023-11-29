// CartDetails.js
import React from 'react';
import Typography from '@mui/material/Typography';

const CartDetails = ({ cart }) => {
  return (
    <div>
      <h2>Cart Details</h2>
      {cart ? (
        <div>
          <Typography variant="body2" color="textSecondary">
            Customer: {cart.customerName}, Total: ${cart.total.toFixed(2)}
          </Typography>
          {/* Display other cart details as needed */}
        </div>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No cart details available.
        </Typography>
      )}
    </div>
  );
};

export default CartDetails;
