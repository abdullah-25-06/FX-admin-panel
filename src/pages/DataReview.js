import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  User,
  IdCard,
} from "lucide-react";

const DataReview = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageType, setImageType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCertification, setFilterCertification] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Sample data with more realistic information
  const sampleReviews = [
    {
      id: 20,
      account: "But 12345",
      documentType: "ID card",
      realName: "Ali Khan",
      idNumber: "1086001234567",
      submissionTime: "2025-09-11 12:27:00",
      primaryCertification: "pass",
      advancedCertification: "reject",
      status: "Pending",
      frontImage: "https://example.com/front-20.jpg",
      backImage: "https://example.com/back-20.jpg",
      notes: "",
      processedBy: "",
      processedAt: "",
    },
    {
      id: 19,
      account: "demo22",
      documentType: "ID card",
      realName: "Hassan Ahmed",
      idNumber: "1922077654321",
      submissionTime: "2025-02-21 14:58:47",
      primaryCertification: "pass",
      advancedCertification: "reject",
      status: "Pending",
      frontImage: "https://example.com/front-19.jpg",
      backImage: "https://example.com/back-19.jpg",
      notes: "ID photo blurry",
      processedBy: "",
      processedAt: "",
    },
    {
      id: 18,
      account: "user_pro",
      documentType: "Passport",
      realName: "Sarah Johnson",
      idNumber: "PA123456789",
      submissionTime: "2025-01-15 09:30:22",
      primaryCertification: "pending",
      advancedCertification: "pending",
      status: "Pending",
      frontImage: "https://example.com/front-18.jpg",
      backImage: "https://example.com/back-18.jpg",
      notes: "",
      processedBy: "",
      processedAt: "",
    },
    {
      id: 17,
      account: "trader_001",
      documentType: "Driver License",
      realName: "Mike Chen",
      idNumber: "DL987654321",
      submissionTime: "2025-01-10 16:45:33",
      primaryCertification: "pass",
      advancedCertification: "pass",
      status: "Completed",
      frontImage: "https://example.com/front-17.jpg",
      backImage: "https://example.com/back-17.jpg",
      notes: "All documents verified",
      processedBy: "admin",
      processedAt: "2025-01-10 17:20:00",
    },
    {
      id: 16,
      account: "crypto_lover",
      documentType: "ID card",
      realName: "Emma Davis",
      idNumber: "3456789012",
      submissionTime: "2025-01-08 11:15:44",
      primaryCertification: "reject",
      advancedCertification: "reject",
      status: "Rejected",
      frontImage: "https://example.com/front-16.jpg",
      backImage: "https://example.com/back-16.jpg",
      notes: "Document expired",
      processedBy: "admin",
      processedAt: "2025-01-08 14:30:00",
    },
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    const savedReviews = localStorage.getItem("dataReviews");

    if (savedReviews) {
      try {
        const parsedReviews = JSON.parse(savedReviews);
        setReviews(
          Array.isArray(parsedReviews) ? parsedReviews : sampleReviews
        );
      } catch (error) {
        console.error("Error loading reviews:", error);
        setReviews(sampleReviews);
      }
    } else {
      setReviews(sampleReviews);
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save to localStorage whenever reviews change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("dataReviews", JSON.stringify(reviews));
    }
  }, [reviews, isLoading]);

  // Filter reviews based on search and filters
  useEffect(() => {
    let filtered = reviews.filter((review) => {
      const matchesSearch =
        review.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.realName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.idNumber.includes(searchTerm);

      const matchesStatus =
        filterStatus === "All" || review.status === filterStatus;
      const matchesCertification =
        filterCertification === "All" ||
        (filterCertification === "Pending" &&
          (review.primaryCertification === "pending" ||
            review.advancedCertification === "pending")) ||
        (filterCertification === "Completed" &&
          review.primaryCertification === "pass" &&
          review.advancedCertification === "pass") ||
        (filterCertification === "Rejected" &&
          (review.primaryCertification === "reject" ||
            review.advancedCertification === "reject"));

      return matchesSearch && matchesStatus && matchesCertification;
    });

    setFilteredReviews(filtered);
  }, [reviews, searchTerm, filterStatus, filterCertification]);

  const handleCertificationAction = (
    id,
    certificationType,
    action,
    notes = ""
  ) => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === id) {
        const updatedReview = {
          ...review,
          [certificationType]: action,
          notes: notes || review.notes,
          processedBy: "admin", // In real app, get from auth context
          processedAt: new Date().toISOString(),
        };

        // Update status based on certification results
        if (certificationType === "advancedCertification") {
          if (
            action === "pass" &&
            updatedReview.primaryCertification === "pass"
          ) {
            updatedReview.status = "Completed";
          } else if (action === "reject") {
            updatedReview.status = "Rejected";
          }
        } else if (
          certificationType === "primaryCertification" &&
          action === "reject"
        ) {
          updatedReview.status = "Rejected";
        }

        return updatedReview;
      }
      return review;
    });

    setReviews(updatedReviews);

    const review = reviews.find((r) => r.id === id);
    showMessage(
      `${
        certificationType === "primaryCertification" ? "Primary" : "Advanced"
      } certification ${action}ed for ${review.account}`,
      action === "pass" ? "success" : "warning"
    );
  };

  const handleBulkAction = (action, certificationType) => {
    if (selectedReviews.length === 0) {
      showMessage("Please select at least one review", "error");
      return;
    }

    const updatedReviews = reviews.map((review) => {
      if (selectedReviews.includes(review.id)) {
        const updatedReview = {
          ...review,
          [certificationType]: action,
          processedBy: "admin",
          processedAt: new Date().toISOString(),
        };

        if (certificationType === "advancedCertification") {
          if (
            action === "pass" &&
            updatedReview.primaryCertification === "pass"
          ) {
            updatedReview.status = "Completed";
          } else if (action === "reject") {
            updatedReview.status = "Rejected";
          }
        } else if (
          certificationType === "primaryCertification" &&
          action === "reject"
        ) {
          updatedReview.status = "Rejected";
        }

        return updatedReview;
      }
      return review;
    });

    setReviews(updatedReviews);
    setSelectedReviews([]);
    showMessage(
      `${selectedReviews.length} reviews ${action}ed for ${certificationType}`,
      action === "pass" ? "success" : "warning"
    );
  };

  const handleViewImages = (review, type) => {
    setSelectedReview(review);
    setImageType(type);
    setShowImageModal(true);
  };

  const handleSelectReview = (reviewId) => {
    setSelectedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReviews.length === filteredReviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(filteredReviews.map((review) => review.id));
    }
  };

  const showMessage = (text, type = "info") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "#f39c12",
      Completed: "#27ae60",
      Rejected: "#e74c3c",
    };
    return colors[status] || "#666";
  };

  const getCertificationColor = (certification) => {
    const colors = {
      pass: "#27ae60",
      reject: "#e74c3c",
      pending: "#f39c12",
    };
    return colors[certification] || "#666";
  };

  const getCertificationIcon = (certification) => {
    const icons = {
      pass: <CheckCircle size={14} />,
      reject: <XCircle size={14} />,
      pending: <Eye size={14} />,
    };
    return icons[certification] || <Eye size={14} />;
  };

  const handleExportData = () => {
    const dataToExport = filteredReviews.map((review) => ({
      ID: review.id,
      Account: review.account,
      "Document Type": review.documentType,
      "Real Name": review.realName,
      "ID Number": review.idNumber,
      "Submission Time": review.submissionTime,
      "Primary Certification": review.primaryCertification,
      "Advanced Certification": review.advancedCertification,
      Status: review.status,
      "Processed By": review.processedBy,
      "Processed At": review.processedAt,
      Notes: review.notes,
    }));

    const headers = Object.keys(dataToExport[0]).join(",");
    const csv = [
      headers,
      ...dataToExport.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-reviews-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showMessage(`Exported ${filteredReviews.length} reviews`, "success");
  };

  // Statistics
  const getStatistics = () => {
    const totalReviews = reviews.length;
    const pendingReviews = reviews.filter((r) => r.status === "Pending").length;
    const completedReviews = reviews.filter(
      (r) => r.status === "Completed"
    ).length;
    const rejectedReviews = reviews.filter(
      (r) => r.status === "Rejected"
    ).length;

    return {
      totalReviews,
      pendingReviews,
      completedReviews,
      rejectedReviews,
      selected: selectedReviews.length,
    };
  };

  const stats = getStatistics();

  const styles = {
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      flexWrap: "wrap",
      gap: "15px",
    },
    title: {
      color: "#333",
      fontSize: "24px",
      fontWeight: "bold",
      margin: "0",
      textTransform: "uppercase",
    },
    controlsContainer: {
      display: "flex",
      gap: "15px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    searchContainer: {
      display: "flex",
      alignItems: "center",
      background: "white",
      padding: "8px 12px",
      borderRadius: "6px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      minWidth: "250px",
    },
    statsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "15px",
      marginBottom: "20px",
    },
    statCard: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "6px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    statNumber: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    statLabel: {
      fontSize: "12px",
      color: "#666",
      textTransform: "uppercase",
    },
    filterContainer: {
      backgroundColor: "white",
      borderRadius: "6px",
      padding: "15px",
      marginBottom: "15px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      display: showFilters ? "flex" : "none",
      gap: "15px",
      flexWrap: "wrap",
      alignItems: "center",
    },
    select: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      background: "white",
      minWidth: "150px",
    },
    button: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontWeight: "500",
    },
    buttonPrimary: {
      backgroundColor: "#3498db",
      color: "white",
    },
    buttonSuccess: {
      backgroundColor: "#27ae60",
      color: "white",
    },
    buttonDanger: {
      backgroundColor: "#e74c3c",
      color: "white",
    },
    buttonWarning: {
      backgroundColor: "#f39c12",
      color: "white",
    },
    buttonSecondary: {
      backgroundColor: "#95a5a6",
      color: "white",
    },
    message: {
      padding: "12px 16px",
      borderRadius: "6px",
      marginBottom: "15px",
      fontSize: "14px",
      fontWeight: "500",
    },
    successMessage: {
      backgroundColor: "#d4edda",
      color: "#155724",
      border: "1px solid #c3e6cb",
    },
    errorMessage: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb",
    },
    warningMessage: {
      backgroundColor: "#fff3cd",
      color: "#856404",
      border: "1px solid #ffeaa7",
    },
    bulkActions: {
      display: "flex",
      gap: "10px",
      marginBottom: "15px",
      flexWrap: "wrap",
    },
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "1400px",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      borderBottom: "2px solid #dee2e6",
    },
    tableHeaderCell: {
      padding: "12px 8px",
      textAlign: "left",
      fontWeight: "bold",
      color: "#333",
      fontSize: "12px",
      borderBottom: "1px solid #dee2e6",
      whiteSpace: "nowrap",
    },
    tableCell: {
      padding: "12px 8px",
      borderBottom: "1px solid #dee2e6",
      fontSize: "13px",
      color: "#333",
      textAlign: "center",
    },
    idCol: {
      width: "4%",
    },
    accountCol: {
      width: "8%",
    },
    documentTypeCol: {
      width: "7%",
    },
    realNameCol: {
      width: "8%",
    },
    idNumberCol: {
      width: "9%",
    },
    photoCol: {
      width: "10%",
    },
    submissionTimeCol: {
      width: "10%",
    },
    certificationCol: {
      width: "12%",
    },
    statusCol: {
      width: "8%",
    },
    buttonGroup: {
      display: "flex",
      gap: "4px",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    viewButton: {
      padding: "4px 8px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "11px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "2px",
    },
    passButton: {
      padding: "4px 8px",
      backgroundColor: "#27ae60",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "11px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "2px",
    },
    rejectButton: {
      padding: "4px 8px",
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "11px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "2px",
    },
    statusBadge: {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "11px",
      fontWeight: "bold",
      textTransform: "uppercase",
      display: "inline-flex",
      alignItems: "center",
      gap: "3px",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px",
    },
    modalContent: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "600px",
      width: "100%",
      maxHeight: "90vh",
      overflow: "auto",
    },
    modalTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#333",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    imageContainer: {
      width: "100%",
      height: "300px",
      backgroundColor: "#f8f9fa",
      border: "2px dashed #dee2e6",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#6c757d",
      fontSize: "16px",
      marginBottom: "15px",
      borderRadius: "4px",
    },
    closeButton: {
      padding: "8px 16px",
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    },
    noData: {
      textAlign: "center",
      padding: "40px",
      color: "#666",
      fontSize: "16px",
    },
    loadingMessage: {
      textAlign: "center",
      padding: "40px",
      color: "#666",
      fontSize: "16px",
    },
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingMessage}>Loading data reviews...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Data Review</h2>
        <div style={styles.controlsContainer}>
          <div style={styles.searchContainer}>
            <Search size={16} color='#666' />
            <input
              type='text'
              placeholder='Search accounts, names, ID numbers...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                fontSize: "14px",
                width: "100%",
                marginLeft: "8px",
                background: "transparent",
              }}
            />
          </div>
          <button
            style={{ ...styles.button, ...styles.buttonSecondary }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonPrimary }}
            onClick={handleExportData}
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.totalReviews}</div>
          <div style={styles.statLabel}>Total Reviews</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.pendingReviews}</div>
          <div style={styles.statLabel}>Pending</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.completedReviews}</div>
          <div style={styles.statLabel}>Completed</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.rejectedReviews}</div>
          <div style={styles.statLabel}>Rejected</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.selected}</div>
          <div style={styles.statLabel}>Selected</div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div
          style={{
            ...styles.message,
            ...(messageType === "success"
              ? styles.successMessage
              : messageType === "error"
              ? styles.errorMessage
              : messageType === "warning"
              ? styles.warningMessage
              : {}),
          }}
        >
          {message}
        </div>
      )}

      {/* Filters */}
      <div style={styles.filterContainer}>
        <select
          style={styles.select}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value='All'>All Status</option>
          <option value='Pending'>Pending</option>
          <option value='Completed'>Completed</option>
          <option value='Rejected'>Rejected</option>
        </select>

        <select
          style={styles.select}
          value={filterCertification}
          onChange={(e) => setFilterCertification(e.target.value)}
        >
          <option value='All'>All Certifications</option>
          <option value='Pending'>Pending Certification</option>
          <option value='Completed'>Fully Certified</option>
          <option value='Rejected'>Rejected</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedReviews.length > 0 && (
        <div style={styles.bulkActions}>
          <strong style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {selectedReviews.length} selected:
          </strong>
          <button
            style={{ ...styles.button, ...styles.buttonSuccess }}
            onClick={() => handleBulkAction("pass", "primaryCertification")}
          >
            <CheckCircle size={14} />
            Pass Primary
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonDanger }}
            onClick={() => handleBulkAction("reject", "primaryCertification")}
          >
            <XCircle size={14} />
            Reject Primary
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonSuccess }}
            onClick={() => handleBulkAction("pass", "advancedCertification")}
          >
            <CheckCircle size={14} />
            Pass Advanced
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonDanger }}
            onClick={() => handleBulkAction("reject", "advancedCertification")}
          >
            <XCircle size={14} />
            Reject Advanced
          </button>
        </div>
      )}

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={{ ...styles.tableHeaderCell, ...styles.idCol }}>
                <input
                  type='checkbox'
                  checked={
                    selectedReviews.length === filteredReviews.length &&
                    filteredReviews.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.idCol }}>
                #ID
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.accountCol }}>
                Account
              </th>
              <th
                style={{ ...styles.tableHeaderCell, ...styles.documentTypeCol }}
              >
                Document Type
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.realNameCol }}>
                Real Name
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.idNumberCol }}>
                ID Number
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.photoCol }}>
                Front Photo
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.photoCol }}>
                Back Photo
              </th>
              <th
                style={{
                  ...styles.tableHeaderCell,
                  ...styles.submissionTimeCol,
                }}
              >
                Submission Time
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.statusCol }}>
                Status
              </th>
              <th
                style={{
                  ...styles.tableHeaderCell,
                  ...styles.certificationCol,
                }}
              >
                Primary Certification
              </th>
              <th
                style={{
                  ...styles.tableHeaderCell,
                  ...styles.certificationCol,
                }}
              >
                Advanced Certification
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <tr key={review.id}>
                  <td style={{ ...styles.tableCell, ...styles.idCol }}>
                    <input
                      type='checkbox'
                      checked={selectedReviews.includes(review.id)}
                      onChange={() => handleSelectReview(review.id)}
                    />
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.idCol }}>
                    {review.id}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.accountCol }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <User size={12} color='#666' />
                      {review.account}
                    </div>
                  </td>
                  <td
                    style={{ ...styles.tableCell, ...styles.documentTypeCol }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <IdCard size={12} color='#666' />
                      {review.documentType}
                    </div>
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.realNameCol }}>
                    {review.realName}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.idNumberCol }}>
                    {review.idNumber}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.photoCol }}>
                    <button
                      style={styles.viewButton}
                      onClick={() => handleViewImages(review, "front")}
                    >
                      <Eye size={12} />
                      View Front
                    </button>
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.photoCol }}>
                    <button
                      style={styles.viewButton}
                      onClick={() => handleViewImages(review, "back")}
                    >
                      <Eye size={12} />
                      View Back
                    </button>
                  </td>
                  <td
                    style={{ ...styles.tableCell, ...styles.submissionTimeCol }}
                  >
                    {review.submissionTime}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.statusCol }}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        backgroundColor: getStatusColor(review.status) + "20",
                        color: getStatusColor(review.status),
                      }}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td
                    style={{ ...styles.tableCell, ...styles.certificationCol }}
                  >
                    <div style={styles.buttonGroup}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor:
                            getCertificationColor(review.primaryCertification) +
                            "20",
                          color: getCertificationColor(
                            review.primaryCertification
                          ),
                        }}
                      >
                        {getCertificationIcon(review.primaryCertification)}
                        {review.primaryCertification}
                      </span>
                      {review.primaryCertification === "pending" && (
                        <>
                          <button
                            style={styles.passButton}
                            onClick={() =>
                              handleCertificationAction(
                                review.id,
                                "primaryCertification",
                                "pass"
                              )
                            }
                          >
                            <CheckCircle size={12} />
                            Pass
                          </button>
                          <button
                            style={styles.rejectButton}
                            onClick={() =>
                              handleCertificationAction(
                                review.id,
                                "primaryCertification",
                                "reject"
                              )
                            }
                          >
                            <XCircle size={12} />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                  <td
                    style={{ ...styles.tableCell, ...styles.certificationCol }}
                  >
                    <div style={styles.buttonGroup}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor:
                            getCertificationColor(
                              review.advancedCertification
                            ) + "20",
                          color: getCertificationColor(
                            review.advancedCertification
                          ),
                        }}
                      >
                        {getCertificationIcon(review.advancedCertification)}
                        {review.advancedCertification}
                      </span>
                      {review.advancedCertification === "pending" && (
                        <>
                          <button
                            style={styles.passButton}
                            onClick={() =>
                              handleCertificationAction(
                                review.id,
                                "advancedCertification",
                                "pass"
                              )
                            }
                          >
                            <CheckCircle size={12} />
                            Pass
                          </button>
                          <button
                            style={styles.rejectButton}
                            onClick={() =>
                              handleCertificationAction(
                                review.id,
                                "advancedCertification",
                                "reject"
                              )
                            }
                          >
                            <XCircle size={12} />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='12' style={styles.noData}>
                  {searchTerm ||
                  filterStatus !== "All" ||
                  filterCertification !== "All"
                    ? "No data reviews found matching your criteria"
                    : "No data reviews found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      {showImageModal && selectedReview && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowImageModal(false)}
        >
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>
              <IdCard size={20} />
              {imageType === "front" ? "Front" : "Back"} ID Photo -{" "}
              {selectedReview.account}
            </h3>
            <div style={styles.imageContainer}>
              {imageType === "front"
                ? "Front ID Card Image"
                : "Back ID Card Image"}
              <br />
              <small style={{ marginTop: "8px" }}>
                Account: {selectedReview.account} | Name:{" "}
                {selectedReview.realName}
              </small>
              <small>ID: {selectedReview.idNumber}</small>
              <small style={{ marginTop: "16px", color: "#999" }}>
                (In production, this would display the actual uploaded image)
              </small>
            </div>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                style={styles.closeButton}
                onClick={() => setShowImageModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataReview;
