import React, { useState } from 'react';
import axios from 'axios';
import { LOGIN, GOOGLE_AUTH_URL } from '../server/config';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Login() {
  const [fieldsError, setFieldsError] = useState(false); // State to track empty fields error
  const [passwordError, setPasswordError] = useState(false); // State to track password field empty error

  const submitForm = async (event) => {
    event.preventDefault();

    // Check if any field is left empty
    if (event.target.email.value === '') {
      setFieldsError(true);
      return;
    }

    if (event.target.password.value === '') {
      setPasswordError(true);
      return;
    }

    try {
      // Submit login request
      const response = await axios.post(LOGIN, {
        email: event.target.email.value,
        password: event.target.password.value,
      }, {
        withCredentials: true,
      });

      // Handle successful login
      handleSuccessfulLogin(response.data.user);
    } catch (error) {
      // Handle errors
      handleLoginError(error);
    }
  };

  // Function to handle successful login
  const handleSuccessfulLogin = (userEmail) => {
    console.log("User signed in successfully!");
    console.log("Logged-in user email:", userEmail);

    // Store logged-in user email in localStorage
    localStorage.setItem("loggedInUserEmail", userEmail);

    // Redirect to dashboard or desired page
    window.location.href = "/dashboard"; // Redirect to dashboard page
  };

  // Function to handle login errors
  const handleLoginError = (error) => {
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    // Display an alert for login failure
    alert("Login failed. Please check your credentials.");
  };

  return (
    <div className="content">
      <div id="left">
        <div className="left-content">
          <h2>Welcome Back</h2>
          <p>Login into your account</p>
          <div className="row">
            <div className="col-md-3">
              <a
                className="btn btn-outline-dark"
                href={GOOGLE_AUTH_URL}
                role="button"
                style={{
                  textTransform: 'none',
                  height: '45px',
                  fontFamily: 'Poppins',
                  border: '1.73658px solid #20dc49',
                  borderRadius: '8.68291px',
                }}
              >
                <img
                  width="30px"
                  height="30px"
                  style={{ marginBottom: '3px', marginRight: '5px' }}
                  alt="Google sign-in"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                />
                Google
              </a>
            </div>
          </div>
          <div className="separate">
            <p>or continue with</p>
          </div>
          <form onSubmit={submitForm}>
            <input type="email" placeholder="Email" id="email" name="email" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
            />
            <div className="forgot">
              <a href="">Forgot Password</a>
            </div>
            <input
              type="submit"
              name="submit"
              id="submit"
              value="Log In"
            />
          </form>

          <div className="redirect">
            <p>
              Don't have an account? <span><a href="">Register</a></span>
            </p>
          </div>
        </div>
      </div>
      <div id="right"></div>
      {/* Alert for filling login fields */}
      {fieldsError && (
        <div className="alert-container">
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error" onClose={() => setFieldsError(false)}>
              Please fill in email field.
            </Alert>
          </Stack>
        </div>
      )}
      {/* Alert for filling out the password field */}
      {passwordError && (
        <div className="alert-container">
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error" onClose={() => setPasswordError(false)}>
              Please fill out the password field.
            </Alert>
          </Stack>
        </div>
      )}
    </div>
  );
}

export default Login;
