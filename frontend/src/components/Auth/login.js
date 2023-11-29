import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
const backendBasePath = "http://localhost:8081/";

const Login = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    // Reset the error state
    setError(null);
    axios.post(`${backendBasePath}login`, { username, password })
      .then(res => {
        if (res.data !==  "No Record") {
          const user = res.data.user;
          // Store user data in session
          sessionStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('authToken', res.data.token);
          localStorage.setItem('userInfo', JSON.stringify(user));
          const role = user.role === 1 ? 'admin' : 'customer';
          onLogin({ user, role });
        }
        else {
          // Display an error message when login details are incorrect
          setError('Invalid username or password');
        }
      })
      .catch(err => {
        console.log(err);
        // Display a generic error message for other errors
        setError('An error occurred while logging in');
      });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={10} sm={6}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          {error && (
            <Typography variant="body2" color="error" align="center" mt={2}>
              {error}
            </Typography>
          )}
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
          <Typography variant="body2" align="center" mt={2}>
            Don't have an account? <span onClick={onRegister}>Register here</span>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
