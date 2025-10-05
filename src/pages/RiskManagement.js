import React, { useState, useEffect } from "react";

const RiskManagement = () => {
  // State for all form fields
  const [lossCustomerIds, setLossCustomerIds] = useState("");
  const [profitCustomerIds, setProfitCustomerIds] = useState("");
  const [minRiskControl, setMinRiskControl] = useState("");
  const [riskControlProbability, setRiskControlProbability] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Time settings state
  const [timeSettings, setTimeSettings] = useState({
    time1: { takeProfit: "10.20", stopLoss: "20.30" },
    time2: { takeProfit: "20.30", stopLoss: "20.30" },
    time3: { takeProfit: "30.40", stopLoss: "20.30" },
    time4: { takeProfit: "40.50", stopLoss: "20.30" },
  });

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("riskManagementSettings");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setLossCustomerIds(parsedData.lossCustomerIds || "");
        setProfitCustomerIds(parsedData.profitCustomerIds || "");
        setMinRiskControl(parsedData.minRiskControl || "");
        setRiskControlProbability(parsedData.riskControlProbability || "");
        setTimeSettings(
          parsedData.timeSettings || {
            time1: { takeProfit: "10.20", stopLoss: "20.30" },
            time2: { takeProfit: "20.30", stopLoss: "20.30" },
            time3: { takeProfit: "30.40", stopLoss: "20.30" },
            time4: { takeProfit: "40.50", stopLoss: "20.30" },
          }
        );
      } catch (error) {
        console.error("Error loading saved settings:", error);
      }
    }
  }, []);

  // Validation functions
  const validateCustomerIds = (ids) => {
    if (!ids.trim()) return true; // Empty is allowed
    const idPattern = /^(\d+)(\|\d+)*$/;
    return idPattern.test(ids);
  };

  const validateProbabilityFormat = (probability) => {
    if (!probability.trim()) return true; // Empty is allowed

    const segments = probability.split("/");
    const segmentPattern = /^\d+-\d+:\d+$/;

    for (const segment of segments) {
      if (!segmentPattern.test(segment.trim())) {
        return false;
      }

      // Check if range start <= range end
      const [range, prob] = segment.split(":");
      const [start, end] = range.split("-").map(Number);

      if (start >= end) {
        return false;
      }

      if (prob < 0 || prob > 100) {
        return false;
      }
    }

    return true;
  };

  const validateTimeSettings = (settings) => {
    for (const time in settings) {
      const { takeProfit, stopLoss } = settings[time];
      const tp = parseFloat(takeProfit);
      const sl = parseFloat(stopLoss);

      if (isNaN(tp) || isNaN(sl) || tp < 0 || sl < 0) {
        return false;
      }
    }
    return true;
  };

  // Handle time setting changes with validation
  const handleTimeSettingChange = (time, field, value) => {
    // Allow only numbers and decimal points
    const numericValue = value.replace(/[^0-9.]/g, "");

    setTimeSettings((prev) => ({
      ...prev,
      [time]: {
        ...prev[time],
        [field]: numericValue,
      },
    }));

    // Clear errors for this field
    if (errors.timeSettings) {
      setErrors((prev) => ({
        ...prev,
        timeSettings: undefined,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSaveMessage("");
    setErrors({});

    // Validate all fields
    const newErrors = {};

    // Validate customer IDs
    if (!validateCustomerIds(lossCustomerIds)) {
      newErrors.lossCustomerIds =
        "Invalid format. Use numbers separated by | (e.g., 8888|9999)";
    }

    if (!validateCustomerIds(profitCustomerIds)) {
      newErrors.profitCustomerIds =
        "Invalid format. Use numbers separated by | (e.g., 8888|9999)";
    }

    // Validate time settings
    if (!validateTimeSettings(timeSettings)) {
      newErrors.timeSettings =
        "All time settings must be valid positive numbers";
    }

    // Validate probability format
    if (!validateProbabilityFormat(riskControlProbability)) {
      newErrors.riskControlProbability =
        "Invalid format. Use format: start-end:probability (e.g., 0-100:50)";
    }

    // If there are errors, stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Prepare data for saving
      const formData = {
        lossCustomerIds,
        profitCustomerIds,
        minRiskControl,
        riskControlProbability,
        timeSettings,
        lastUpdated: new Date().toISOString(),
      };

      // Save to localStorage (simulating database save)
      localStorage.setItem("riskManagementSettings", JSON.stringify(formData));

      setSaveMessage("Settings saved successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error saving settings. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to default values
  const handleReset = () => {
    setLossCustomerIds("");
    setProfitCustomerIds("");
    setMinRiskControl("");
    setRiskControlProbability("");
    setTimeSettings({
      time1: { takeProfit: "10.20", stopLoss: "20.30" },
      time2: { takeProfit: "20.30", stopLoss: "20.30" },
      time3: { takeProfit: "30.40", stopLoss: "20.30" },
      time4: { takeProfit: "40.50", stopLoss: "20.30" },
    });
    setErrors({});
    setSaveMessage("");
    localStorage.removeItem("riskManagementSettings");
  };

  // Calculate statistics for display
  const getStatistics = () => {
    const lossCustomers = lossCustomerIds
      ? lossCustomerIds.split("|").filter((id) => id.trim()).length
      : 0;
    const profitCustomers = profitCustomerIds
      ? profitCustomerIds.split("|").filter((id) => id.trim()).length
      : 0;

    const totalProbabilitySegments = riskControlProbability
      ? riskControlProbability.split("/").length
      : 0;

    return {
      lossCustomers,
      profitCustomers,
      totalProbabilitySegments,
      totalTimeSettings: Object.keys(timeSettings).length,
    };
  };

  const stats = getStatistics();

  // Enhanced styles
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
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "0",
    },
    stats: {
      display: "flex",
      gap: "15px",
      fontSize: "14px",
      color: "#666",
    },
    statItem: {
      padding: "5px 10px",
      backgroundColor: "#f8f9fa",
      borderRadius: "4px",
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
      transition: "border-color 0.2s",
    },
    inputError: {
      borderColor: "#d32f2f",
      backgroundColor: "#ffebee",
    },
    errorText: {
      color: "#d32f2f",
      fontSize: "12px",
      marginTop: "5px",
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
      transition: "border-color 0.2s",
    },
    timeInputError: {
      borderColor: "#d32f2f",
      backgroundColor: "#ffebee",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
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
      minWidth: "120px",
    },
    submitButtonDisabled: {
      backgroundColor: "#6c757d",
      cursor: "not-allowed",
    },
    submitButtonHover: {
      backgroundColor: "#0056b3",
    },
    resetButton: {
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    resetButtonHover: {
      backgroundColor: "#545b62",
    },
    successMessage: {
      backgroundColor: "#d4edda",
      color: "#155724",
      padding: "10px 15px",
      borderRadius: "4px",
      border: "1px solid #c3e6cb",
      marginBottom: "15px",
    },
    loadingMessage: {
      backgroundColor: "#d1ecf1",
      color: "#0c5460",
      padding: "10px 15px",
      borderRadius: "4px",
      border: "1px solid #bee5eb",
      marginBottom: "15px",
    },
  };

  // Hover handlers for buttons
  const handleButtonHover = (e, hoverStyle) => {
    if (!isSubmitting) {
      e.target.style.backgroundColor = hoverStyle.backgroundColor;
    }
  };

  const handleButtonLeave = (e, originalColor) => {
    e.target.style.backgroundColor = originalColor;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Risk Management</h1>
        <div style={styles.stats}>
          <div style={styles.statItem}>
            Loss Customers: {stats.lossCustomers}
          </div>
          <div style={styles.statItem}>
            Profit Customers: {stats.profitCustomers}
          </div>
          <div style={styles.statItem}>
            Probability Segments: {stats.totalProbabilitySegments}
          </div>
        </div>
      </div>

      {saveMessage && (
        <div
          style={
            saveMessage.includes("Error")
              ? styles.loadingMessage
              : styles.successMessage
          }
        >
          {saveMessage}
        </div>
      )}

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
              onChange={(e) => {
                setLossCustomerIds(e.target.value);
                if (errors.lossCustomerIds) {
                  setErrors((prev) => ({
                    ...prev,
                    lossCustomerIds: undefined,
                  }));
                }
              }}
              placeholder='e.g., 8888|9999'
              style={{
                ...styles.input,
                ...(errors.lossCustomerIds ? styles.inputError : {}),
              }}
            />
            {errors.lossCustomerIds && (
              <div style={styles.errorText}>{errors.lossCustomerIds}</div>
            )}
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
              onChange={(e) => {
                setProfitCustomerIds(e.target.value);
                if (errors.profitCustomerIds) {
                  setErrors((prev) => ({
                    ...prev,
                    profitCustomerIds: undefined,
                  }));
                }
              }}
              placeholder='e.g., 8888|9999'
              style={{
                ...styles.input,
                ...(errors.profitCustomerIds ? styles.inputError : {}),
              }}
            />
            {errors.profitCustomerIds && (
              <div style={styles.errorText}>{errors.profitCustomerIds}</div>
            )}
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
                      style={{
                        ...styles.timeInput,
                        ...(errors.timeSettings ? styles.timeInputError : {}),
                      }}
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
                      style={{
                        ...styles.timeInput,
                        ...(errors.timeSettings ? styles.timeInputError : {}),
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {errors.timeSettings && (
            <div style={styles.errorText}>{errors.timeSettings}</div>
          )}
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
              min='0'
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
              onChange={(e) => {
                setRiskControlProbability(e.target.value);
                if (errors.riskControlProbability) {
                  setErrors((prev) => ({
                    ...prev,
                    riskControlProbability: undefined,
                  }));
                }
              }}
              placeholder='e.g., 0-100:50/100-200:30'
              style={{
                ...styles.input,
                ...(errors.riskControlProbability ? styles.inputError : {}),
              }}
            />
            {errors.riskControlProbability && (
              <div style={styles.errorText}>
                {errors.riskControlProbability}
              </div>
            )}
            <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
              Example:
              10-1000:50/1000-2000:30/2000-5000:20/5000-10000:10/10000-100000:5
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div style={styles.section}>
          <div style={styles.buttonGroup}>
            <button
              type='submit'
              style={{
                ...styles.submitButton,
                ...(isSubmitting ? styles.submitButtonDisabled : {}),
              }}
              onMouseOver={(e) =>
                !isSubmitting && handleButtonHover(e, styles.submitButtonHover)
              }
              onMouseOut={(e) =>
                !isSubmitting &&
                handleButtonLeave(e, styles.submitButton.backgroundColor)
              }
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Settings"}
            </button>

            <button
              type='button'
              style={styles.resetButton}
              onMouseOver={(e) => handleButtonHover(e, styles.resetButtonHover)}
              onMouseOut={(e) =>
                handleButtonLeave(e, styles.resetButton.backgroundColor)
              }
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Reset to Default
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RiskManagement;
