import React, { useState } from "react";

const RiskManagement = () => {
  const [lossCustomerIds, setLossCustomerIds] = useState("");
  const [profitCustomerIds, setProfitCustomerIds] = useState("");
  const [minRiskControl, setMinRiskControl] = useState("");
  const [riskControlProbability, setRiskControlProbability] = useState("");

  const [timeSettings, setTimeSettings] = useState({
    time1: { takeProfit: "10.20", stopLoss: "20.30" },
    time2: { takeProfit: "20.30", stopLoss: "20.30" },
    time3: { takeProfit: "30.40", stopLoss: "20.30" },
    time4: { takeProfit: "40.50", stopLoss: "20.30" },
  });

  const handleTimeSettingChange = (time, field, value) => {
    setTimeSettings((prev) => ({
      ...prev,
      [time]: {
        ...prev[time],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      lossCustomerIds,
      profitCustomerIds,
      timeSettings,
      minRiskControl,
      riskControlProbability,
    });
    alert("Settings saved successfully!");
  };

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    },
    header: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "20px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "10px",
    },
    section: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#d32f2f",
      marginBottom: "15px",
    },
    sectionTitleProfit: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#2e7d32",
      marginBottom: "15px",
    },
    note: {
      backgroundColor: "#fff3e0",
      padding: "15px",
      borderRadius: "6px",
      borderLeft: "4px solid #ff9800",
      marginBottom: "20px",
      fontSize: "14px",
      color: "#333",
    },
    inputGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      padding: "12px",
      textAlign: "left",
      fontWeight: "bold",
      color: "#333",
      borderBottom: "2px solid #dee2e6",
    },
    tableCell: {
      padding: "12px",
      borderBottom: "1px solid #dee2e6",
      color: "#555",
    },
    timeInput: {
      width: "80px",
      padding: "8px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      textAlign: "center",
    },
    submitButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "12px 30px",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    submitButtonHover: {
      backgroundColor: "#0056b3",
    },
  };

  const handleButtonHover = (e, hoverStyle) => {
    e.target.style.backgroundColor = hoverStyle.backgroundColor;
  };

  const handleButtonLeave = (e, originalColor) => {
    e.target.style.backgroundColor = originalColor;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Risk Management</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Designated Customer Losses Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Designated Customer Losses</h2>
          <div style={styles.note}>
            <strong>Note:</strong> Set a member ID here (e.g., 8888). Use the |
            symbol to separate multiple users (e.g., 8888|9999). All orders
            placed by that member will be at a loss. Please proceed with
            caution. To disable this feature, leave it blank or enter 0 and
            submit.
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Customer IDs for Loss:</label>
            <input
              type='text'
              value={lossCustomerIds}
              onChange={(e) => setLossCustomerIds(e.target.value)}
              placeholder='e.g., 8888|9999'
              style={styles.input}
            />
          </div>
        </div>

        {/* Designated Customer Profit Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitleProfit}>Designated Customer Profit</h2>
          <div style={styles.note}>
            <strong>Note:</strong> Set your member ID here (e.g., 8888). Use the
            | symbol to separate multiple users (e.g., 8888|9999). Once this is
            set, all orders placed by that member will be profitable. Please
            proceed with caution. To disable this feature, leave it blank or
            fill in 0 and submit.
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Customer IDs for Profit:</label>
            <input
              type='text'
              value={profitCustomerIds}
              onChange={(e) => setProfitCustomerIds(e.target.value)}
              placeholder='e.g., 8888|9999'
              style={styles.input}
            />
          </div>

          {/* Time Settings Table */}
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Time</th>
                <th style={styles.tableHeader}>Take Profit</th>
                <th style={styles.tableHeader}>Value</th>
                <th style={styles.tableHeader}>Stop Loss</th>
                <th style={styles.tableHeader}>Value</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((time) => (
                <tr key={time}>
                  <td style={styles.tableCell}>Time {time} (%)</td>
                  <td style={styles.tableCell}>Take Profit</td>
                  <td style={styles.tableCell}>
                    <input
                      type='text'
                      value={timeSettings[`time${time}`].takeProfit}
                      onChange={(e) =>
                        handleTimeSettingChange(
                          `time${time}`,
                          "takeProfit",
                          e.target.value
                        )
                      }
                      style={styles.timeInput}
                    />
                  </td>
                  <td style={styles.tableCell}>Stop Loss</td>
                  <td style={styles.tableCell}>
                    <input
                      type='text'
                      value={timeSettings[`time${time}`].stopLoss}
                      onChange={(e) =>
                        handleTimeSettingChange(
                          `time${time}`,
                          "stopLoss",
                          e.target.value
                        )
                      }
                      style={styles.timeInput}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Risk Control Settings */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Risk Control Settings</h2>

          {/* Minimum Risk Control Value */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Minimum risk control value</label>
            <div style={styles.note}>
              <strong>Note:</strong> Orders reaching this amount will be
              affected by the following risk control measures.
            </div>
            <input
              type='number'
              value={minRiskControl}
              onChange={(e) => setMinRiskControl(e.target.value)}
              placeholder='Enter minimum amount'
              style={styles.input}
            />
          </div>

          {/* Risk Control Probability */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Risk control probability</label>
            <div style={styles.note}>
              <strong>Note:</strong> Enter an amount range. Profits and losses
              will be calculated based on this probability within the amount
              range. If the amount is not within this range, it will not be
              affected by risk control.
              <br />
              <strong>Format:</strong> Range Start – Range End:Customer Profit
              Probability / Symbols must be English symbols, such as
              0–100:50/100–200:30
            </div>
            <input
              type='text'
              value={riskControlProbability}
              onChange={(e) => setRiskControlProbability(e.target.value)}
              placeholder='e.g., 0-100:50/100-200:30'
              style={styles.input}
            />
            <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
              Example:
              10-1000:50/1000-2000:30/2000-5000:20/5000-10000:10/10000-100000:5
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div style={styles.section}>
          <button
            type='submit'
            style={styles.submitButton}
            onMouseOver={(e) => handleButtonHover(e, styles.submitButtonHover)}
            onMouseOut={(e) =>
              handleButtonLeave(e, styles.submitButton.backgroundColor)
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RiskManagement;
