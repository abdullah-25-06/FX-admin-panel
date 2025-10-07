import React from "react";
import { Search, Bell, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // ✅ Logout function
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      navigate("/login");
    }
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#0e172f",
    color: "#fff",
    borderBottom: "1px solid #1e2a47",
  };

  const searchBarStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#1a2340",
    borderRadius: "5px",
    padding: "5px 10px",
    width: "250px",
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#fff",
    marginLeft: "8px",
    width: "100%",
  };

  const headerRightStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  const adminDropdownStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    backgroundColor: "#1a2340",
    padding: "6px 10px",
    borderRadius: "6px",
  };

  const avatarStyle = {
    backgroundColor: "#1d7ef3",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
  };

  const logoutButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "linear-gradient(to right, #f85032, #e73827)",
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  };

  return (
    <div style={headerStyle}>
      {/* 🔍 Search bar */}
      <div style={searchBarStyle}>
        <Search size={18} />
        <input type='text' placeholder='Search...' style={inputStyle} />
      </div>

      {/* 🔔 Profile + Logout */}
      <div style={headerRightStyle}>
        <div className='header-icon'>
          <Bell size={18} />
        </div>

        <div style={adminDropdownStyle}>
          <div style={avatarStyle}>A</div>
          <span>admin</span>
          <ChevronDown size={16} />
        </div>

        {/* 🚪 Logout Button */}
        <button onClick={handleLogout} style={logoutButtonStyle}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
