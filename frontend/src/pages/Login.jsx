import React from 'react';
import axios from 'axios';
import { LOGIN, GOOGLE_AUTH_URL } from '../server/config';
import { Auth0Provider } from '@auth0/auth0-react';

function Login() {
const submitForm = async (event) => {
    event.preventDefault();
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

  function handleLoggedInUser(email) {
    // Use the logged-in user's email as needed
    console.log(email);
    // Continue with further logic or redirect to another page
  }

  return (
    <div className="content">
      <div id="left">
        <div className="left-content">
          <h2>Welcome Back</h2>
          <p>Login To Your account</p>
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
                  src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                />
                Google
              </a>
            </div>
          </div>
          <div className="separate">
            <p>or continue with</p>
          </div>
          <form onSubmit={submitForm}>
            <input type="email" placeholder="email" id="email" name="email" />
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
              Don't have an account? <span><a href="../Registration">Register</a></span>
            </p>
          </div>
        </div>
      </div>
      <div id="right"></div>
    </div>
  );
}

export default Login;
