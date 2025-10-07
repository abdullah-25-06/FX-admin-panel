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
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();


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


  useEffect(() => {
const fetchWalletData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wallet/wallet-history`,
        {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("auth"),
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ Handle 401 Unauthorized
      if (response.status === 401) {
        console.warn("Unauthorized: Token expired or invalid");
        localStorage.removeItem("auth");
        setMessage("⚠️ Session expired. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch wallet data");
      }

      const data = await response.json();
      const rechargeRequests = data.message.rechargeRequests.map((item, index) => ({
        no: index + 1,
        serial: item._id,
        _id: item._id,
        name: item.userId.user_name,
        amount: item.amount,
        payment_url: item.payment_url,
      }));

      setProducts(rechargeRequests);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      setMessage("❌ Failed to load wallet data");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

    fetchWalletData();
  }, [])

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.serial?.toString().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase());

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
      `${selectedProducts.length} products ${newStatus === "Open market" ? "opened" : "closed"
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
            <div style={styles.statLabel}>Total Records</div>
          </div>
          {/* <div style={styles.statCard}>
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
          </div> */}
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
          <button style={styles.button} onClick={() => handleSort("no")}>
            <ArrowUpDown size={14} />
            Sorting
          </button>

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
                  >
                    <div style={styles.sortHeader}>
                      User Name{" "}
                    </div>
                  </th>
                  <th
                    style={styles.tableHeaderCell}
                  >
                    <div style={styles.sortHeader}>
                      Amount{" "}
                    </div>
                  </th>
                  <th
                    style={styles.tableHeaderCell}
                  >
                    <div style={styles.sortHeader}>
                      Payment Url{" "}
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((item) => (
                  <tr
                    key={item.no}
                    style={{ borderBottom: "1px solid #f0f0f0" }}
                  >
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
                        item.name
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
                      {item.amount}
                    </td>
                    <td style={styles.tableCell}>
                      <a href={item.payment_url} target="_blank" rel="noopener noreferrer">
                        Image Link
                      </a>
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
