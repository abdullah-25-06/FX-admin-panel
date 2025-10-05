import React, { useState, useEffect } from "react";
import {
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  ChevronDown,
  X,
} from "lucide-react";

const WithdrawalList = () => {
  // State management
  const [withdrawals, setWithdrawals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [sortField, setSortField] = useState("no");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedWithdrawals, setSelectedWithdrawals] = useState([]);
  const [message, setMessage] = useState("");
  const [viewingWithdrawal, setViewingWithdrawal] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Initial data
  const initialData = [
    {
      no: 385,
      uid: "1058801",
      username: "Ali 12345",
      dateTime: "2025-09-21 19:22:14",
      withdrawAmount: 116478.0,
      accountBalance: 0.0,
      holderName: "Saiyad rukman ratt",
      bankName: "Karnataka bank",
      accountNumber: "653250010104810I",
      walletAddress: "",
      qrCode: "",
      status: "Pending",
      paymentMethod: "Bank Transfer",
      transactionId: "TX3859271",
      notes: "",
    },
    {
      no: 384,
      uid: "1058817",
      username: "Waheed1",
      dateTime: "2025-09-20 16:54:03",
      withdrawAmount: 20.0,
      accountBalance: 50.0,
      holderName: "",
      bankName: "",
      accountNumber: "",
      walletAddress: "Trcejdvsbkkdjhjdd3uhsgwb",
      qrCode: "",
      status: "Passed",
      paymentMethod: "Crypto",
      transactionId: "TX3848156",
      notes: "Auto-approved",
    },
    {
      no: 383,
      uid: "1058805",
      username: "SanaKhan",
      dateTime: "2025-09-19 11:45:20",
      withdrawAmount: 250.5,
      accountBalance: 1000.0,
      holderName: "Sana Khan",
      bankName: "HBL Bank",
      accountNumber: "PK12HABB00000012345678",
      walletAddress: "3Ed8nsbbdheh293jd8s73",
      qrCode: "https://qr.example.com/sana",
      status: "Frozen",
      paymentMethod: "Bank Transfer",
      transactionId: "TX3837429",
      notes: "Under review",
    },
    {
      no: 382,
      uid: "1058809",
      username: "JohnCrypto",
      dateTime: "2025-09-18 09:22:14",
      withdrawAmount: 1500.0,
      accountBalance: 500.0,
      holderName: "John Doe",
      bankName: "Meezan Bank",
      accountNumber: "PK45MEZN00000087654321",
      walletAddress: "",
      qrCode: "",
      status: "Rejected",
      paymentMethod: "Bank Transfer",
      transactionId: "TX3826593",
      notes: "Insufficient documentation",
    },
    {
      no: 381,
      uid: "1058810",
      username: "HiraAli",
      dateTime: "2025-09-17 14:30:00",
      withdrawAmount: 750.0,
      accountBalance: 1200.0,
      holderName: "Hira Ali",
      bankName: "UBL",
      accountNumber: "PK98UBL00000009876543",
      walletAddress: "bc1qasdsadasd12345",
      qrCode: "",
      status: "Passed",
      paymentMethod: "Crypto",
      transactionId: "TX3815748",
      notes: "Quick processing",
    },
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    const savedWithdrawals = localStorage.getItem("withdrawalList");

    if (savedWithdrawals) {
      try {
        setWithdrawals(JSON.parse(savedWithdrawals));
      } catch (error) {
        console.error("Error loading saved withdrawals:", error);
        setWithdrawals(initialData);
      }
    } else {
      setWithdrawals(initialData);
    }

    setIsLoading(false);
  }, []);

  // Save to localStorage whenever withdrawals change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("withdrawalList", JSON.stringify(withdrawals));
    }
  }, [withdrawals, isLoading]);

  // Filter and search functionality
  const filteredWithdrawals = withdrawals
    .filter((withdrawal) => {
      const matchesSearch =
        withdrawal.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        withdrawal.uid.includes(searchTerm) ||
        withdrawal.holderName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        withdrawal.transactionId
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "All" || withdrawal.status === filterStatus;

      const matchesDate =
        !filterDate || withdrawal.dateTime.startsWith(filterDate);

      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (
        sortField === "no" ||
        sortField === "withdrawAmount" ||
        sortField === "accountBalance"
      ) {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortField === "dateTime") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
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

  // Withdrawal operations
  const handleStatusUpdate = (withdrawalNo, newStatus, notes = "") => {
    const updatedWithdrawals = withdrawals.map((withdrawal) =>
      withdrawal.no === withdrawalNo
        ? {
            ...withdrawal,
            status: newStatus,
            notes: notes || withdrawal.notes,
            processedAt: new Date().toISOString(),
          }
        : withdrawal
    );

    setWithdrawals(updatedWithdrawals);

    const withdrawal = withdrawals.find((w) => w.no === withdrawalNo);
    const statusMessages = {
      Passed: `Withdrawal #${withdrawalNo} approved successfully`,
      Rejected: `Withdrawal #${withdrawalNo} rejected`,
      Frozen: `Withdrawal #${withdrawalNo} frozen for review`,
      Pending: `Withdrawal #${withdrawalNo} set to pending`,
    };

    showMessage(
      statusMessages[newStatus] ||
        `Status updated for withdrawal #${withdrawalNo}`
    );
  };

  const handleBulkStatusUpdate = (newStatus) => {
    if (selectedWithdrawals.length === 0) {
      showMessage("Please select at least one withdrawal", "error");
      return;
    }

    const updatedWithdrawals = withdrawals.map((withdrawal) =>
      selectedWithdrawals.includes(withdrawal.no)
        ? {
            ...withdrawal,
            status: newStatus,
            processedAt: new Date().toISOString(),
          }
        : withdrawal
    );

    setWithdrawals(updatedWithdrawals);
    setSelectedWithdrawals([]);

    const statusMessages = {
      Passed: `${selectedWithdrawals.length} withdrawals approved`,
      Rejected: `${selectedWithdrawals.length} withdrawals rejected`,
      Frozen: `${selectedWithdrawals.length} withdrawals frozen`,
    };

    showMessage(statusMessages[newStatus] || `Bulk status update completed`);
  };

  const handleDelete = (withdrawalNo) => {
    const withdrawal = withdrawals.find((w) => w.no === withdrawalNo);
    if (
      window.confirm(
        `Are you sure you want to delete withdrawal #${withdrawalNo} for ${withdrawal.username}?`
      )
    ) {
      const updatedWithdrawals = withdrawals.filter(
        (withdrawal) => withdrawal.no !== withdrawalNo
      );
      setWithdrawals(updatedWithdrawals);
      setSelectedWithdrawals(
        selectedWithdrawals.filter((no) => no !== withdrawalNo)
      );
      showMessage(`Withdrawal #${withdrawalNo} deleted successfully`);
    }
  };

  const handleBulkDelete = () => {
    if (selectedWithdrawals.length === 0) {
      showMessage("Please select at least one withdrawal to delete", "error");
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedWithdrawals.length} selected withdrawals?`
      )
    ) {
      const updatedWithdrawals = withdrawals.filter(
        (withdrawal) => !selectedWithdrawals.includes(withdrawal.no)
      );
      setWithdrawals(updatedWithdrawals);
      setSelectedWithdrawals([]);
      showMessage(
        `${selectedWithdrawals.length} withdrawals deleted successfully`
      );
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const handleSelectWithdrawal = (withdrawalNo) => {
    setSelectedWithdrawals((prev) =>
      prev.includes(withdrawalNo)
        ? prev.filter((no) => no !== withdrawalNo)
        : [...prev, withdrawalNo]
    );
  };

  const handleSelectAll = () => {
    if (selectedWithdrawals.length === filteredWithdrawals.length) {
      setSelectedWithdrawals([]);
    } else {
      setSelectedWithdrawals(
        filteredWithdrawals.map((withdrawal) => withdrawal.no)
      );
    }
  };

  const handleExportData = () => {
    const dataToExport = filteredWithdrawals.map((w) => ({
      "Withdrawal No": w.no,
      UID: w.uid,
      Username: w.username,
      "Date/Time": w.dateTime,
      Amount: w.withdrawAmount,
      Balance: w.accountBalance,
      "Payment Method": w.paymentMethod,
      Status: w.status,
      "Transaction ID": w.transactionId,
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
    a.download = `withdrawals-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showMessage(`Exported ${filteredWithdrawals.length} withdrawals`);
  };

  // Helper functions
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  const getStatusColor = (status) => {
    const colors = {
      Passed: "#27ae60",
      Rejected: "#e74c3c",
      Frozen: "#f39c12",
      Pending: "#3498db",
    };
    return colors[status] || "#666";
  };

  const getStatusIcon = (status) => {
    const icons = {
      Passed: "✓",
      Rejected: "✗",
      Frozen: "❄",
      Pending: "⏳",
    };
    return icons[status] || "";
  };

  // Statistics
  const getStatistics = () => {
    const totalWithdrawals = withdrawals.length;
    const totalAmount = withdrawals.reduce(
      (sum, w) => sum + w.withdrawAmount,
      0
    );
    const pendingWithdrawals = withdrawals.filter(
      (w) => w.status === "Pending"
    ).length;
    const passedWithdrawals = withdrawals.filter(
      (w) => w.status === "Passed"
    ).length;
    const frozenWithdrawals = withdrawals.filter(
      (w) => w.status === "Frozen"
    ).length;

    return {
      totalWithdrawals,
      totalAmount: totalAmount.toFixed(2),
      pendingWithdrawals,
      passedWithdrawals,
      frozenWithdrawals,
      selected: selectedWithdrawals.length,
    };
  };

  const stats = getStatistics();

  // Responsive Styles
  const styles = {
    container: {
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
      padding: "16px",
      boxSizing: "border-box",
      width: "100%",
      maxWidth: "100vw",
      overflowX: "hidden",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "12px",
      marginBottom: "16px",
    },
    titleSection: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flex: 1,
      minWidth: "250px",
    },
    controlsSection: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      justifyContent: "flex-end",
      flex: 1,
    },
    searchContainer: {
      display: "flex",
      alignItems: "center",
      background: "white",
      padding: "8px 12px",
      borderRadius: "6px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      minWidth: isMobile ? "100%" : "250px",
      flex: isMobile ? 1 : "none",
    },
    statsContainer: {
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
      gap: "12px",
      marginBottom: "16px",
    },
    statCard: {
      backgroundColor: "white",
      padding: "12px 8px",
      borderRadius: "6px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      textAlign: "center",
      minWidth: "0",
    },
    statNumber: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "bold",
      marginBottom: "4px",
      color: "#333",
    },
    statLabel: {
      fontSize: isMobile ? "10px" : "11px",
      color: "#666",
      textTransform: "uppercase",
    },
    controlsRow: {
      backgroundColor: "white",
      borderRadius: "6px",
      padding: "12px 16px",
      marginBottom: "12px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flexWrap: "wrap",
    },
    filterContainer: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
      flexWrap: "wrap",
      width: "100%",
    },
    select: {
      padding: "8px 12px",
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      fontSize: "14px",
      background: "white",
      minWidth: isMobile ? "calc(50% - 4px)" : "140px",
      flex: isMobile ? 1 : "none",
    },
    input: {
      padding: "8px 12px",
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      fontSize: "14px",
      background: "white",
      minWidth: isMobile ? "calc(50% - 4px)" : "150px",
      flex: isMobile ? 1 : "none",
    },
    button: {
      padding: "8px 12px",
      border: "none",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontWeight: "500",
      whiteSpace: "nowrap",
      flex: isMobile ? 1 : "none",
      justifyContent: "center",
      minHeight: "40px",
    },
    buttonPrimary: {
      backgroundColor: "#3498db",
      color: "white",
    },
    buttonSuccess: {
      backgroundColor: "#27ae60",
      color: "white",
    },
    buttonWarning: {
      backgroundColor: "#f39c12",
      color: "white",
    },
    buttonDanger: {
      backgroundColor: "#e74c3c",
      color: "white",
    },
    buttonSecondary: {
      backgroundColor: "#95a5a6",
      color: "white",
    },
    message: {
      padding: "12px 16px",
      borderRadius: "6px",
      marginBottom: "16px",
      fontSize: "14px",
      textAlign: "center",
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
    tableWrapper: {
      backgroundColor: "white",
      borderRadius: "6px",
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      display: isMobile ? "none" : "block",
      width: "100%",
      overflowX: "auto",
    },
    table: {
      width: "100%",
      fontSize: "14px",
      borderCollapse: "collapse",
      minWidth: "1000px",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      borderBottom: "2px solid #e0e0e0",
    },
    tableHeaderCell: {
      padding: "12px 8px",
      textAlign: "left",
      color: "#666",
      fontWeight: "500",
      whiteSpace: "nowrap",
      fontSize: "12px",
      cursor: "pointer",
      userSelect: "none",
    },
    tableCell: {
      padding: "12px 8px",
      color: "#333",
      fontSize: "13px",
      verticalAlign: "middle",
      whiteSpace: "nowrap",
    },
    statusBadge: {
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "11px",
      fontWeight: "600",
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
    },
    actionButtons: {
      display: "flex",
      gap: "4px",
      flexWrap: "wrap",
    },
    cardList: {
      display: isMobile ? "block" : "none",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "12px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      border: "1px solid #e0e0e0",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
      paddingBottom: "8px",
      borderBottom: "1px solid #f0f0f0",
    },
    cardRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    },
    cardLabel: {
      color: "#666",
      fontSize: "13px",
      fontWeight: "500",
      minWidth: "100px",
    },
    cardValue: {
      color: "#333",
      fontSize: "13px",
      textAlign: "right",
      flex: 1,
      wordBreak: "break-word",
    },
    cardActions: {
      display: "flex",
      gap: "8px",
      marginTop: "12px",
      flexWrap: "wrap",
    },
    loadingMessage: {
      textAlign: "center",
      padding: "40px",
      color: "#666",
      fontSize: "16px",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "16px",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "20px",
      width: "100%",
      maxWidth: "500px",
      maxHeight: "80vh",
      overflow: "auto",
    },
    bulkActionsContainer: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      width: "100%",
      marginTop: "12px",
    },
    bulkActionButton: {
      padding: "8px 12px",
      border: "none",
      borderRadius: "4px",
      fontSize: "12px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      fontWeight: "500",
      flex: isMobile ? "1 1 calc(50% - 4px)" : "none",
      minWidth: isMobile ? "calc(50% - 4px)" : "auto",
      justifyContent: "center",
    },
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingMessage}>Loading withdrawal list...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h2
            style={{
              margin: 0,
              fontSize: isMobile ? "20px" : "24px",
              color: "#333",
            }}
          >
            Withdrawal List
          </h2>
          <span style={{ color: "#999", fontSize: "14px" }}>
            Total: {filteredWithdrawals.length}
          </span>
        </div>

        <div style={styles.controlsSection}>
          <div style={styles.searchContainer}>
            <Search size={16} color='#666' />
            <input
              style={{
                border: "none",
                outline: "none",
                fontSize: "14px",
                width: "100%",
                marginLeft: "8px",
                background: "transparent",
              }}
              placeholder='Search withdrawals...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {!isMobile && (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.totalWithdrawals}</div>
          <div style={styles.statLabel}>Total</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>${stats.totalAmount}</div>
          <div style={styles.statLabel}>Amount</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.pendingWithdrawals}</div>
          <div style={styles.statLabel}>Pending</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.passedWithdrawals}</div>
          <div style={styles.statLabel}>Approved</div>
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
            ...(message.includes("error")
              ? styles.errorMessage
              : styles.successMessage),
          }}
        >
          {message}
        </div>
      )}

      {/* Filters and Bulk Actions */}
      {(showFilters || selectedWithdrawals.length > 0) && (
        <div style={styles.controlsRow}>
          <div style={styles.filterContainer}>
            {showFilters && (
              <>
                <select
                  style={styles.select}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value='All'>All Status</option>
                  <option value='Pending'>Pending</option>
                  <option value='Passed'>Approved</option>
                  <option value='Rejected'>Rejected</option>
                  <option value='Frozen'>Frozen</option>
                </select>

                <input
                  type='date'
                  style={styles.input}
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </>
            )}

            {selectedWithdrawals.length > 0 && (
              <div style={styles.bulkActionsContainer}>
                <button
                  style={{
                    ...styles.bulkActionButton,
                    ...styles.buttonSuccess,
                  }}
                  onClick={() => handleBulkStatusUpdate("Passed")}
                >
                  ✓ Approve Selected
                </button>
                <button
                  style={{ ...styles.bulkActionButton, ...styles.buttonDanger }}
                  onClick={() => handleBulkStatusUpdate("Rejected")}
                >
                  ✗ Reject Selected
                </button>
                <button
                  style={{
                    ...styles.bulkActionButton,
                    ...styles.buttonWarning,
                  }}
                  onClick={() => handleBulkStatusUpdate("Frozen")}
                >
                  ❄ Freeze Selected
                </button>
                <button
                  style={{ ...styles.bulkActionButton, ...styles.buttonDanger }}
                  onClick={handleBulkDelete}
                >
                  🗑️ Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Action Buttons */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{ ...styles.button, ...styles.buttonSecondary, flex: "1" }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonPrimary, flex: "1" }}
            onClick={handleExportData}
          >
            <Download size={16} />
            Export
          </button>
        </div>
      )}

      {/* Table (Desktop) */}
      <div style={styles.tableWrapper}>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableHeaderCell}>
                  <input
                    type='checkbox'
                    checked={
                      selectedWithdrawals.length ===
                        filteredWithdrawals.length &&
                      filteredWithdrawals.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th
                  style={styles.tableHeaderCell}
                  onClick={() => handleSort("no")}
                >
                  No. {sortField === "no" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  style={styles.tableHeaderCell}
                  onClick={() => handleSort("uid")}
                >
                  UID {sortField === "uid" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  style={styles.tableHeaderCell}
                  onClick={() => handleSort("username")}
                >
                  Username{" "}
                  {sortField === "username" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  style={styles.tableHeaderCell}
                  onClick={() => handleSort("dateTime")}
                >
                  Date/Time{" "}
                  {sortField === "dateTime" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  style={styles.tableHeaderCell}
                  onClick={() => handleSort("withdrawAmount")}
                >
                  Amount{" "}
                  {sortField === "withdrawAmount" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th style={styles.tableHeaderCell}>Payment Method</th>
                <th style={styles.tableHeaderCell}>Account/Wallet</th>
                <th
                  style={styles.tableHeaderCell}
                  onClick={() => handleSort("status")}
                >
                  Status{" "}
                  {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWithdrawals.map((item) => (
                <tr key={item.no} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={styles.tableCell}>
                    <input
                      type='checkbox'
                      checked={selectedWithdrawals.includes(item.no)}
                      onChange={() => handleSelectWithdrawal(item.no)}
                    />
                  </td>
                  <td style={styles.tableCell}>{item.no}</td>
                  <td style={styles.tableCell}>{item.uid}</td>
                  <td style={styles.tableCell}>{item.username}</td>
                  <td style={styles.tableCell}>
                    <div>{item.dateTime.split(" ")[0]}</div>
                    <div style={{ color: "#999", fontSize: "11px" }}>
                      {item.dateTime.split(" ")[1]}
                    </div>
                  </td>
                  <td
                    style={{
                      ...styles.tableCell,
                      color: "#27ae60",
                      fontWeight: 500,
                    }}
                  >
                    ${item.withdrawAmount.toFixed(2)}
                  </td>
                  <td style={styles.tableCell}>{item.paymentMethod}</td>
                  <td style={styles.tableCell}>
                    <div
                      style={{
                        maxWidth: "150px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.bankName || item.walletAddress || "-"}
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        backgroundColor: getStatusColor(item.status) + "20",
                        color: getStatusColor(item.status),
                      }}
                    >
                      {getStatusIcon(item.status)} {item.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <button
                        style={{
                          ...styles.button,
                          ...styles.buttonSuccess,
                          padding: "6px 8px",
                          fontSize: "12px",
                        }}
                        onClick={() => handleStatusUpdate(item.no, "Passed")}
                        disabled={item.status === "Passed"}
                        title='Approve'
                      >
                        ✓
                      </button>
                      <button
                        style={{
                          ...styles.button,
                          ...styles.buttonDanger,
                          padding: "6px 8px",
                          fontSize: "12px",
                        }}
                        onClick={() => handleStatusUpdate(item.no, "Rejected")}
                        disabled={item.status === "Rejected"}
                        title='Reject'
                      >
                        ✗
                      </button>
                      <button
                        style={{
                          ...styles.button,
                          ...styles.buttonWarning,
                          padding: "6px 8px",
                          fontSize: "12px",
                        }}
                        onClick={() => handleStatusUpdate(item.no, "Frozen")}
                        disabled={item.status === "Frozen"}
                        title='Freeze'
                      >
                        ❄
                      </button>
                      <button
                        style={{
                          ...styles.button,
                          ...styles.buttonPrimary,
                          padding: "6px 8px",
                          fontSize: "12px",
                        }}
                        onClick={() => setViewingWithdrawal(item)}
                        title='View Details'
                      >
                        <Eye size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredWithdrawals.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            {searchTerm || filterStatus !== "All" || filterDate
              ? "No withdrawals found matching your criteria"
              : "No withdrawals found"}
          </div>
        )}
      </div>

      {/* Card List (Mobile) */}
      <div style={styles.cardList}>
        {filteredWithdrawals.map((item) => (
          <div key={`card-${item.no}`} style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <strong style={{ fontSize: "16px" }}>{item.username}</strong>
                <div style={{ color: "#999", fontSize: "12px" }}>
                  UID: {item.uid}
                </div>
              </div>
              <span
                style={{
                  ...styles.statusBadge,
                  backgroundColor: getStatusColor(item.status) + "20",
                  color: getStatusColor(item.status),
                  fontSize: "10px",
                }}
              >
                {getStatusIcon(item.status)} {item.status}
              </span>
            </div>

            <div style={styles.cardRow}>
              <div style={styles.cardLabel}>Amount:</div>
              <div
                style={{
                  ...styles.cardValue,
                  color: "#27ae60",
                  fontWeight: "500",
                }}
              >
                ${item.withdrawAmount.toFixed(2)}
              </div>
            </div>

            <div style={styles.cardRow}>
              <div style={styles.cardLabel}>Date:</div>
              <div style={styles.cardValue}>{item.dateTime}</div>
            </div>

            <div style={styles.cardRow}>
              <div style={styles.cardLabel}>Method:</div>
              <div style={styles.cardValue}>{item.paymentMethod}</div>
            </div>

            {item.bankName && (
              <div style={styles.cardRow}>
                <div style={styles.cardLabel}>Bank:</div>
                <div style={styles.cardValue}>{item.bankName}</div>
              </div>
            )}

            {item.walletAddress && (
              <div style={styles.cardRow}>
                <div style={styles.cardLabel}>Wallet:</div>
                <div
                  style={{
                    ...styles.cardValue,
                    fontSize: "11px",
                    fontFamily: "monospace",
                  }}
                >
                  {item.walletAddress}
                </div>
              </div>
            )}

            <div style={styles.cardActions}>
              <button
                style={{ ...styles.button, ...styles.buttonSuccess, flex: 1 }}
                onClick={() => handleStatusUpdate(item.no, "Passed")}
                disabled={item.status === "Passed"}
              >
                ✓ Approve
              </button>
              <button
                style={{ ...styles.button, ...styles.buttonDanger, flex: 1 }}
                onClick={() => handleStatusUpdate(item.no, "Rejected")}
                disabled={item.status === "Rejected"}
              >
                ✗ Reject
              </button>
              <button
                style={{ ...styles.button, ...styles.buttonWarning, flex: 1 }}
                onClick={() => handleStatusUpdate(item.no, "Frozen")}
                disabled={item.status === "Frozen"}
              >
                ❄ Freeze
              </button>
              <button
                style={{ ...styles.button, ...styles.buttonPrimary, flex: 1 }}
                onClick={() => setViewingWithdrawal(item)}
              >
                <Eye size={14} />
                Details
              </button>
            </div>
          </div>
        ))}

        {filteredWithdrawals.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#666",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            {searchTerm || filterStatus !== "All" || filterDate
              ? "No withdrawals found matching your criteria"
              : "No withdrawals found"}
          </div>
        )}
      </div>

      {/* View Withdrawal Modal */}
      {viewingWithdrawal && (
        <div
          style={styles.modalOverlay}
          onClick={() => setViewingWithdrawal(null)}
        >
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3 style={{ margin: 0, color: "#333" }}>
                Withdrawal Details #{viewingWithdrawal.no}
              </h3>
              <button
                onClick={() => setViewingWithdrawal(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <X size={20} color='#666' />
              </button>
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Username:</span>
                <span>{viewingWithdrawal.username}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>UID:</span>
                <span>{viewingWithdrawal.uid}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Amount:</span>
                <span style={{ color: "#27ae60", fontWeight: "500" }}>
                  ${viewingWithdrawal.withdrawAmount.toFixed(2)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Balance:</span>
                <span>${viewingWithdrawal.accountBalance.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Payment Method:</span>
                <span>{viewingWithdrawal.paymentMethod}</span>
              </div>
              {viewingWithdrawal.bankName && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#666" }}>Bank:</span>
                  <span>{viewingWithdrawal.bankName}</span>
                </div>
              )}
              {viewingWithdrawal.holderName && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#666" }}>Account Holder:</span>
                  <span>{viewingWithdrawal.holderName}</span>
                </div>
              )}
              {viewingWithdrawal.accountNumber && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#666" }}>Account Number:</span>
                  <span>{viewingWithdrawal.accountNumber}</span>
                </div>
              )}
              {viewingWithdrawal.walletAddress && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#666" }}>Wallet Address:</span>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "12px",
                      wordBreak: "break-all",
                    }}
                  >
                    {viewingWithdrawal.walletAddress}
                  </span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Status:</span>
                <span
                  style={{
                    color: getStatusColor(viewingWithdrawal.status),
                    fontWeight: "600",
                  }}
                >
                  {viewingWithdrawal.status}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Transaction ID:</span>
                <span style={{ fontFamily: "monospace", fontSize: "12px" }}>
                  {viewingWithdrawal.transactionId}
                </span>
              </div>
              {viewingWithdrawal.notes && (
                <div>
                  <div style={{ color: "#666", marginBottom: "4px" }}>
                    Notes:
                  </div>
                  <div
                    style={{
                      padding: "8px",
                      background: "#f8f9fa",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {viewingWithdrawal.notes}
                  </div>
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "20px",
                justifyContent: "flex-end",
              }}
            >
              <button
                style={{ ...styles.button, ...styles.buttonSecondary }}
                onClick={() => setViewingWithdrawal(null)}
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

export default WithdrawalList;
