import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // ✅ Get stored signup data
    const storedEmail = localStorage.getItem("registeredEmail");
    const storedPassword = localStorage.getItem("registeredPassword");

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "url('/bg-image.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    fontFamily: "Arial, sans-serif",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0,
  };

  const formWrapperStyle = {
    position: "relative",
    zIndex: 1,
  };

  const boxStyle = {
    backgroundColor: "rgba(14, 23, 47, 0.9)",
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
    color: "#fff",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "left",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #1E2A47",
    backgroundColor: "#1A2340",
    color: "#fff",
    outline: "none",
  };

  const passwordContainerStyle = {
    position: "relative",
  };

  const showButtonStyle = {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#aaa",
    cursor: "pointer",
    fontSize: "12px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    background: "linear-gradient(to right, #0fd850, #1d7ef3)",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "5px",
  };

  const footerTextStyle = {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px",
  };

  const linkStyle = {
    color: "#1d7ef3",
    textDecoration: "none",
    marginLeft: "5px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <div style={formWrapperStyle}>
        <form onSubmit={handleSubmit} style={boxStyle}>
          <div style={titleStyle}>Login</div>

          {error && (
            <div
              style={{
                color: "#ff5555",
                fontSize: "13px",
                marginBottom: "10px",
              }}
            >
              {error}
            </div>
          )}

          <input
            type='email'
            placeholder='Enter email'
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={passwordContainerStyle}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Enter password'
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type='button'
              style={showButtonStyle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type='submit' style={buttonStyle}>
            Login
          </button>

          <div style={footerTextStyle}>
            Don’t have an account?
            <span style={linkStyle} onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </div>

          <div style={footerTextStyle}>
            Forgot your password?
            <span
              style={linkStyle}
              onClick={() => navigate("/forgot-password")}
            >
              Reset it here
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
