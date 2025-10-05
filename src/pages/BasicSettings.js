import React, { useState, useEffect, useCallback } from "react";

const BasicSettings = () => {
  const [settings, setSettings] = useState({
    websiteName: "UNOCON",
    onlineCustomerService: "https://1.me/nextech2",
    whatsappCustomerService: "[---> AetLightplapp.php?widget-mobile <--]",
    logoFile: null,
    logoPreview: null,
    iosAppFile: null,
    androidAppFile: null,
    smsAccount: "kainbd564",
    smsKey: "c7f03ca45c7b4e7697ac73c77e7bf8f1",
    smsTemplate: "",
    emailAccount: "xiaozhangzhangdan@gmail.com",
    emailPassword: "wdxb0nafdsvmpzu",
    emailTeamName: "CryptoL",
  });

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [touched, setTouched] = useState({});
  const [activeTab, setActiveTab] = useState("website");

  // Enhanced validation rules
  const validationRules = {
    websiteName: { required: true, minLength: 2, maxLength: 50 },
    onlineCustomerService: { required: false, type: "url" },
    whatsappCustomerService: { required: false },
    smsAccount: { required: true, minLength: 3 },
    smsKey: { required: true, minLength: 10 },
    emailAccount: { required: false, type: "email" },
    emailPassword: { required: true, minLength: 6 },
    emailTeamName: { required: false, maxLength: 30 },
  };

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("basicSettings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings((prev) => ({ ...prev, ...parsedSettings }));
      } catch (error) {
        console.error("Error loading saved settings:", error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (isDirty) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem("basicSettings", JSON.stringify(settings));
        setIsDirty(false);
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [settings, isDirty]);

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case "websiteName":
        if (!value.trim()) {
          newErrors.websiteName = "Website name is required";
        } else if (value.length < 2) {
          newErrors.websiteName = "Website name must be at least 2 characters";
        } else {
          delete newErrors.websiteName;
        }
        break;

      case "onlineCustomerService":
        if (value && !isValidUrl(value)) {
          newErrors.onlineCustomerService = "Please enter a valid URL";
        } else {
          delete newErrors.onlineCustomerService;
        }
        break;

      case "emailAccount":
        if (value && !isValidEmail(value)) {
          newErrors.emailAccount = "Please enter a valid email address";
        } else {
          delete newErrors.emailAccount;
        }
        break;

      case "smsAccount":
        if (!value.trim()) {
          newErrors.smsAccount = "SMS account is required";
        } else {
          delete newErrors.smsAccount;
        }
        break;

      case "smsKey":
        if (!value.trim()) {
          newErrors.smsKey = "SMS key is required";
        } else {
          delete newErrors.smsKey;
        }
        break;

      case "emailPassword":
        if (!value.trim()) {
          newErrors.emailPassword = "Email password is required";
        } else {
          delete newErrors.emailPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsDirty(true);
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Real-time validation for touched fields
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleFileChange = (field, file) => {
    if (file) {
      // Validate file types
      const validTypes = {
        logoFile: ["image/png", "image/jpeg", "image/jpg"],
        iosAppFile: ["application/x-apple-aspen-config"],
        androidAppFile: ["application/vnd.android.package-archive"],
      };

      if (validTypes[field] && !validTypes[field].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [field]: `Invalid file type. Expected: ${
            field === "logoFile"
              ? "PNG, JPG"
              : field === "iosAppFile"
              ? "MobileConfig"
              : "APK"
          }`,
        }));
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [field]: "File size must be less than 10MB",
        }));
        return;
      }

      // Generate preview for images
      if (field === "logoFile") {
        const previewUrl = URL.createObjectURL(file);
        setSettings((prev) => ({ ...prev, logoPreview: previewUrl }));
      }

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    setSettings((prev) => ({
      ...prev,
      [field]: file,
    }));
    setIsDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSaveStatus("saving");

    // Validate all fields
    const validationResults = Object.keys(settings).map((field) =>
      validateField(field, settings[field])
    );

    const isValid =
      validationResults.every((result) => result) &&
      Object.keys(errors).length === 0;

    if (!isValid) {
      alert("Please fix the errors before submitting.");
      setIsSubmitting(false);
      setSaveStatus("idle");
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save to localStorage
      localStorage.setItem("basicSettings", JSON.stringify(settings));

      console.log("Settings saved:", settings);
      setSaveStatus("saved");
      setIsDirty(false);

      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setSaveStatus("error");
      alert("Error saving settings. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (
      window.confirm("Are you sure you want to reset all settings to default?")
    ) {
      const defaultSettings = {
        websiteName: "UNOCON",
        onlineCustomerService: "https://1.me/nextech2",
        whatsappCustomerService: "[---> AetLightplapp.php?widget-mobile <--]",
        logoFile: null,
        logoPreview: null,
        iosAppFile: null,
        androidAppFile: null,
        smsAccount: "kainbd564",
        smsKey: "c7f03ca45c7b4e7697ac73c77e7bf8f1",
        smsTemplate: "",
        emailAccount: "xiaozhangzhangdan@gmail.com",
        emailPassword: "wdxb0nafdsvmpzu",
        emailTeamName: "CryptoL",
      };
      setSettings(defaultSettings);
      setErrors({});
      setTouched({});
      localStorage.removeItem("basicSettings");
      setIsDirty(false);
      setSaveStatus("idle");
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "settings-backup.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target.result);
        if (
          window.confirm(
            "Import these settings? This will overwrite your current settings."
          )
        ) {
          setSettings((prev) => ({ ...prev, ...importedSettings }));
          setIsDirty(true);
        }
      } catch (error) {
        alert("Invalid settings file. Please select a valid JSON file.");
      }
    };
    reader.readAsText(file);

    // Reset file input
    event.target.value = "";
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#007bff";
    e.target.style.outline = "none";
    e.target.style.boxShadow = "0 0 0 3px rgba(0, 123, 255, 0.1)";
  };

  const handleInputBlur = (e, field) => {
    e.target.style.borderColor = errors[field] ? "#dc3545" : "#ddd";
    e.target.style.boxShadow = "none";
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, e.target.value);
  };

  const handleButtonHover = (e, hoverStyle) => {
    e.target.style.backgroundColor = hoverStyle.backgroundColor;
    if (hoverStyle.transform) {
      e.target.style.transform = hoverStyle.transform;
    }
    if (hoverStyle.boxShadow) {
      e.target.style.boxShadow = hoverStyle.boxShadow;
    }
  };

  const handleButtonLeave = (e, originalStyle) => {
    e.target.style.backgroundColor = originalStyle.backgroundColor;
    e.target.style.transform = "none";
    e.target.style.boxShadow = "none";
  };

  const handleSectionHover = (e) => {
    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
  };

  const handleSectionLeave = (e) => {
    e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  };

  const handleFileDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = "#007bff";
    e.currentTarget.style.backgroundColor = "#ebf8ff";
  };

  const handleFileDragLeave = (e) => {
    e.currentTarget.style.borderColor = "#ddd";
    e.currentTarget.style.backgroundColor = "#fafafa";
  };

  const handleFileDrop = (e, field) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(field, files[0]);
    }
    handleFileDragLeave(e);
  };

  const styles = {
    container: {
      padding: "15px",
      fontFamily: "'Inter', Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    },
    header: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#333",
      margin: "0",
    },
    statusIndicator: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      color: "#666",
    },
    statusDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
    },
    statusSaving: { backgroundColor: "#ffc107" },
    statusSaved: { backgroundColor: "#28a745" },
    statusError: { backgroundColor: "#dc3545" },
    tabContainer: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    tab: {
      padding: "10px 20px",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "#f8f9fa",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.2s ease",
    },
    activeTab: {
      backgroundColor: "#007bff",
      color: "white",
    },
    section: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "15px",
      transition: "box-shadow 0.2s ease",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "15px",
      paddingBottom: "8px",
      borderBottom: "2px solid #f0f0f0",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    inputGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "600",
      color: "#333",
      fontSize: "13px",
    },
    required: {
      color: "#dc3545",
      marginLeft: "4px",
    },
    input: {
      width: "100%",
      padding: "8px 10px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      fontSize: "13px",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
    },
    inputError: {
      borderColor: "#dc3545",
      backgroundColor: "#fff5f5",
    },
    errorText: {
      color: "#dc3545",
      fontSize: "11px",
      marginTop: "4px",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    tip: {
      fontSize: "11px",
      color: "#666",
      marginTop: "4px",
      fontStyle: "italic",
      lineHeight: "1.4",
    },
    fileInputGroup: {
      marginBottom: "15px",
      padding: "12px",
      border: "1px dashed #ddd",
      borderRadius: "6px",
      backgroundColor: "#fafafa",
      transition: "all 0.2s ease",
    },
    fileInput: {
      marginBottom: "6px",
      width: "100%",
    },
    fileName: {
      fontSize: "11px",
      color: "#666",
      marginTop: "4px",
      wordBreak: "break-all",
      fontWeight: "500",
    },
    logoPreview: {
      maxWidth: "200px",
      maxHeight: "100px",
      marginTop: "8px",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    button: {
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontWeight: "600",
      minWidth: "120px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
    },
    primaryButton: {
      backgroundColor: "#007bff",
      color: "white",
    },
    primaryButtonHover: {
      backgroundColor: "#0056b3",
      transform: "translateY(-1px)",
    },
    secondaryButton: {
      backgroundColor: "#6c757d",
      color: "white",
    },
    secondaryButtonHover: {
      backgroundColor: "#545b62",
      transform: "translateY(-1px)",
    },
    outlineButton: {
      backgroundColor: "transparent",
      color: "#007bff",
      border: "1px solid #007bff",
    },
    outlineButtonHover: {
      backgroundColor: "#007bff",
      color: "white",
    },
    submitButtonDisabled: {
      backgroundColor: "#6c757d",
      cursor: "not-allowed",
    },
    gridContainer: {
      display: "grid",
      gap: "15px",
    },
    fullWidth: {
      gridColumn: "1 / -1",
    },
    characterCount: {
      fontSize: "11px",
      color: "#999",
      textAlign: "right",
      marginTop: "2px",
    },
  };

  // Media queries for responsive design
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  if (mediaQuery.matches) {
    styles.container.padding = "20px";
    styles.header.padding = "20px";
    styles.header.marginBottom = "20px";
    styles.section.padding = "25px";
    styles.section.marginBottom = "20px";
    styles.sectionTitle.fontSize = "18px";
    styles.sectionTitle.marginBottom = "20px";
    styles.sectionTitle.paddingBottom = "10px";
    styles.inputGroup.marginBottom = "20px";
    styles.label.fontSize = "14px";
    styles.label.marginBottom = "8px";
    styles.input.padding = "10px 12px";
    styles.input.fontSize = "14px";
    styles.tip.fontSize = "12px";
    styles.tip.marginTop = "5px";
    styles.fileInputGroup.padding = "15px";
    styles.fileInputGroup.marginBottom = "20px";
    styles.fileInput.marginBottom = "8px";
    styles.fileName.fontSize = "12px";
    styles.fileName.marginTop = "5px";
    styles.button.padding = "12px 24px";
    styles.button.fontSize = "14px";
    styles.button.minWidth = "140px";
    styles.gridContainer.gridTemplateColumns = "repeat(2, 1fr)";
    styles.gridContainer.gap = "20px";
  }

  const getStatusMessage = () => {
    switch (saveStatus) {
      case "saving":
        return "Saving...";
      case "saved":
        return "All changes saved";
      case "error":
        return "Error saving";
      default:
        return isDirty ? "Unsaved changes" : "All changes saved";
    }
  };

  const getStatusColor = () => {
    switch (saveStatus) {
      case "saving":
        return styles.statusSaving;
      case "saved":
        return styles.statusSaved;
      case "error":
        return styles.statusError;
      default:
        return { backgroundColor: isDirty ? "#ffc107" : "#28a745" };
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Basic Settings</h1>
          <div style={styles.statusIndicator}>
            <div style={{ ...styles.statusDot, ...getStatusColor() }} />
            <span>{getStatusMessage()}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            type='button'
            style={{ ...styles.button, ...styles.outlineButton }}
            onMouseOver={(e) => handleButtonHover(e, styles.outlineButtonHover)}
            onMouseOut={(e) => handleButtonLeave(e, styles.outlineButton)}
            onClick={handleExport}
          >
            📥 Export
          </button>
          <label
            style={{
              ...styles.button,
              ...styles.outlineButton,
              cursor: "pointer",
              margin: 0,
            }}
          >
            📤 Import
            <input
              type='file'
              accept='.json'
              onChange={handleImport}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={styles.tabContainer}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === "website" && styles.activeTab),
          }}
          onClick={() => setActiveTab("website")}
        >
          🌐 Website
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === "sms" && styles.activeTab),
          }}
          onClick={() => setActiveTab("sms")}
        >
          💬 SMS
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === "email" && styles.activeTab),
          }}
          onClick={() => setActiveTab("email")}
        >
          📧 Email
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Website Basic Settings Section */}
        {(activeTab === "website" || activeTab === "all") && (
          <div
            style={styles.section}
            onMouseEnter={handleSectionHover}
            onMouseLeave={handleSectionLeave}
          >
            <h2 style={styles.sectionTitle}>🌐 Website Basic Settings</h2>

            <div style={styles.gridContainer}>
              <div style={styles.fullWidth}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    Website Name <span style={styles.required}>*</span>
                  </label>
                  <input
                    type='text'
                    value={settings.websiteName}
                    onChange={(e) =>
                      handleInputChange("websiteName", e.target.value)
                    }
                    style={{
                      ...styles.input,
                      ...(errors.websiteName && styles.inputError),
                    }}
                    onFocus={handleInputFocus}
                    onBlur={(e) => handleInputBlur(e, "websiteName")}
                    maxLength={50}
                  />
                  {errors.websiteName && (
                    <div style={styles.errorText}>❌ {errors.websiteName}</div>
                  )}
                  <div style={styles.characterCount}>
                    {settings.websiteName.length}/50 characters
                  </div>
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
                    style={{
                      ...styles.input,
                      ...(errors.onlineCustomerService && styles.inputError),
                    }}
                    onFocus={handleInputFocus}
                    onBlur={(e) => handleInputBlur(e, "onlineCustomerService")}
                    placeholder='https://example.com'
                  />
                  {errors.onlineCustomerService && (
                    <div style={styles.errorText}>
                      ❌ {errors.onlineCustomerService}
                    </div>
                  )}
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
                      handleInputChange(
                        "whatsappCustomerService",
                        e.target.value
                      )
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
                <div
                  style={styles.fileInputGroup}
                  onDragOver={handleFileDragOver}
                  onDragLeave={handleFileDragLeave}
                  onDrop={(e) => handleFileDrop(e, "logoFile")}
                >
                  <label style={styles.label}>LOGO</label>
                  <input
                    type='file'
                    onChange={(e) =>
                      handleFileChange("logoFile", e.target.files[0])
                    }
                    style={styles.fileInput}
                    accept='.png,.jpg,.jpeg'
                  />
                  <div style={styles.fileName}>
                    {settings.logoFile
                      ? settings.logoFile.name
                      : "No file chosen"}
                  </div>
                  {settings.logoPreview && (
                    <img
                      src={settings.logoPreview}
                      alt='Logo preview'
                      style={styles.logoPreview}
                    />
                  )}
                  {errors.logoFile && (
                    <div style={styles.errorText}>❌ {errors.logoFile}</div>
                  )}
                  <div style={styles.tip}>Tip: PNG, JPG format, max 10MB</div>
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
                  {errors.iosAppFile && (
                    <div style={styles.errorText}>❌ {errors.iosAppFile}</div>
                  )}
                  <div style={styles.tip}>
                    Tip: Mobileconfig Format, max 10MB
                  </div>
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
                  {errors.androidAppFile && (
                    <div style={styles.errorText}>
                      ❌ {errors.androidAppFile}
                    </div>
                  )}
                  <div style={styles.tip}>Tip: APK format, max 10MB</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SMS Settings Section */}
        {(activeTab === "sms" || activeTab === "all") && (
          <div
            style={styles.section}
            onMouseEnter={handleSectionHover}
            onMouseLeave={handleSectionLeave}
          >
            <h2 style={styles.sectionTitle}>💬 SMS Settings</h2>

            <div style={styles.gridContainer}>
              <div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    SMS account <span style={styles.required}>*</span>
                  </label>
                  <input
                    type='text'
                    value={settings.smsAccount}
                    onChange={(e) =>
                      handleInputChange("smsAccount", e.target.value)
                    }
                    style={{
                      ...styles.input,
                      ...(errors.smsAccount && styles.inputError),
                    }}
                    onFocus={handleInputFocus}
                    onBlur={(e) => handleInputBlur(e, "smsAccount")}
                    placeholder='e.g., kainbd564'
                  />
                  {errors.smsAccount && (
                    <div style={styles.errorText}>❌ {errors.smsAccount}</div>
                  )}
                  <div style={styles.tip}>Fill in SMS account</div>
                </div>
              </div>

              <div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    SMS Treasure Key <span style={styles.required}>*</span>
                  </label>
                  <input
                    type='text'
                    value={settings.smsKey}
                    onChange={(e) =>
                      handleInputChange("smsKey", e.target.value)
                    }
                    style={{
                      ...styles.input,
                      ...(errors.smsKey && styles.inputError),
                    }}
                    onFocus={handleInputFocus}
                    onBlur={(e) => handleInputBlur(e, "smsKey")}
                    placeholder='e.g., c7f03ca45c7b4e7697ac73c77e7bf8f1'
                  />
                  {errors.smsKey && (
                    <div style={styles.errorText}>❌ {errors.smsKey}</div>
                  )}
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
        )}

        {/* Email Settings Section */}
        {(activeTab === "email" || activeTab === "all") && (
          <div
            style={styles.section}
            onMouseEnter={handleSectionHover}
            onMouseLeave={handleSectionLeave}
          >
            <h2 style={styles.sectionTitle}>📧 Email Settings</h2>

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
                    style={{
                      ...styles.input,
                      ...(errors.emailAccount && styles.inputError),
                    }}
                    onFocus={handleInputFocus}
                    onBlur={(e) => handleInputBlur(e, "emailAccount")}
                    placeholder='e.g., xiaozhangzhangdan@gmail.com'
                  />
                  {errors.emailAccount && (
                    <div style={styles.errorText}>❌ {errors.emailAccount}</div>
                  )}
                  <div style={styles.tip}>
                    Fill in the sending email account
                  </div>
                </div>
              </div>

              <div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    Email-specific password{" "}
                    <span style={styles.required}>*</span>
                  </label>
                  <input
                    type='password'
                    value={settings.emailPassword}
                    onChange={(e) =>
                      handleInputChange("emailPassword", e.target.value)
                    }
                    style={{
                      ...styles.input,
                      ...(errors.emailPassword && styles.inputError),
                    }}
                    onFocus={handleInputFocus}
                    onBlur={(e) => handleInputBlur(e, "emailPassword")}
                    placeholder='Enter your email password'
                  />
                  {errors.emailPassword && (
                    <div style={styles.errorText}>
                      ❌ {errors.emailPassword}
                    </div>
                  )}
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
                    maxLength={30}
                  />
                  <div style={styles.characterCount}>
                    {settings.emailTeamName.length}/30 characters
                  </div>
                  <div style={styles.tip}>Fill in the email team name</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div style={styles.section}>
          <div style={styles.buttonGroup}>
            <button
              type='submit'
              style={{
                ...styles.button,
                ...styles.primaryButton,
                ...(isSubmitting && styles.submitButtonDisabled),
              }}
              onMouseOver={(e) =>
                !isSubmitting && handleButtonHover(e, styles.primaryButtonHover)
              }
              onMouseOut={(e) =>
                !isSubmitting && handleButtonLeave(e, styles.primaryButton)
              }
              disabled={isSubmitting}
            >
              {isSubmitting ? "⏳ Saving..." : "💾 Save Settings"}
            </button>
            <button
              type='button'
              style={{ ...styles.button, ...styles.secondaryButton }}
              onMouseOver={(e) =>
                handleButtonHover(e, styles.secondaryButtonHover)
              }
              onMouseOut={(e) => handleButtonLeave(e, styles.secondaryButton)}
              onClick={handleReset}
            >
              🔄 Reset to Default
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicSettings;
