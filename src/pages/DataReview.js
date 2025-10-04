import React, { useState } from "react";

const DataReview = () => {
  const [reviews, setReviews] = useState([
    {
      id: 20,
      account: "But 12345",
      documentType: "ID card",
      realName: "All:2345",
      idNumber: "108600",
      submissionTime: "2025-09-11 12:27:00",
      primaryCertification: "pass",
      advancedCertification: "reject",
    },
    {
      id: 19,
      account: "demo22",
      documentType: "ID card",
      realName: "Hdjsu@nshdh",
      idNumber: "192207",
      submissionTime: "2025-02-21 14:58:47",
      primaryCertification: "pass",
      advancedCertification: "reject",
    },
  ]);

  const [selectedReview, setSelectedReview] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageType, setImageType] = useState("");

  const handleCertificationAction = (id, certificationType, action) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, [certificationType]: action } : review
      )
    );
  };

  const handleViewImages = (review, type) => {
    setSelectedReview(review);
    setImageType(type);
    setShowImageModal(true);
  };

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
      minWidth: "1200px",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      borderBottom: "2px solid #dee2e6",
    },
    tableHeaderCell: {
      padding: "12px 16px",
      textAlign: "left",
      fontWeight: "bold",
      color: "#333",
      fontSize: "14px",
      borderBottom: "1px solid #dee2e6",
      whiteSpace: "nowrap",
    },
    tableCell: {
      padding: "12px 16px",
      borderBottom: "1px solid #dee2e6",
      fontSize: "14px",
      color: "#333",
      textAlign: "center",
    },
    idCol: {
      width: "5%",
    },
    accountCol: {
      width: "10%",
    },
    documentTypeCol: {
      width: "8%",
    },
    realNameCol: {
      width: "10%",
    },
    idNumberCol: {
      width: "10%",
    },
    photoCol: {
      width: "12%",
    },
    submissionTimeCol: {
      width: "12%",
    },
    certificationCol: {
      width: "10%",
    },
    buttonGroup: {
      display: "flex",
      gap: "8px",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    viewButton: {
      padding: "4px 8px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "bold",
    },
    passButton: {
      padding: "4px 8px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "bold",
    },
    rejectButton: {
      padding: "4px 8px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "bold",
    },
    statusBadge: {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    passStatus: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    rejectStatus: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "500px",
      width: "90%",
      textAlign: "center",
    },
    modalTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#333",
    },
    imagePlaceholder: {
      width: "100%",
      height: "300px",
      backgroundColor: "#f8f9fa",
      border: "2px dashed #dee2e6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#6c757d",
      fontSize: "16px",
      marginBottom: "15px",
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>data review</h2>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={{ ...styles.tableHeaderCell, ...styles.idCol }}>
                #ID
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.accountCol }}>
                account
              </th>
              <th
                style={{ ...styles.tableHeaderCell, ...styles.documentTypeCol }}
              >
                Document type
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.realNameCol }}>
                Real name
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.idNumberCol }}>
                ID number
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.photoCol }}>
                Front photo of ID card
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.photoCol }}>
                Photo of the back of your ID card
              </th>
              <th
                style={{
                  ...styles.tableHeaderCell,
                  ...styles.submissionTimeCol,
                }}
              >
                Submission Time
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
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <tr key={review.id}>
                  <td style={{ ...styles.tableCell, ...styles.idCol }}>
                    {review.id}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.accountCol }}>
                    {review.account}
                  </td>
                  <td
                    style={{ ...styles.tableCell, ...styles.documentTypeCol }}
                  >
                    {review.documentType}
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
                      View Front
                    </button>
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.photoCol }}>
                    <button
                      style={styles.viewButton}
                      onClick={() => handleViewImages(review, "back")}
                    >
                      View Back
                    </button>
                  </td>
                  <td
                    style={{ ...styles.tableCell, ...styles.submissionTimeCol }}
                  >
                    {review.submissionTime}
                  </td>
                  <td
                    style={{ ...styles.tableCell, ...styles.certificationCol }}
                  >
                    <div style={styles.buttonGroup}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          ...(review.primaryCertification === "pass"
                            ? styles.passStatus
                            : styles.rejectStatus),
                        }}
                      >
                        {review.primaryCertification}
                      </span>
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
                        Reject
                      </button>
                    </div>
                  </td>
                  <td
                    style={{ ...styles.tableCell, ...styles.certificationCol }}
                  >
                    <div style={styles.buttonGroup}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          ...(review.advancedCertification === "pass"
                            ? styles.passStatus
                            : styles.rejectStatus),
                        }}
                      >
                        {review.advancedCertification}
                      </span>
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
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='10' style={styles.noData}>
                  No data reviews found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      {showImageModal && selectedReview && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>
              {imageType === "front" ? "Front" : "Back"} ID Photo -{" "}
              {selectedReview.account}
            </h3>
            <div style={styles.imagePlaceholder}>
              {imageType === "front"
                ? "Front ID Card Image"
                : "Back ID Card Image"}
              <br />
              <small>
                (Image placeholder - would show actual photo in production)
              </small>
            </div>
            <button
              style={styles.closeButton}
              onClick={() => setShowImageModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataReview;
