const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: process.env.SENDGRID_VERIFIED_SENDER_EMAIL,
    subject: "Verify Your Email Address",
    text: `Please verify your email by clicking on the following link: ${process.env.FRONTEND_URL_EMAIL}/verify-email?token=${verificationToken}`,
    html: `<strong>Please verify your email by clicking on the following link:</strong> <a href="${process.env.FRONTEND_URL_EMAIL}/verify-email?token=${verificationToken}">Verify Email</a>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};

const sendPasswordResetEmail = async (email, resetLink) => {
  const msg = {
    to: email,
    from: process.env.SENDGRID_VERIFIED_SENDER_EMAIL,
    subject: "Password Reset Request",
    html: `Please click on the following link to reset your password: <a href="${resetLink}">Reset Password</a>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
