// CartList.js
import React from 'react';
import Typography from '@mui/material/Typography';

const CartList = ({ carts }) => {
  return (
    <div>
      <h2>Customer Carts</h2>
      {carts.length > 0 ? (
        <ul>
          {carts.map((cart, index) => (
            <li key={index}>
              <Typography variant="body2" color="textSecondary">
                Customer: {cart.customerName}, Total: ${cart.total.toFixed(2)}
              </Typography>
              {/* Display other cart details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No customer carts available.
        </Typography>
      )}
    </div>
  );
};

export default CartList;
