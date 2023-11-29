// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Auth/login';
import Registration from './components/Auth/Registration';
import ProductList from './components/Product/ProductList';
import Cart from './components/Cart/Cart';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
// import cookie from 'js-cookie';
const backendBasePath = "http://localhost:8081/";

const App = () => {
  const [userRole, setUserRole] = useState(''); // New state for user role
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status
  
  // Check Authentication   
  useEffect(() => {
    const auth = localStorage.getItem("authToken");
    if (auth){
		let uData = localStorage.getItem('userInfo');
		setUser(uData);
      	setIsLoggedIn(true);
	}
  }, [])

  useEffect(() => {
	const auth = localStorage.getItem("authToken");
    const fetchProducts = async () => {
      try {
		const response = await axios.get(`${backendBasePath}getProducts`, { headers: { 'Authorization': `Bearer ${auth}` }});
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error, show a message, etc.
      }
    };
    fetchProducts();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setUserRole(userData.role);
    setIsLoggedIn(true); // Update login status
  };

  const handleLogout = () => {
    // Implement your logout logic here
    setUser(null);
    setIsLoggedIn(false); // Update login status
    // Remove the token from the cookie
    removeCookie('authToken');
	localStorage.clear();
  };
  
  // Function to remove a cookie
  const removeCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };
  
  const handleRegister = (registrationData) => {
    // Implement your registration logic here
    console.log('Registration:', registrationData);

    // After successful registration, you might want to automatically log in the user
    handleLogin({
      username: registrationData.username, // Assuming email as username for simplicity
      role: 'Customer',
    });
  };

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.sku === product.sku);

    if (existingItem) {
      // Product already in the cart, increment the quantity
      setCart((prevCart) => {
        const updatedCart = prevCart.map((item) =>
          item.sku === product.sku ? { ...item, quantity: item.quantity + 1 } : item
        );
        return updatedCart;
      });
    } else {
      // Product not in the cart, add it with quantity 1
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log('Checkout:', cart);
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      
      {isLoggedIn  ? (
        // User is logged in, show the welcome message, logout button, and product list
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1>Welcome, {user.username}!</h1>
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
          <Grid item xs={12} md={8}>
            <ProductList products={products} setProducts={setProducts} onAddToCart={handleAddToCart} userRole={userRole} />
          </Grid>
          {userRole !== 'admin' && (
            <Grid item xs={12} md={4}>
              <Cart cart={cart} onCheckout={handleCheckout} />
            </Grid>
          )}
        </Grid>
      ) : (
        // User is not logged in, show the login and registration forms
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Login onLogin={handleLogin} onRegister={() => {}} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Registration onRegister={handleRegister} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default App;
