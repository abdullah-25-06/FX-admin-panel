import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    console.log("Signup successful:", formData);

    navigate("/login");
  };

  // ✅ Background image inline style
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: 'url("/bg-image.jpg")', // ✅ Correct path for public folder
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    fontFamily: "Arial, sans-serif",
  };

  const boxStyle = {
    backgroundColor: "rgba(14, 23, 47, 0.85)", // semi-transparent overlay
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

  const passwordContainerStyle = { position: "relative" };

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

  const errorStyle = {
    color: "#ff5555",
    fontSize: "13px",
    marginBottom: "10px",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={boxStyle}>
        <div style={titleStyle}>Sign Up</div>

        {error && <div style={errorStyle}>{error}</div>}

        <input
          type='text'
          name='fullName'
          placeholder='Enter full name'
          style={inputStyle}
          value={formData.fullName}
          onChange={handleChange}
        />

        <input
          type='email'
          name='email'
          placeholder='Enter email'
          style={inputStyle}
          value={formData.email}
          onChange={handleChange}
        />

        <div style={passwordContainerStyle}>
          <input
            type={showPassword ? "text" : "password"}
            name='password'
            placeholder='Enter password'
            style={inputStyle}
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type='button'
            style={showButtonStyle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <input
          type={showPassword ? "text" : "password"}
          name='confirmPassword'
          placeholder='Confirm password'
          style={inputStyle}
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button type='submit' style={buttonStyle}>
          Sign Up
        </button>

        <div style={footerTextStyle}>
          Already have an account?
          <span style={linkStyle} onClick={() => navigate("/login")}>
            Log in
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
