import React, { useState } from 'react';
import { REGISTRATION } from '../server/config';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Registration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: '',
    organizationName: '',
  });

  const [passwordError, setPasswordError] = useState(false); // State to track password error
  const [confirmPasswordError, setConfirmPasswordError] = useState(false); // State to track confirm password error
  const [fieldsError, setFieldsError] = useState(false); // State to track empty fields error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    // Check if any field is left empty
    if (Object.values(formData).some(value => value === '')) {
      setFieldsError(true);
      return;
    }

    // Check if password is too short
    if (formData.password.length < 6) {
      setPasswordError(true); // Set password error state to true
      return; // Stop further execution
    }

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    try {
      const response = await fetch(`${REGISTRATION}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("User signed up successfully!");
        // Redirect to login page
        window.location.href = "./login";
      } else {
        console.error("Error signing up:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  return (
    <div className="center">
      <div className="content">
        <h2>Set up your account</h2>
        {fieldsError && ( // Render fields error alert if fieldsError state is true
          <div className="alert-container">
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error" onClose={() => setFieldsError(false)}>
                Please fill in all fields.
              </Alert>
            </Stack>
          </div>
        )}
        {passwordError && ( // Render password error alert if passwordError state is true
        <div className="alert-container">
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error" onClose={() => setPasswordError(false)}>
              Password must be at least 6 characters long.
            </Alert>
          </Stack>
          </div>
        )}
        {confirmPasswordError && (
          <div className="alert-container">
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error" onClose={() => setConfirmPasswordError(false)}>
                Password and Confirm Password must match.
              </Alert>
            </Stack>
          </div>
        )}
        <form onSubmit={submitForm}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
          >
            <option value="" selected disabled>Account Type</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            placeholder="Organization Name"
          />
          <input
            type="submit"
            name="submit"
            id="submit"
            value="Continue"
          />
        </form>
      </div>
    </div>
  );
}

export default Registration;
