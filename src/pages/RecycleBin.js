import React, { useState, useEffect } from "react";

const RecycleBin = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Initial data
  const initialProducts = [
    {
      id: 16,
      productName: "ARM/USDT",
      status: "Closed",
      category: "Foreign Exchange",
      randomValue: "0.00003",
      minRiskControl: "0.00001",
      maxRiskControl: "0.00005",
      operate: "Click Restore",
      deletedAt: "2024-01-15 10:30:00",
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
      deletedAt: "2024-01-14 14:20:00",
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
      deletedAt: "2024-01-14 09:15:00",
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
      deletedAt: "2024-01-13 16:45:00",
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
      deletedAt: "2024-01-13 11:30:00",
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
      deletedAt: "2024-01-12 13:20:00",
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
      deletedAt: "2024-01-12 08:45:00",
    },
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    const savedProducts = localStorage.getItem("recycleBinProducts");

    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error("Error loading saved products:", error);
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
    }

    setIsLoading(false);
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("recycleBinProducts", JSON.stringify(products));
    }
  }, [products, isLoading]);

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

  // Sorting functionality
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

  // Filter and search functionality
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || product.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Product operations
  const handleRestore = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, status: "Market opening", operate: "Restored" }
        : product
    );
    setProducts(updatedProducts);
    setSelectedProducts(selectedProducts.filter((id) => id !== productId));
  };

  const handleBulkRestore = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to restore");
      return;
    }

    const updatedProducts = products.map((product) =>
      selectedProducts.includes(product.id)
        ? { ...product, status: "Market opening", operate: "Restored" }
        : product
    );
    setProducts(updatedProducts);
    setSelectedProducts([]);
    alert(`${selectedProducts.length} products restored successfully`);
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setEditForm({
      productName: product.productName,
      randomValue: product.randomValue,
      minRiskControl: product.minRiskControl,
      maxRiskControl: product.maxRiskControl,
      category: product.category,
    });
  };

  const handleSaveEdit = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, ...editForm } : product
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
    setEditForm({});
    alert(`Product ${productId} updated successfully`);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditForm({});
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
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
      alert(`Product ${productId} permanently deleted`);
    }
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to delete");
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to permanently delete ${selectedProducts.length} products? This action cannot be undone.`
      )
    ) {
      const updatedProducts = products.filter(
        (product) => !selectedProducts.includes(product.id)
      );
      setProducts(updatedProducts);
      setSelectedProducts([]);
      alert(`${selectedProducts.length} products permanently deleted`);
    }
  };

  const handleEmptyRecycleBin = () => {
    if (products.length === 0) {
      alert("Recycle bin is already empty");
      return;
    }

    if (
      window.confirm(
        "Are you sure you want to empty the recycle bin? All items will be permanently deleted and this action cannot be undone."
      )
    ) {
      setProducts([]);
      setSelectedProducts([]);
      alert("Recycle bin emptied successfully");
    }
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      productName: "NEW/USDT",
      status: "Market opening",
      category: "Foreign Exchange",
      randomValue: "0.001",
      minRiskControl: "0.0001",
      maxRiskControl: "0.01",
      operate: "Click Restore",
      deletedAt:
        new Date().toISOString().split("T")[0] +
        " " +
        new Date().toTimeString().split(" ")[0],
    };

    setProducts([newProduct, ...products]);
    alert(`New product ${newProduct.id} added to recycle bin`);
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id));
    }
  };

  // Statistics
  const getStatistics = () => {
    const closedProducts = products.filter((p) => p.status === "Closed").length;
    const openProducts = products.filter(
      (p) => p.status === "Market opening"
    ).length;

    return {
      total: products.length,
      closed: closedProducts,
      open: openProducts,
      selected: selectedProducts.length,
    };
  };

  const stats = getStatistics();

  // Enhanced styles
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1400px",
      margin: "0 auto",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    },
    pageTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
      display: "flex",
      alignItems: "center",
    },
    statsContainer: {
      display: "flex",
      gap: "15px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    statCard: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      minWidth: "120px",
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
    controlsContainer: {
      display: "flex",
      gap: "15px",
      marginBottom: "20px",
      flexWrap: "wrap",
      alignItems: "center",
    },
    searchInput: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      minWidth: "200px",
    },
    filterSelect: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      backgroundColor: "white",
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
    saveButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      marginRight: "5px",
    },
    cancelButton: {
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
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
    },
    bulkRestoreButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    bulkDeleteButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.2s",
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
      flexWrap: "wrap",
    },
    editInput: {
      padding: "4px 6px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "12px",
      width: "80px",
    },
    loadingMessage: {
      textAlign: "center",
      padding: "40px",
      color: "#666",
      fontSize: "16px",
    },
  };

  const handleButtonHover = (e, hoverStyle) => {
    e.target.style.backgroundColor = hoverStyle.backgroundColor;
  };

  const handleButtonLeave = (e, originalColor) => {
    e.target.style.backgroundColor = originalColor;
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingMessage}>Loading recycle bin...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>
        <RecycleBinIcon />
        Recycle Bin
      </h1>

      {/* Statistics */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.total}</div>
          <div style={styles.statLabel}>Total Products</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.closed}</div>
          <div style={styles.statLabel}>Closed</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.open}</div>
          <div style={styles.statLabel}>Market Opening</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.selected}</div>
          <div style={styles.statLabel}>Selected</div>
        </div>
      </div>

      {/* Controls */}
      <div style={styles.controlsContainer}>
        <input
          type='text'
          placeholder='Search products...'
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          style={styles.filterSelect}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value='All'>All Status</option>
          <option value='Closed'>Closed</option>
          <option value='Market opening'>Market Opening</option>
        </select>
      </div>

      <div style={styles.tableContainer}>
        {/* Action Buttons */}
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
            style={styles.bulkRestoreButton}
            onMouseOver={(e) => handleButtonHover(e, styles.restoreButtonHover)}
            onMouseOut={(e) =>
              handleButtonLeave(e, styles.bulkRestoreButton.backgroundColor)
            }
            onClick={handleBulkRestore}
            disabled={selectedProducts.length === 0}
          >
            Restore Selected ({selectedProducts.length})
          </button>

          <button
            style={styles.bulkDeleteButton}
            onMouseOver={(e) => handleButtonHover(e, styles.deleteButtonHover)}
            onMouseOut={(e) =>
              handleButtonLeave(e, styles.bulkDeleteButton.backgroundColor)
            }
            onClick={handleBulkDelete}
            disabled={selectedProducts.length === 0}
          >
            Delete Selected ({selectedProducts.length})
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
            disabled={products.length === 0}
          >
            Empty Recycle Bin
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>
                <input
                  type='checkbox'
                  checked={
                    selectedProducts.length === filteredProducts.length &&
                    filteredProducts.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
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
              <th style={styles.tableHeader}>Deleted At</th>
              <th style={styles.tableHeader}>operate</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td style={styles.tableCell}>
                  <input
                    type='checkbox'
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </td>
                <td style={styles.tableCell}>{product.id}</td>
                <td style={styles.tableCell}>
                  {editingProduct === product.id ? (
                    <input
                      style={styles.editInput}
                      value={editForm.productName}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          productName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.productName
                  )}
                </td>
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
                <td style={styles.tableCell}>
                  {editingProduct === product.id ? (
                    <input
                      style={styles.editInput}
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td style={styles.tableCell}>
                  {editingProduct === product.id ? (
                    <input
                      style={styles.editInput}
                      value={editForm.randomValue}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          randomValue: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.randomValue
                  )}
                </td>
                <td style={styles.tableCell}>
                  {editingProduct === product.id ? (
                    <input
                      style={styles.editInput}
                      value={editForm.minRiskControl}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          minRiskControl: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.minRiskControl
                  )}
                </td>
                <td style={styles.tableCell}>
                  {editingProduct === product.id ? (
                    <input
                      style={styles.editInput}
                      value={editForm.maxRiskControl}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          maxRiskControl: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.maxRiskControl
                  )}
                </td>
                <td style={styles.tableCell}>{product.deletedAt || "N/A"}</td>
                <td style={styles.operateCell}>
                  {editingProduct === product.id ? (
                    <>
                      <button
                        style={styles.saveButton}
                        onClick={() => handleSaveEdit(product.id)}
                      >
                        Save
                      </button>
                      <button
                        style={styles.cancelButton}
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        style={styles.editButton}
                        onMouseOver={(e) =>
                          handleButtonHover(e, styles.buttonHover)
                        }
                        onMouseOut={(e) =>
                          handleButtonLeave(
                            e,
                            styles.editButton.backgroundColor
                          )
                        }
                        onClick={() => handleEdit(product)}
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
                          handleButtonLeave(
                            e,
                            styles.deleteButton.backgroundColor
                          )
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
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
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
