// src/components/Auth/Registration.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
const backendBasePath = "http://localhost:8081/";

const Registration = ({ onRegister }) => {
  
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [userRole, setUserRole] = useState('');  // Add this line to define userRole state


  const handleRegister = () => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }

    // Validate that phone number contains only numbers
    if (!/^\d+$/.test(phoneNumber)) {
      alert('Phone number should contain only numbers.');
      return;
    }

    // Validate that email and confirm email match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Create a registration model instance
    const registrationData = { name, phoneNumber, address, email, password };

    axios.post(`${backendBasePath}register`, registrationData)
    .then((response) => {
      console.log(response.config.data); // handle success
      const jsonString = response.config.data;
      
        const parsedData = JSON.parse(jsonString);
        console.log(parsedData);
        const username = parsedData.email;
        console.log(username);
      // // const user = response.data[0];
      // // Optionally, you can show a success message to the user
      if (response.data !== "Registration successful") {
        const role = 'customer';
        setUserRole(role);

        onRegister({ username, role });
      }
      
    })
    .catch((error) => {
      console.error('Registration failed:', error.response.data); // handle error
      // Optionally, you can show an error message to the user
    });

    // Simulate registration logic
    // In a real scenario, you'd make an API request here
    // onRegister(registrationData);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    // Reset email error state on input change
    setEmailError(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={10} sm={6}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Registration
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            error={emailError}
            helperText={emailError ? 'Invalid email format' : ''}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
            Register
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Registration;
