import React, { useState, useEffect } from "react";
import {
  Bell,
  Edit2,
  Trash2,
  Search,
  Plus,
  Filter,
  ArrowUpDown,
} from "lucide-react";

const ProductList = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("no");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState("");

  // Form states
  const [newProduct, setNewProduct] = useState({
    productName: "",
    category: "Foreign Exchange",
    randomValues: "",
    riskControlLow: "",
    riskControlHigh: "",
  });

  const [editForm, setEditForm] = useState({
    productName: "",
    category: "",
    randomValues: "",
    riskControlLow: "",
    riskControlHigh: "",
  });

  // Initial data
  const initialProducts = [
    {
      no: 1,
      serial: 14,
      productName: "BTC/USDT",
      status: "Open market",
      category: "Foreign Exchange",
      randomValues: "0.008",
      riskControlLow: "0.00001",
      riskControlHigh: "0.010",
      createdAt: "2024-01-15",
    },
    {
      no: 2,
      serial: 60,
      productName: "ETH/USDT",
      status: "Open market",
      category: "Foreign Exchange",
      randomValues: "0.005",
      riskControlLow: "0.001",
      riskControlHigh: "0.010",
      createdAt: "2024-01-14",
    },
    {
      no: 3,
      serial: 23,
      productName: "BNB/USDT",
      status: "Open market",
      category: "Foreign Exchange",
      randomValues: "0.005",
      riskControlLow: "0.001",
      riskControlHigh: "0.010",
      createdAt: "2024-01-13",
    },
    {
      no: 4,
      serial: 62,
      productName: "XRP/USDT",
      status: "Open market",
      category: "Foreign Exchange",
      randomValues: "0.0008",
      riskControlLow: "0.00001",
      riskControlHigh: "0.00015",
      createdAt: "2024-01-12",
    },
    {
      no: 5,
      serial: 17,
      productName: "LINK/USDT",
      status: "Open market",
      category: "Foreign Exchange",
      randomValues: "0.00003",
      riskControlLow: "0.00001",
      riskControlHigh: "0.00005",
      createdAt: "2024-01-11",
    },
    {
      no: 6,
      serial: 11,
      productName: "BCH/USDT",
      status: "Open market",
      category: "Foreign Exchange",
      randomValues: "0.008",
      riskControlLow: "0.00001",
      riskControlHigh: "0.00015",
      createdAt: "2024-01-10",
    },
    {
      no: 7,
      serial: 31,
      productName: "LTC/USDT",
      status: "Closed",
      category: "Cryptocurrency",
      randomValues: "0.04",
      riskControlLow: "0.03",
      riskControlHigh: "0.18",
      createdAt: "2024-01-09",
    },
    {
      no: 8,
      serial: 63,
      productName: "BSV/USDT",
      status: "Open market",
      category: "Foreign Exchange",
      randomValues: "0.0008",
      riskControlLow: "0.00001",
      riskControlHigh: "0.00015",
      createdAt: "2024-01-08",
    },
    {
      no: 9,
      serial: 58,
      productName: "ADA/USDT",
      status: "Open market",
      category: "Foreign Exchange",
      randomValues: "0.0008",
      riskControlLow: "0.00003",
      riskControlHigh: "0.00015",
      createdAt: "2024-01-07",
    },
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    const savedProducts = localStorage.getItem("productList");

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
      localStorage.setItem("productList", JSON.stringify(products));
    }
  }, [products, isLoading]);

  // Filter and search functionality
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.serial.toString().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "All" || product.status === filterStatus;
      const matchesCategory =
        filterCategory === "All" || product.category === filterCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Convert to numbers for numeric fields
      if (
        sortField === "no" ||
        sortField === "serial" ||
        sortField === "randomValues" ||
        sortField === "riskControlLow" ||
        sortField === "riskControlHigh"
      ) {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  // Product operations
  const handleAddProduct = () => {
    // Validation
    if (
      !newProduct.productName.trim() ||
      !newProduct.randomValues.trim() ||
      !newProduct.riskControlLow.trim() ||
      !newProduct.riskControlHigh.trim()
    ) {
      showMessage("All fields are required", "error");
      return;
    }

    // Check for duplicate product name
    const duplicate = products.find(
      (product) =>
        product.productName.toLowerCase() ===
        newProduct.productName.toLowerCase()
    );

    if (duplicate) {
      showMessage("A product with this name already exists", "error");
      return;
    }

    const newNo = Math.max(...products.map((p) => p.no), 0) + 1;
    const newSerial = Math.max(...products.map((p) => p.serial), 0) + 1;

    const productToAdd = {
      no: newNo,
      serial: newSerial,
      productName: newProduct.productName,
      status: "Open market",
      category: newProduct.category,
      randomValues: newProduct.randomValues,
      riskControlLow: newProduct.riskControlLow,
      riskControlHigh: newProduct.riskControlHigh,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setProducts([productToAdd, ...products]);
    setNewProduct({
      productName: "",
      category: "Foreign Exchange",
      randomValues: "",
      riskControlLow: "",
      riskControlHigh: "",
    });
    setShowAddForm(false);
    showMessage(
      `Product "${newProduct.productName}" added successfully`,
      "success"
    );
  };

  const handleEdit = (product) => {
    setEditingProduct(product.no);
    setEditForm({
      productName: product.productName,
      category: product.category,
      randomValues: product.randomValues,
      riskControlLow: product.riskControlLow,
      riskControlHigh: product.riskControlHigh,
    });
  };

  const handleSaveEdit = (productNo) => {
    if (
      !editForm.productName.trim() ||
      !editForm.randomValues.trim() ||
      !editForm.riskControlLow.trim() ||
      !editForm.riskControlHigh.trim()
    ) {
      showMessage("All fields are required", "error");
      return;
    }

    // Check for duplicate product name (excluding current product)
    const duplicate = products.find(
      (product) =>
        product.productName.toLowerCase() ===
          editForm.productName.toLowerCase() && product.no !== productNo
    );

    if (duplicate) {
      showMessage("A product with this name already exists", "error");
      return;
    }

    const updatedProducts = products.map((product) =>
      product.no === productNo ? { ...product, ...editForm } : product
    );

    setProducts(updatedProducts);
    setEditingProduct(null);
    setEditForm({
      productName: "",
      category: "",
      randomValues: "",
      riskControlLow: "",
      riskControlHigh: "",
    });
    showMessage(`Product updated successfully`, "success");
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditForm({
      productName: "",
      category: "",
      randomValues: "",
      riskControlLow: "",
      riskControlHigh: "",
    });
  };

  const handleToggleMarketStatus = (productNo) => {
    const updatedProducts = products.map((product) =>
      product.no === productNo
        ? {
            ...product,
            status: product.status === "Open market" ? "Closed" : "Open market",
          }
        : product
    );

    setProducts(updatedProducts);
    const product = products.find((p) => p.no === productNo);
    showMessage(
      `Market ${product.status === "Open market" ? "closed" : "opened"} for ${
        product.productName
      }`,
      "success"
    );
  };

  const handleDelete = (productNo) => {
    const product = products.find((p) => p.no === productNo);
    if (
      window.confirm(
        `Are you sure you want to delete "${product.productName}"? This action cannot be undone.`
      )
    ) {
      const updatedProducts = products.filter(
        (product) => product.no !== productNo
      );
      setProducts(updatedProducts);
      setSelectedProducts(selectedProducts.filter((no) => no !== productNo));
      showMessage(
        `Product "${product.productName}" deleted successfully`,
        "success"
      );
    }
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      showMessage("Please select at least one product to delete", "error");
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedProducts.length} selected products?`
      )
    ) {
      const updatedProducts = products.filter(
        (product) => !selectedProducts.includes(product.no)
      );
      setProducts(updatedProducts);
      setSelectedProducts([]);
      showMessage(
        `${selectedProducts.length} products deleted successfully`,
        "success"
      );
    }
  };

  const handleBulkMarketToggle = (newStatus) => {
    if (selectedProducts.length === 0) {
      showMessage("Please select at least one product", "error");
      return;
    }

    const updatedProducts = products.map((product) =>
      selectedProducts.includes(product.no)
        ? { ...product, status: newStatus }
        : product
    );

    setProducts(updatedProducts);
    showMessage(
      `${selectedProducts.length} products ${
        newStatus === "Open market" ? "opened" : "closed"
      }`,
      "success"
    );
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSelectProduct = (productNo) => {
    setSelectedProducts((prev) =>
      prev.includes(productNo)
        ? prev.filter((no) => no !== productNo)
        : [...prev, productNo]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.no));
    }
  };

  // Helper functions
  const showMessage = (text, type = "info") => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  // Statistics
  const getStatistics = () => {
    const totalProducts = products.length;
    const openProducts = products.filter(
      (p) => p.status === "Open market"
    ).length;
    const closedProducts = products.filter((p) => p.status === "Closed").length;
    const categories = [...new Set(products.map((p) => p.category))];

    return {
      totalProducts,
      openProducts,
      closedProducts,
      totalCategories: categories.length,
      selected: selectedProducts.length,
    };
  };

  const stats = getStatistics();

  // Styles
  const styles = {
    container: { backgroundColor: "#f5f5f5", minHeight: "100vh" },
    header: {
      backgroundColor: "white",
      borderBottom: "1px solid #e0e0e0",
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    headerInfo: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      fontSize: "13px",
    },
    headerItem: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    mainContent: { padding: "20px" },
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
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      minWidth: "120px",
      textAlign: "center",
    },
    statNumber: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    statLabel: {
      fontSize: "12px",
      color: "#666",
      textTransform: "uppercase",
    },
    controlsContainer: {
      backgroundColor: "white",
      borderRadius: "4px",
      padding: "15px 20px",
      marginBottom: "15px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
    },
    searchContainer: {
      display: "flex",
      alignItems: "center",
      background: "#f8f9fa",
      borderRadius: "4px",
      padding: "8px 12px",
      flex: 1,
      maxWidth: "300px",
    },
    searchInput: {
      border: "none",
      background: "transparent",
      outline: "none",
      fontSize: "13px",
      width: "100%",
      marginLeft: "8px",
    },
    filterContainer: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
    },
    filterSelect: {
      padding: "8px 12px",
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      fontSize: "13px",
      background: "white",
    },
    button: {
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "8px 16px",
      fontSize: "13px",
      cursor: "pointer",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    buttonSecondary: {
      backgroundColor: "#95a5a6",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "8px 16px",
      fontSize: "13px",
      cursor: "pointer",
      fontWeight: "500",
    },
    buttonDanger: {
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "8px 16px",
      fontSize: "13px",
      cursor: "pointer",
      fontWeight: "500",
    },
    buttonSuccess: {
      backgroundColor: "#27ae60",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "8px 16px",
      fontSize: "13px",
      cursor: "pointer",
      fontWeight: "500",
    },
    addForm: {
      backgroundColor: "#f8f9fa",
      padding: "20px",
      borderRadius: "6px",
      border: "1px solid #e0e0e0",
      marginBottom: "15px",
    },
    formGroup: {
      marginBottom: "15px",
    },
    formLabel: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "500",
      color: "#333",
      fontSize: "13px",
    },
    formInput: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      fontSize: "13px",
    },
    formButtons: {
      display: "flex",
      gap: "10px",
    },
    message: {
      padding: "10px 15px",
      borderRadius: "4px",
      marginBottom: "15px",
      fontSize: "14px",
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
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "4px",
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    table: {
      width: "100%",
      fontSize: "13px",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      borderBottom: "2px solid #e0e0e0",
    },
    tableHeaderCell: {
      padding: "12px 15px",
      textAlign: "center",
      color: "#666",
      fontWeight: "500",
      whiteSpace: "nowrap",
      cursor: "pointer",
      userSelect: "none",
    },
    sortHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
    },
    tableCell: {
      padding: "12px 15px",
      color: "#666",
      textAlign: "center",
    },
    operateCell: {
      padding: "12px 15px",
      textAlign: "center",
    },
    statusOpen: {
      color: "#27ae60",
      fontWeight: "500",
    },
    statusClosed: {
      color: "#e74c3c",
      fontWeight: "500",
    },
    buttonSmall: {
      padding: "6px 12px",
      fontSize: "12px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "4px",
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
        <div style={styles.loadingMessage}>Loading products...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Top Header */}
      <div style={styles.header}>
        <div style={styles.headerInfo}>
          <div style={styles.headerItem}>
            <span style={{ color: "#666" }}>online</span>
            <span style={{ fontWeight: "600" }}>1</span>
          </div>
          <div style={styles.headerItem}>
            <span style={{ color: "#666" }}>top up</span>
            <span style={{ fontWeight: "600" }}>4</span>
            <Bell size={16} color='#4a90e2' />
          </div>
          <div style={styles.headerItem}>
            <span style={{ color: "#666" }}>Withdraw money</span>
            <span style={{ fontWeight: "600" }}>4</span>
            <Bell size={16} color='#4a90e2' />
          </div>
          <div style={styles.headerItem}>
            <span style={{ color: "#666" }}>Order</span>
            <span style={{ fontWeight: "600" }}>0</span>
            <Bell size={16} color='#4a90e2' />
          </div>
          <div style={styles.headerItem}>
            <span style={{ color: "#666" }}>admin</span>
            <span style={{ color: "#999" }}>▼</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Statistics */}
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{stats.totalProducts}</div>
            <div style={styles.statLabel}>Total Products</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{stats.openProducts}</div>
            <div style={styles.statLabel}>Open Market</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{stats.closedProducts}</div>
            <div style={styles.statLabel}>Closed</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{stats.totalCategories}</div>
            <div style={styles.statLabel}>Categories</div>
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
              ...(message.includes("successfully")
                ? styles.successMessage
                : styles.errorMessage),
            }}
          >
            {message}
          </div>
        )}

        {/* Controls */}
        <div style={styles.controlsContainer}>
          <div style={styles.searchContainer}>
            <Search size={16} color='#666' />
            <input
              type='text'
              placeholder='Search products...'
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={styles.filterContainer}>
            <select
              style={styles.filterSelect}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value='All'>All Status</option>
              <option value='Open market'>Open Market</option>
              <option value='Closed'>Closed</option>
            </select>

            <select
              style={styles.filterSelect}
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value='All'>All Categories</option>
              {[...new Set(products.map((p) => p.category))].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button style={styles.button} onClick={() => handleSort("no")}>
            <ArrowUpDown size={14} />
            Sorting
          </button>

          {!showAddForm ? (
            <button style={styles.button} onClick={() => setShowAddForm(true)}>
              <Plus size={14} />
              Add product
            </button>
          ) : (
            <div style={styles.addForm}>
              <h3
                style={{
                  marginBottom: "15px",
                  color: "#333",
                  fontSize: "16px",
                }}
              >
                Add New Product
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                }}
              >
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Product Name</label>
                  <input
                    type='text'
                    style={styles.formInput}
                    value={newProduct.productName}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        productName: e.target.value,
                      })
                    }
                    placeholder='e.g., BTC/USDT'
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Category</label>
                  <select
                    style={styles.formInput}
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                  >
                    <option value='Foreign Exchange'>Foreign Exchange</option>
                    <option value='Cryptocurrency'>Cryptocurrency</option>
                    <option value='Stocks'>Stocks</option>
                    <option value='Commodities'>Commodities</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Random Values</label>
                  <input
                    type='text'
                    style={styles.formInput}
                    value={newProduct.randomValues}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        randomValues: e.target.value,
                      })
                    }
                    placeholder='e.g., 0.008'
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Risk Control Low</label>
                  <input
                    type='text'
                    style={styles.formInput}
                    value={newProduct.riskControlLow}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        riskControlLow: e.target.value,
                      })
                    }
                    placeholder='e.g., 0.00001'
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Risk Control High</label>
                  <input
                    type='text'
                    style={styles.formInput}
                    value={newProduct.riskControlHigh}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        riskControlHigh: e.target.value,
                      })
                    }
                    placeholder='e.g., 0.010'
                  />
                </div>
              </div>
              <div style={styles.formButtons}>
                <button style={styles.buttonSuccess} onClick={handleAddProduct}>
                  Add Product
                </button>
                <button
                  style={styles.buttonSecondary}
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {selectedProducts.length > 0 && (
            <>
              <button
                style={styles.buttonSuccess}
                onClick={() => handleBulkMarketToggle("Open market")}
              >
                Open Selected ({selectedProducts.length})
              </button>
              <button
                style={styles.buttonDanger}
                onClick={() => handleBulkMarketToggle("Closed")}
              >
                Close Selected ({selectedProducts.length})
              </button>
              <button style={styles.buttonDanger} onClick={handleBulkDelete}>
                Delete Selected ({selectedProducts.length})
              </button>
            </>
          )}
        </div>

        {/* Table */}
        <div style={styles.tableContainer}>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.tableHeaderCell}>
                    <input
                      type='checkbox'
                      checked={
                        selectedProducts.length === filteredProducts.length &&
                        filteredProducts.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th
                    style={styles.tableHeaderCell}
                    onClick={() => handleSort("no")}
                  >
                    <div style={styles.sortHeader}>
                      No.{" "}
                      {sortField === "no" && (sortOrder === "asc" ? "↑" : "↓")}
                    </div>
                  </th>
                  <th
                    style={styles.tableHeaderCell}
                    onClick={() => handleSort("serial")}
                  >
                    <div style={styles.sortHeader}>
                      Serial{" "}
                      {sortField === "serial" &&
                        (sortOrder === "asc" ? "↑" : "↓")}
                    </div>
                  </th>
                  <th
                    style={styles.tableHeaderCell}
                    onClick={() => handleSort("productName")}
                  >
                    <div style={styles.sortHeader}>
                      Product Name{" "}
                      {sortField === "productName" &&
                        (sortOrder === "asc" ? "↑" : "↓")}
                    </div>
                  </th>
                  <th
                    style={styles.tableHeaderCell}
                    onClick={() => handleSort("status")}
                  >
                    <div style={styles.sortHeader}>
                      Status{" "}
                      {sortField === "status" &&
                        (sortOrder === "asc" ? "↑" : "↓")}
                    </div>
                  </th>
                  <th
                    style={styles.tableHeaderCell}
                    onClick={() => handleSort("category")}
                  >
                    <div style={styles.sortHeader}>
                      Category{" "}
                      {sortField === "category" &&
                        (sortOrder === "asc" ? "↑" : "↓")}
                    </div>
                  </th>
                  <th
                    style={styles.tableHeaderCell}
                    onClick={() => handleSort("randomValues")}
                  >
                    <div style={styles.sortHeader}>
                      Random Values{" "}
                      {sortField === "randomValues" &&
                        (sortOrder === "asc" ? "↑" : "↓")}
                    </div>
                  </th>
                  <th
                    style={styles.tableHeaderCell}
                    onClick={() => handleSort("riskControlLow")}
                  >
                    <div style={styles.sortHeader}>
                      Risk control low{" "}
                      {sortField === "riskControlLow" &&
                        (sortOrder === "asc" ? "↑" : "↓")}
                    </div>
                  </th>
                  <th
                    style={styles.tableHeaderCell}
                    onClick={() => handleSort("riskControlHigh")}
                  >
                    <div style={styles.sortHeader}>
                      Risk control high{" "}
                      {sortField === "riskControlHigh" &&
                        (sortOrder === "asc" ? "↑" : "↓")}
                    </div>
                  </th>
                  <th style={styles.tableHeaderCell}>Operate</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((item) => (
                  <tr
                    key={item.no}
                    style={{ borderBottom: "1px solid #f0f0f0" }}
                  >
                    <td style={styles.tableCell}>
                      <input
                        type='checkbox'
                        checked={selectedProducts.includes(item.no)}
                        onChange={() => handleSelectProduct(item.no)}
                      />
                    </td>
                    <td style={styles.tableCell}>{item.no}</td>
                    <td style={styles.tableCell}>{item.serial}</td>
                    <td
                      style={{
                        ...styles.tableCell,
                        color: "#333",
                        fontWeight: "500",
                      }}
                    >
                      {editingProduct === item.no ? (
                        <input
                          type='text'
                          style={styles.formInput}
                          value={editForm.productName}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              productName: e.target.value,
                            })
                          }
                        />
                      ) : (
                        item.productName
                      )}
                    </td>
                    <td
                      style={{
                        ...styles.tableCell,
                        ...(item.status === "Open market"
                          ? styles.statusOpen
                          : styles.statusClosed),
                      }}
                    >
                      {item.status}
                    </td>
                    <td style={styles.tableCell}>
                      {editingProduct === item.no ? (
                        <select
                          style={styles.formInput}
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              category: e.target.value,
                            })
                          }
                        >
                          <option value='Foreign Exchange'>
                            Foreign Exchange
                          </option>
                          <option value='Cryptocurrency'>Cryptocurrency</option>
                          <option value='Stocks'>Stocks</option>
                          <option value='Commodities'>Commodities</option>
                        </select>
                      ) : (
                        item.category
                      )}
                    </td>
                    <td style={styles.tableCell}>
                      {editingProduct === item.no ? (
                        <input
                          type='text'
                          style={styles.formInput}
                          value={editForm.randomValues}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              randomValues: e.target.value,
                            })
                          }
                        />
                      ) : (
                        item.randomValues
                      )}
                    </td>
                    <td style={styles.tableCell}>
                      {editingProduct === item.no ? (
                        <input
                          type='text'
                          style={styles.formInput}
                          value={editForm.riskControlLow}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              riskControlLow: e.target.value,
                            })
                          }
                        />
                      ) : (
                        item.riskControlLow
                      )}
                    </td>
                    <td style={styles.tableCell}>
                      {editingProduct === item.no ? (
                        <input
                          type='text'
                          style={styles.formInput}
                          value={editForm.riskControlHigh}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              riskControlHigh: e.target.value,
                            })
                          }
                        />
                      ) : (
                        item.riskControlHigh
                      )}
                    </td>
                    <td style={styles.operateCell}>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
                        {editingProduct === item.no ? (
                          <>
                            <button
                              style={{
                                ...styles.buttonSmall,
                                backgroundColor: "#27ae60",
                                color: "white",
                              }}
                              onClick={() => handleSaveEdit(item.no)}
                            >
                              Save
                            </button>
                            <button
                              style={{
                                ...styles.buttonSmall,
                                backgroundColor: "#95a5a6",
                                color: "white",
                              }}
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              style={{
                                ...styles.buttonSmall,
                                backgroundColor: "#e74c3c",
                                color: "white",
                              }}
                              onClick={() => handleToggleMarketStatus(item.no)}
                            >
                              {item.status === "Open market"
                                ? "Close market"
                                : "Open market"}
                            </button>
                            <button
                              style={{
                                ...styles.buttonSmall,
                                backgroundColor: "#3498db",
                                color: "white",
                              }}
                              onClick={() => handleEdit(item)}
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              style={{
                                ...styles.buttonSmall,
                                backgroundColor: "#e74c3c",
                                color: "white",
                              }}
                              onClick={() => handleDelete(item.no)}
                            >
                              <Trash2 size={12} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#666" }}
            >
              {searchTerm || filterStatus !== "All" || filterCategory !== "All"
                ? "No products found matching your criteria"
                : "No products found"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
