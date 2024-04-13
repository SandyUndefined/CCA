import React, { useState } from 'react';
import { REGISTRATION } from '../server/config';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (event) => {
  event.preventDefault();
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

  // const submitForm = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch(`${SERVER_URL}/user/signup`, { // SERVER_URL
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     if (response.ok) {
  //       console.log("User signed up successfully!");
  //       // Redirect to login page
  //       window.location.href = "../login/index.html";
  //     } else {
  //       console.error("Error signing up:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };


  return (
    <div className="center">
      <div className="content">
        <h2>Set up your account</h2>
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
