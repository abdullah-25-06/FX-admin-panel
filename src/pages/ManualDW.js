import React, { useState } from "react";
import { Bell } from "lucide-react";

const ManualDW = () => {
  const [formData, setFormData] = useState({
    account: "",
    display: "",
    amount: "",
    remark: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.account ||
      !formData.display ||
      !formData.amount ||
      !formData.remark
    ) {
      setMessage("⚠️ Please fill all fields before submitting!");
      return;
    }

    console.log("Manual D/W Submitted:", formData);
    setMessage("✅ Manual Deposit/Withdraw Submitted Successfully!");

    setFormData({
      account: "",
      display: "",
      amount: "",
      remark: "",
    });

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e0e0e0",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: "0",
            }}
          >
            ☰
          </button>
          <h1
            style={{
              fontSize: "18px",
              margin: "0",
              color: "#ff6b6b",
              fontWeight: "normal",
            }}
          >
            MANAGEMENT SYSTEM
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: "13px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#666" }}>online</span>
            <span style={{ fontWeight: "600" }}>1</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#666" }}>top up</span>
            <span style={{ fontWeight: "600" }}>4</span>
            <Bell size={16} color='#4a90e2' />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#666" }}>Withdraw money</span>
            <span style={{ fontWeight: "600" }}>4</span>
            <Bell size={16} color='#4a90e2' />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#666" }}>Order</span>
            <span style={{ fontWeight: "600" }}>0</span>
            <Bell size={16} color='#4a90e2' />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#666" }}>admin</span>
            <span style={{ color: "#999" }}>▼</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Manual Deposit/Withdraw
        </h2>

        {message && (
          <div
            style={{
              marginBottom: "20px",
              padding: "12px 16px",
              borderRadius: "4px",
              color: "white",
              backgroundColor: message.startsWith("⚠️") ? "#e74c3c" : "#27ae60",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            borderRadius: "4px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            maxWidth: "600px",
          }}
        >
          {/* Account */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "500",
                marginBottom: "8px",
                color: "#333",
                fontSize: "14px",
              }}
            >
              Account
            </label>
            <input
              type='text'
              name='account'
              value={formData.account}
              onChange={handleChange}
              placeholder='Enter account name'
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "13px",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#4a90e2")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* Display */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "500",
                marginBottom: "8px",
                color: "#333",
                fontSize: "14px",
              }}
            >
              Whether it is shown
            </label>
            <select
              name='display'
              value={formData.display}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "13px",
                outline: "none",
                backgroundColor: "white",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#4a90e2")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            >
              <option value=''>-- Select --</option>
              <option value='display'>Display</option>
              <option value='hide'>Hide</option>
            </select>
          </div>

          {/* Operation Amount */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "500",
                marginBottom: "8px",
                color: "#333",
                fontSize: "14px",
              }}
            >
              Operation Amount
            </label>
            <input
              type='number'
              name='amount'
              value={formData.amount}
              onChange={handleChange}
              placeholder='Positive = Increase, Negative = Decrease'
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "13px",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#4a90e2")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* Remark */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "500",
                marginBottom: "8px",
                color: "#333",
                fontSize: "14px",
              }}
            >
              Remark
            </label>
            <input
              type='text'
              name='remark'
              value={formData.remark}
              onChange={handleChange}
              placeholder='Please enter a comment'
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "13px",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#4a90e2")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            style={{
              padding: "8px 24px",
              backgroundColor: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#229954")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#27ae60")}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManualDW;
