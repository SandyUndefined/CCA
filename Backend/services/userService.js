const User = require('../models/userModel');
const db = require('../config/database');

// Create a user
const createUser = async function createUser(userData) {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Find user by email
const findUserByEmail = async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};
// Find user by ID
const findUserById = async function (userId) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw error;
  }
};

// Verify a user
const verifyUser = async function verifyUser(email) {
  try {
    const result = await User.update(
      { is_verified: true },
      { where: { email }, returning: true }
    );
    return result[1][0];
  } catch (error) {
    console.error("Error verifying user:", error);
  }
};

// method to clear the token after use or on a new token generation
const clearResetToken = async function clearResetToken(userId) {
  const query = `UPDATE users SET reset_token = NULL, token_timestamp = NULL WHERE id = $1;`;
  try {
      await db.query(query, { bind: [userId] }); // Correctly bind the userId as a parameter
  } catch (error) {
      console.error('Error clearing reset token:', error);
      throw error;
  }
};

// Update password
const updatePassword = async function updatePassword(userId, newPassword) {
  try {
    // Find the user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    return user; // Return the updated user object
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

const updateResetToken = async function updateResetToken(userId, resetToken, tokenTimestamp) {
  try {
    const result = await User.update(
      { reset_token: resetToken, token_timestamp: tokenTimestamp },
      { where: { id: userId } }
    );
    return result; // Optionally, you can return the result of the update operation
  } catch (error) {
    console.error('Error updating reset token:', error);
    throw error;
  }
};

    
module.exports = {
  createUser,
  findUserByEmail,
  verifyUser,
  updatePassword,
  updateResetToken,
  clearResetToken,
  findUserById,
};
