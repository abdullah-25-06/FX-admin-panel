import React, { useState } from "react";

const BasicSettings = () => {
  const [settings, setSettings] = useState({
    websiteName: "UNOCON",
    onlineCustomerService: "https://1.me/nextech2",
    whatsappCustomerService: "[---> AetLightplapp.php?widget-mobile <--]",
    logoFile: null,
    iosAppFile: null,
    androidAppFile: null,
    smsAccount: "kainbd564",
    smsKey: "c7f03ca45c7b4e7697ac73c77e7bf8f1",
    smsTemplate: "",
    emailAccount: "xiaozhangzhangdan@gmail.com",
    emailPassword: "wdxb0nafdsvmpzu",
    emailTeamName: "CryptoL",
  });

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (field, file) => {
    setSettings((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings saved:", settings);
    alert("Basic settings saved successfully!");
  };

  const styles = {
    container: {
      padding: "15px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
      "@media (min-width: 768px)": {
        padding: "20px",
      },
    },
    header: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "15px",
      "@media (min-width: 768px)": {
        padding: "20px",
        marginBottom: "20px",
      },
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "10px",
      "@media (min-width: 768px)": {
        fontSize: "24px",
      },
    },
    section: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "15px",
      "@media (min-width: 768px)": {
        padding: "25px",
        marginBottom: "20px",
      },
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "15px",
      paddingBottom: "8px",
      borderBottom: "2px solid #f0f0f0",
      "@media (min-width: 768px)": {
        fontSize: "18px",
        marginBottom: "20px",
        paddingBottom: "10px",
      },
    },
    inputGroup: {
      marginBottom: "15px",
      "@media (min-width: 768px)": {
        marginBottom: "20px",
      },
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "600",
      color: "#333",
      fontSize: "13px",
      "@media (min-width: 768px)": {
        fontSize: "14px",
        marginBottom: "8px",
      },
    },
    input: {
      width: "100%",
      padding: "8px 10px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      fontSize: "13px",
      transition: "border-color 0.2s",
      boxSizing: "border-box",
      "@media (min-width: 768px)": {
        padding: "10px 12px",
        fontSize: "14px",
      },
    },
    inputFocus: {
      borderColor: "#007bff",
      outline: "none",
    },
    tip: {
      fontSize: "11px",
      color: "#666",
      marginTop: "4px",
      fontStyle: "italic",
      lineHeight: "1.4",
      "@media (min-width: 768px)": {
        fontSize: "12px",
        marginTop: "5px",
      },
    },
    fileInputGroup: {
      marginBottom: "15px",
      padding: "12px",
      border: "1px dashed #ddd",
      borderRadius: "6px",
      backgroundColor: "#fafafa",
      "@media (min-width: 768px)": {
        padding: "15px",
        marginBottom: "20px",
      },
    },
    fileInput: {
      marginBottom: "6px",
      width: "100%",
      "@media (min-width: 768px)": {
        marginBottom: "8px",
      },
    },
    fileName: {
      fontSize: "11px",
      color: "#666",
      marginTop: "4px",
      wordBreak: "break-all",
      "@media (min-width: 768px)": {
        fontSize: "12px",
        marginTop: "5px",
      },
    },
    submitButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.2s",
      fontWeight: "600",
      width: "100%",
      "@media (min-width: 768px)": {
        width: "auto",
        padding: "12px 30px",
        fontSize: "16px",
      },
    },
    submitButtonHover: {
      backgroundColor: "#0056b3",
    },
    gridContainer: {
      display: "grid",
      gap: "15px",
      "@media (min-width: 768px)": {
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
      },
    },
    fullWidth: {
      gridColumn: "1 / -1",
    },
  };

  const handleButtonHover = (e, hoverStyle) => {
    e.target.style.backgroundColor = hoverStyle.backgroundColor;
  };

  const handleButtonLeave = (e, originalColor) => {
    e.target.style.backgroundColor = originalColor;
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = styles.inputFocus.borderColor;
    e.target.style.outline = styles.inputFocus.outline;
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = styles.input.border;
  };

  // Apply responsive styles dynamically
  const responsiveStyles = {
    ...styles,
    container: {
      padding: "15px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
      "@media (min-width: 768px)": {
        padding: "20px",
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Basic Settings</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Website Basic Settings Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Website Basic Settings</h2>

          <div style={styles.gridContainer}>
            <div style={styles.fullWidth}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Website Name</label>
                <input
                  type='text'
                  value={settings.websiteName}
                  onChange={(e) =>
                    handleInputChange("websiteName", e.target.value)
                  }
                  style={styles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>

            <div style={styles.fullWidth}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Online Customer Service</label>
                <input
                  type='url'
                  value={settings.onlineCustomerService}
                  onChange={(e) =>
                    handleInputChange("onlineCustomerService", e.target.value)
                  }
                  style={styles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder='https://example.com'
                />
                <div style={styles.tip}>
                  Enter your online customer service URL
                </div>
              </div>
            </div>

            <div style={styles.fullWidth}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>WhatsApp Customer Service</label>
                <input
                  type='text'
                  value={settings.whatsappCustomerService}
                  onChange={(e) =>
                    handleInputChange("whatsappCustomerService", e.target.value)
                  }
                  style={styles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <div style={styles.tip}>
                  System customer service link: [--&gt;
                  AetLightplapp.php?widget-mobile &lt;--]
                </div>
              </div>
            </div>
          </div>

          {/* File Uploads */}
          <div style={styles.gridContainer}>
            <div style={styles.fullWidth}>
              <div style={styles.fileInputGroup}>
                <label style={styles.label}>LOGO</label>
                <input
                  type='file'
                  onChange={(e) =>
                    handleFileChange("logoFile", e.target.files[0])
                  }
                  style={styles.fileInput}
                  accept='.png'
                />
                <div style={styles.fileName}>
                  {settings.logoFile
                    ? settings.logoFile.name
                    : "No file chosen"}
                </div>
                <div style={styles.tip}>Tip: PNG format</div>
              </div>
            </div>

            <div>
              <div style={styles.fileInputGroup}>
                <label style={styles.label}>IOS App</label>
                <input
                  type='file'
                  onChange={(e) =>
                    handleFileChange("iosAppFile", e.target.files[0])
                  }
                  style={styles.fileInput}
                  accept='.mobileconfig'
                />
                <div style={styles.fileName}>
                  {settings.iosAppFile
                    ? settings.iosAppFile.name
                    : "No file chosen"}
                </div>
                <div style={styles.tip}>Tip: Mobileconfig Format</div>
              </div>
            </div>

            <div>
              <div style={styles.fileInputGroup}>
                <label style={styles.label}>Android App</label>
                <input
                  type='file'
                  onChange={(e) =>
                    handleFileChange("androidAppFile", e.target.files[0])
                  }
                  style={styles.fileInput}
                  accept='.apk'
                />
                <div style={styles.fileName}>
                  {settings.androidAppFile
                    ? settings.androidAppFile.name
                    : "No file chosen"}
                </div>
                <div style={styles.tip}>Tip: APK format</div>
              </div>
            </div>
          </div>
        </div>

        {/* SMS Settings Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>SMS Settings</h2>

          <div style={styles.gridContainer}>
            <div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>SMS account</label>
                <input
                  type='text'
                  value={settings.smsAccount}
                  onChange={(e) =>
                    handleInputChange("smsAccount", e.target.value)
                  }
                  style={styles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder='e.g., kainbd564'
                />
                <div style={styles.tip}>Fill in SMS account</div>
              </div>
            </div>

            <div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>SMS Treasure Key</label>
                <input
                  type='text'
                  value={settings.smsKey}
                  onChange={(e) => handleInputChange("smsKey", e.target.value)}
                  style={styles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder='e.g., c7f03ca45c7b4e7697ac73c77e7bf8f1'
                />
                <div style={styles.tip}>Fill in the SMS key</div>
              </div>
            </div>

            <div style={styles.fullWidth}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>SMS template</label>
                <textarea
                  value={settings.smsTemplate}
                  onChange={(e) =>
                    handleInputChange("smsTemplate", e.target.value)
                  }
                  style={{
                    ...styles.input,
                    minHeight: "80px",
                    resize: "vertical",
                  }}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder='Enter your SMS template here'
                />
                <div style={styles.tip}>Fill in the SMS template</div>
              </div>
            </div>
          </div>
        </div>

        {/* Email Settings Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Email Settings</h2>

          <div style={styles.gridContainer}>
            <div style={styles.fullWidth}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Sending email account</label>
                <input
                  type='email'
                  value={settings.emailAccount}
                  onChange={(e) =>
                    handleInputChange("emailAccount", e.target.value)
                  }
                  style={styles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder='e.g., xiaozhangzhangdan@gmail.com'
                />
                <div style={styles.tip}>Fill in the sending email account</div>
              </div>
            </div>

            <div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email-specific password</label>
                <input
                  type='password'
                  value={settings.emailPassword}
                  onChange={(e) =>
                    handleInputChange("emailPassword", e.target.value)
                  }
                  style={styles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder='Enter your email password'
                />
                <div style={styles.tip}>Enter your email password</div>
              </div>
            </div>

            <div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Team Name</label>
                <input
                  type='text'
                  value={settings.emailTeamName}
                  onChange={(e) =>
                    handleInputChange("emailTeamName", e.target.value)
                  }
                  style={styles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder='e.g., CryptoL'
                />
                <div style={styles.tip}>Fill in the email team name</div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div style={styles.section}>
          <div style={{ textAlign: "center" }}>
            <button
              type='submit'
              style={styles.submitButton}
              onMouseOver={(e) =>
                handleButtonHover(e, styles.submitButtonHover)
              }
              onMouseOut={(e) =>
                handleButtonLeave(e, styles.submitButton.backgroundColor)
              }
            >
              Save Settings
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicSettings;
