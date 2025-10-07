import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    alert("If this email is registered, a reset link has been sent.");
  };

  const handleCancel = () => {
    navigate("/login");
  };

  // ✅ Background image added here
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: 'url("/bg-image.jpg")', // ✅ Correct path for public folder
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "400px",
    background: "rgba(14, 23, 47, 0.85)", // 🟡 Same semi-transparent effect as signup
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
    animation: "fadeIn 0.5s ease-in-out",
    color: "#fff",
  };

  const headingStyle = {
    color: "white",
    fontSize: "24px",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "12px",
  };

  const subTextStyle = {
    color: "#9ca3af",
    fontSize: "14px",
    textAlign: "center",
    marginBottom: "20px",
    lineHeight: "1.4",
  };

  const labelStyle = {
    display: "block",
    color: "#9ca3af",
    fontSize: "14px",
    marginBottom: "6px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    backgroundColor: "#1a1f25",
    border: "none",
    color: "white",
    fontSize: "14px",
    outline: "none",
    marginBottom: "16px",
  };

  const buttonPrimaryStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    background: "linear-gradient(to right, #3b82f6, #2563eb)",
    color: "white",
    fontWeight: "500",
    fontSize: "15px",
    border: "none",
    cursor: "pointer",
    marginBottom: "12px",
    transition: "opacity 0.3s ease",
  };

  const buttonSecondaryStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    background: "#1a1f25",
    color: "#d1d5db",
    fontSize: "15px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Forgot Your Password?</h2>
        <p style={subTextStyle}>
          Enter your registered email below and we'll send you a reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor='email' style={labelStyle}>
            Email Address
          </label>
          <input
            id='email'
            type='email'
            placeholder='you@example.com'
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type='submit'
            style={buttonPrimaryStyle}
            onMouseOver={(e) => (e.target.style.opacity = "0.85")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Send Reset Link
          </button>

          <button
            type='button'
            onClick={handleCancel}
            style={buttonSecondaryStyle}
            onMouseOver={(e) => (e.target.style.background = "#222830")}
            onMouseOut={(e) => (e.target.style.background = "#1a1f25")}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
