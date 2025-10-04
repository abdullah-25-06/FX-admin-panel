import React from "react";

const ProductList = () => {
  // SVG Icons
  const EditIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
    </svg>
  );

  const DeleteIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
    </svg>
  );

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    pageTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    categoriesContainer: {
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      padding: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      padding: "12px 16px",
      textAlign: "left",
      fontWeight: "bold",
      color: "#333",
      borderBottom: "2px solid #dee2e6",
    },
    tableCell: {
      padding: "12px 16px",
      borderBottom: "1px solid #dee2e6",
      color: "#555",
    },
    operateCell: {
      padding: "12px 16px",
      borderBottom: "1px solid #dee2e6",
      display: "flex",
      gap: "8px",
    },
    editButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      transition: "background-color 0.2s",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      transition: "background-color 0.2s",
    },
    addButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    addButtonHover: {
      backgroundColor: "#0056b3",
    },
    editButtonHover: {
      backgroundColor: "#0056b3",
    },
    deleteButtonHover: {
      backgroundColor: "#c82333",
    },
  };

  const handleButtonHover = (e, hoverStyle) => {
    e.target.style.backgroundColor = hoverStyle.backgroundColor;
  };

  const handleButtonLeave = (e, originalColor) => {
    e.target.style.backgroundColor = originalColor;
  };

  const handleEdit = (serialNumber, title) => {
    console.log("Edit clicked for:", serialNumber, title);
    // Add your edit logic here
    alert(`Edit: ${title}`);
  };

  const handleDelete = (serialNumber, title) => {
    console.log("Delete clicked for:", serialNumber, title);
    // Add your delete logic here
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      alert(`Deleted: ${title}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Product Categories</h1>

      <div style={styles.categoriesContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>serial number</th>
              <th style={styles.tableHeader}>title</th>
              <th style={styles.tableHeader}>operate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCell}>5</td>
              <td style={styles.tableCell}>Foreign Exchange</td>
              <td style={styles.operateCell}>
                {/* Edit Button with Pen Icon */}
                <button
                  style={styles.editButton}
                  onMouseOver={(e) =>
                    handleButtonHover(e, styles.editButtonHover)
                  }
                  onMouseOut={(e) =>
                    handleButtonLeave(e, styles.editButton.backgroundColor)
                  }
                  onClick={() => handleEdit(5, "Foreign Exchange")}
                  title='Edit'
                >
                  <EditIcon />
                </button>

                {/* Delete Button with Trash Icon */}
                <button
                  style={styles.deleteButton}
                  onMouseOver={(e) =>
                    handleButtonHover(e, styles.deleteButtonHover)
                  }
                  onMouseOut={(e) =>
                    handleButtonLeave(e, styles.deleteButton.backgroundColor)
                  }
                  onClick={() => handleDelete(5, "Foreign Exchange")}
                  title='Delete'
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          style={styles.addButton}
          onMouseOver={(e) => handleButtonHover(e, styles.addButtonHover)}
          onMouseOut={(e) =>
            handleButtonLeave(e, styles.addButton.backgroundColor)
          }
        >
          Add Category+
        </button>
      </div>
    </div>
  );
};

export default ProductList;
