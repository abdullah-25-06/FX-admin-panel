import React, { useState } from "react";

const RecycleBin = () => {
  const [products, setProducts] = useState([
    {
      id: 16,
      productName: "ARM/USDT",
      status: "Closed",
      category: "Foreign Exchange",
      randomValue: "0.00003",
      minRiskControl: "0.00001",
      maxRiskControl: "0.00005",
      operate: "Click Restore",
    },
    {
      id: 22,
      productName: "BTS/USDT",
      status: "Market opening",
      category: "Foreign Exchange",
      randomValue: "0.15",
      minRiskControl: "0.0001",
      maxRiskControl: "0.0009",
      operate: "Click Restore",
    },
    {
      id: 32,
      productName: "ZEC/USDT",
      status: "Market opening",
      category: "Foreign Exchange",
      randomValue: "0.00010",
      minRiskControl: "0.00001",
      maxRiskControl: "0.00020",
      operate: "Click Restore",
    },
    {
      id: 34,
      productName: "CHZ/USDT",
      status: "Market opening",
      category: "Foreign Exchange",
      randomValue: "0.005",
      minRiskControl: "0.005",
      maxRiskControl: "0.015",
      operate: "Click Restore",
    },
    {
      id: 36,
      productName: "BNT/USDT",
      status: "Market opening",
      category: "Foreign Exchange",
      randomValue: "0.00003",
      minRiskControl: "0.00001",
      maxRiskControl: "0.00005",
      operate: "Click Restore",
    },
    {
      id: 39,
      productName: "STX/USDT",
      status: "Market opening",
      category: "Foreign Exchange",
      randomValue: "0.008",
      minRiskControl: "0.00001",
      maxRiskControl: "0.00019",
      operate: "Click Restore",
    },
    {
      id: 56,
      productName: "XRP/USDT",
      status: "Market opening",
      category: "Foreign Exchange",
      randomValue: "0.0008",
      minRiskControl: "0.001",
      maxRiskControl: "0.009",
      operate: "Click Restore",
    },
  ]);

  const [sortOrder, setSortOrder] = useState("asc");

  // SVG Icons
  const EditIcon = () => (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
    </svg>
  );

  const DeleteIcon = () => (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
    </svg>
  );

  const RestoreIcon = () => (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z' />
    </svg>
  );

  const RecycleBinIcon = () => (
    <svg
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='currentColor'
      style={{ marginRight: "8px" }}
    >
      <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
    </svg>
  );

  const handleSort = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setProducts(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleRestore = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, status: "Market opening", operate: "Restored" }
        : product
    );
    setProducts(updatedProducts);
    alert(`Product ${productId} restored to market opening status`);
  };

  const handleEdit = (productId) => {
    console.log("Edit product:", productId);
    alert(`Edit product: ${productId}`);
  };

  const handleDelete = (productId) => {
    if (
      window.confirm(
        `Are you sure you want to permanently delete product ${productId}? This action cannot be undone.`
      )
    ) {
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
      alert(`Product ${productId} permanently deleted`);
    }
  };

  const handleEmptyRecycleBin = () => {
    if (
      window.confirm(
        "Are you sure you want to empty the recycle bin? All items will be permanently deleted and this action cannot be undone."
      )
    ) {
      setProducts([]);
      alert("Recycle bin emptied successfully");
    }
  };

  const handleAddProduct = () => {
    alert("Add new product functionality would open a form/modal here");
  };

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1400px",
      margin: "0 auto",
    },
    pageTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
      display: "flex",
      alignItems: "center",
    },
    tableContainer: {
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "1000px",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      padding: "12px 8px",
      textAlign: "left",
      fontWeight: "bold",
      color: "#333",
      borderBottom: "2px solid #dee2e6",
      fontSize: "14px",
    },
    tableCell: {
      padding: "12px 8px",
      borderBottom: "1px solid #dee2e6",
      color: "#555",
      fontSize: "14px",
    },
    operateCell: {
      padding: "12px 8px",
      borderBottom: "1px solid #dee2e6",
      display: "flex",
      gap: "6px",
      alignItems: "center",
    },
    sortHeader: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    statusClosed: {
      color: "#dc3545",
      fontWeight: "bold",
    },
    statusOpen: {
      color: "#28a745",
      fontWeight: "bold",
    },
    editButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      transition: "background-color 0.2s",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      transition: "background-color 0.2s",
    },
    restoreButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      transition: "background-color 0.2s",
    },
    addButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.2s",
      marginBottom: "15px",
      marginRight: "10px",
    },
    emptyBinButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.2s",
      marginBottom: "15px",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    restoreButtonHover: {
      backgroundColor: "#218838",
    },
    deleteButtonHover: {
      backgroundColor: "#c82333",
    },
    emptyBinButtonHover: {
      backgroundColor: "#c82333",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
      marginBottom: "15px",
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
      <h1 style={styles.pageTitle}>
        <RecycleBinIcon />
        Recycle Bin
      </h1>

      <div style={styles.tableContainer}>
        <div style={styles.buttonContainer}>
          <button
            style={styles.addButton}
            onMouseOver={(e) => handleButtonHover(e, styles.buttonHover)}
            onMouseOut={(e) =>
              handleButtonLeave(e, styles.addButton.backgroundColor)
            }
            onClick={handleAddProduct}
          >
            Add a product
          </button>

          <button
            style={styles.emptyBinButton}
            onMouseOver={(e) =>
              handleButtonHover(e, styles.emptyBinButtonHover)
            }
            onMouseOut={(e) =>
              handleButtonLeave(e, styles.emptyBinButton.backgroundColor)
            }
            onClick={handleEmptyRecycleBin}
          >
            Empty Recycle Bin
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>
                <div style={styles.sortHeader} onClick={handleSort}>
                  serial number
                  <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                </div>
              </th>
              <th style={styles.tableHeader}>Product Name</th>
              <th style={styles.tableHeader}>
                Status (during normal market opening hours)
              </th>
              <th style={styles.tableHeader}>Category</th>
              <th style={styles.tableHeader}>Random Value</th>
              <th style={styles.tableHeader}>Minimum risk control value</th>
              <th style={styles.tableHeader}>Risk control maximum value</th>
              <th style={styles.tableHeader}>operate</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={styles.tableCell}>{product.id}</td>
                <td style={styles.tableCell}>{product.productName}</td>
                <td
                  style={{
                    ...styles.tableCell,
                    ...(product.status === "Closed"
                      ? styles.statusClosed
                      : styles.statusOpen),
                  }}
                >
                  {product.status}
                </td>
                <td style={styles.tableCell}>{product.category}</td>
                <td style={styles.tableCell}>{product.randomValue}</td>
                <td style={styles.tableCell}>{product.minRiskControl}</td>
                <td style={styles.tableCell}>{product.maxRiskControl}</td>
                <td style={styles.operateCell}>
                  <button
                    style={styles.editButton}
                    onMouseOver={(e) =>
                      handleButtonHover(e, styles.buttonHover)
                    }
                    onMouseOut={(e) =>
                      handleButtonLeave(e, styles.editButton.backgroundColor)
                    }
                    onClick={() => handleEdit(product.id)}
                    title='Edit'
                  >
                    <EditIcon />
                  </button>

                  <button
                    style={styles.deleteButton}
                    onMouseOver={(e) =>
                      handleButtonHover(e, styles.deleteButtonHover)
                    }
                    onMouseOut={(e) =>
                      handleButtonLeave(e, styles.deleteButton.backgroundColor)
                    }
                    onClick={() => handleDelete(product.id)}
                    title='Permanently Delete'
                  >
                    <DeleteIcon />
                  </button>

                  {product.status === "Closed" && (
                    <button
                      style={styles.restoreButton}
                      onMouseOver={(e) =>
                        handleButtonHover(e, styles.restoreButtonHover)
                      }
                      onMouseOut={(e) =>
                        handleButtonLeave(
                          e,
                          styles.restoreButton.backgroundColor
                        )
                      }
                      onClick={() => handleRestore(product.id)}
                      title='Restore to Active'
                    >
                      <RestoreIcon />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <RecycleBinIcon />
            <h3>Recycle Bin is Empty</h3>
            <p>No products found in the recycle bin</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecycleBin;
