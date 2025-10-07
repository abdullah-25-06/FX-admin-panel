import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MemberWallet = () => {
  // State management
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("serialNumber");
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  // const [showAddForm, setShowAddForm] = useState(false);
  // const [newAccount, setNewAccount] = useState({ uid: "", walletAddress: "" });
  const [editingAccount] = useState(null);
  const [editForm, setEditForm] = useState({ uid: "", walletAddress: "" });
  const [message, setMessage] = useState("");
  const [again, setAgain] = useState(true)
  const navigate = useNavigate()
  // Initial data
  // const initialAccounts = [
  //   {
  //     serialNumber: 25,
  //     uid: 1058819,
  //     walletAddress: "Trcejdvsbskkdjhjdda3uhsgwb",
  //     createdAt: "2024-01-15",
  //     status: "Active",
  //   },
  //   {
  //     serialNumber: 24,
  //     uid: 1058817,
  //     walletAddress: "Trcejdvsbskkdjhjdda3uhsgwb",
  //     createdAt: "2024-01-14",
  //     status: "Active",
  //   },
  //   {
  //     serialNumber: 23,
  //     uid: 1058810,
  //     walletAddress: "Dhanera",
  //     createdAt: "2024-01-13",
  //     status: "Active",
  //   },
  //   {
  //     serialNumber: 22,
  //     uid: 1058808,
  //     walletAddress: "Husenchhai",
  //     createdAt: "2024-01-12",
  //     status: "Inactive",
  //   },
  //   {
  //     serialNumber: 21,
  //     uid: 1058801,
  //     walletAddress: "67478",
  //     createdAt: "2024-01-11",
  //     status: "Active",
  //   },
  //   {
  //     serialNumber: 20,
  //     uid: 1058800,
  //     walletAddress: "AshokS492",
  //     createdAt: "2024-01-10",
  //     status: "Active",
  //   },
  //   {
  //     serialNumber: 19,
  //     uid: 1058792,
  //     walletAddress: "TNmpnecog7YtKQouqmUdi3PwrPddSeJ",
  //     createdAt: "2024-01-09",
  //     status: "Active",
  //   },
  //   {
  //     serialNumber: 18,
  //     uid: 1058788,
  //     walletAddress: "isohagiodhgotidwhgoldf",
  //     createdAt: "2024-01-08",
  //     status: "Inactive",
  //   },
  //   {
  //     serialNumber: 17,
  //     uid: 1058784,
  //     walletAddress: "0x434971859d64BccTaFd92F-40469F2305A997aac6",
  //     createdAt: "2024-01-07",
  //     status: "Active",
  //   },
  //   {
  //     serialNumber: 16,
  //     uid: 1058770,
  //     walletAddress: "Jdigldhsbduduudhdhdhqeg",
  //     createdAt: "2024-01-06",
  //     status: "Active",
  //   },
  // ];

  useEffect(() => {
    const fetchWalletData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/with-drawal/get-all-token`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("auth"),
              "Content-Type": "application/json",
            },
          }
        );

        // ✅ Handle 401 Unauthorized
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("auth");
          setMessage("⚠️ Session expired. Redirecting to login...");
          setTimeout(() => navigate("/login"), 1500);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch wallet data");
        }

        const data = await response.json();

        const walletAccounts = data.message.data
          .filter((item) => item.type === "WALLET")
          .map((item, index) => ({
            serialNumber: index + 1,
            uid: item._id,
            walletAddress: item.wallet_address,
            createdAt: new Date(item.createdAt).toISOString().split("T")[0],
            status: item.is_active === true ? "Active" : "Inactive",
            _id: item._id,
          }));

        setAccounts(walletAccounts);
      } catch (error) {
        // ✅ Handle 401 in error response too (e.g. network or CORS case)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem("auth");
          setMessage("⚠️ Session expired. Redirecting to login...");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          console.error("Error fetching wallet data:", error);
          setMessage("❌ Failed to load wallet data");
          setTimeout(() => setMessage(""), 3000);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, [again]);


  const filteredAccounts = accounts
    .filter(
      (account) =>
        account.uid?.toString().includes(searchTerm) ||
        account?.walletAddress?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        account.serialNumber?.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Convert to numbers if sorting by serialNumber or UID
      if (sortField === "serialNumber") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else {
        aValue = String(aValue)?.toLowerCase();
        bValue = String(bValue)?.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  // Account operations
  // const handleDelete = (serialNumber) => {
  //   const account = accounts.find((acc) => acc.serialNumber === serialNumber);
  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete wallet account #${serialNumber} (UID: ${account.uid})?`
  //     )
  //   ) {
  //     const updatedAccounts = accounts.filter(
  //       (account) => account.serialNumber !== serialNumber
  //     );
  //     setAccounts(updatedAccounts);
  //     setSelectedAccounts(selectedAccounts.filter((id) => id !== serialNumber));
  //     setMessage(`Account #${serialNumber} deleted successfully`);
  //     setTimeout(() => setMessage(""), 3000);
  //   }
  // };

  // const handleBulkDelete = () => {
  //   if (selectedAccounts.length === 0) {
  //     setMessage("Please select at least one account to delete");
  //     setTimeout(() => setMessage(""), 3000);
  //     return;
  //   }

  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete ${selectedAccounts.length} selected accounts?`
  //     )
  //   ) {
  //     const updatedAccounts = accounts.filter(
  //       (account) => !selectedAccounts.includes(account.serialNumber)
  //     );
  //     setAccounts(updatedAccounts);
  //     setSelectedAccounts([]);
  //     setMessage(`${selectedAccounts.length} accounts deleted successfully`);
  //     setTimeout(() => setMessage(""), 3000);
  //   }
  // };

  // const handleAddAccount = () => {
  //   // Validation
  //   if (!newAccount.uid.trim() || !newAccount.walletAddress.trim()) {
  //     setMessage("UID and Wallet Address are required");
  //     setTimeout(() => setMessage(""), 3000);
  //     return;
  //   }

  //   // Check for duplicate UID
  //   const duplicateUid = accounts.find(
  //     (acc) => acc.uid.toString() === newAccount.uid
  //   );
  //   if (duplicateUid) {
  //     setMessage(`UID ${newAccount.uid} already exists`);
  //     setTimeout(() => setMessage(""), 3000);
  //     return;
  //   }

  //   const newSerialNumber =
  //     Math.max(...accounts.map((acc) => acc.serialNumber), 0) + 1;
  //   const accountToAdd = {
  //     serialNumber: newSerialNumber,
  //     uid: parseInt(newAccount.uid) || newAccount.uid,
  //     walletAddress: newAccount.walletAddress,
  //     createdAt: new Date().toISOString().split("T")[0],
  //     status: "Active",
  //   };

  //   setAccounts([accountToAdd, ...accounts]);
  //   setNewAccount({ uid: "", walletAddress: "" });
  //   setShowAddForm(false);
  //   setMessage(`Account #${newSerialNumber} added successfully`);
  //   setTimeout(() => setMessage(""), 3000);
  // };

  const handleEdit = async (account, status) => {
    try {

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/with-drawal/approve-wallet/${account.uid}`,
        { walletStatus: status },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth"),
          },
        }
      );

      // ✅ Handle 401 Unauthorized
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("auth");
        alert("⚠️ Session expired. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
        return;
      }

      // ✅ Success actions
      setAccounts([]);
      setAgain((prev) => !prev);
      alert(`✅ Wallet status updated to "${status}" for ${account.username}`);
    } catch (error) {
      // ✅ Handle 401 in error response too
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem("auth");
        alert("⚠️ Session expired. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        console.error("Error updating wallet status:", error);
        alert("❌ Failed to update wallet status. Please try again.");
      }
    }
  };

  // const handleSaveEdit = (serialNumber) => {
  //   if (!editForm.uid.trim() || !editForm.walletAddress.trim()) {
  //     setMessage("UID and Wallet Address are required");
  //     setTimeout(() => setMessage(""), 3000);
  //     return;
  //   }

  //   // Check for duplicate UID (excluding current account)
  //   const duplicateUid = accounts.find(
  //     (acc) =>
  //       acc.uid.toString() === editForm.uid && acc.serialNumber !== serialNumber
  //   );
  //   if (duplicateUid) {
  //     setMessage(`UID ${editForm.uid} already exists`);
  //     setTimeout(() => setMessage(""), 3000);
  //     return;
  //   }

  //   const updatedAccounts = accounts.map((account) =>
  //     account.serialNumber === serialNumber
  //       ? {
  //         ...account,
  //         uid: parseInt(editForm.uid) || editForm.uid,
  //         walletAddress: editForm.walletAddress,
  //       }
  //       : account
  //   );

  //   setAccounts(updatedAccounts);
  //   setEditingAccount(null);
  //   setEditForm({ uid: "", walletAddress: "" });
  //   setMessage(`Account #${serialNumber} updated successfully`);
  //   setTimeout(() => setMessage(""), 3000);
  // };

  // const handleCancelEdit = () => {
  //   setEditingAccount(null);
  //   setEditForm({ uid: "", walletAddress: "" });
  //   setMessage("");
  // };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSelectAccount = (serialNumber) => {
    setSelectedAccounts((prev) =>
      prev.includes(serialNumber)
        ? prev.filter((id) => id !== serialNumber)
        : [...prev, serialNumber]
    );
  };

  const handleSelectAll = () => {
    if (selectedAccounts.length === filteredAccounts.length) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts(
        filteredAccounts.map((account) => account.serialNumber)
      );
    }
  };

  // Statistics
  const getStatistics = () => {
    const totalAccounts = accounts.length;
    const activeAccounts = accounts.filter(
      (acc) => acc.status === "Active"
    ).length;
    const inactiveAccounts = accounts.filter(
      (acc) => acc.status === "InActive"
    ).length;

    return {
      totalAccounts,
      activeAccounts,
      inactiveAccounts,
      selected: selectedAccounts.length,
    };
  };

  const stats = getStatistics();

  // Enhanced styles
  const styles = {
    container: {
      maxWidth: "1200px",
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
      alignItems: "center",
      gap: "15px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    searchWrapper: {
      display: "flex",
      background: "white",
      borderRadius: "4px",
      overflow: "hidden",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    searchInput: {
      padding: "8px 12px",
      border: "none",
      outline: "none",
      fontSize: "14px",
      minWidth: "250px",
      color: "#333",
    },
    searchButton: {
      padding: "8px 16px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
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
    buttonContainer: {
      display: "flex",
      gap: "10px",
      marginBottom: "15px",
      flexWrap: "wrap",
    },
    addButton: {
      padding: "8px 16px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
    },
    bulkDeleteButton: {
      padding: "8px 16px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
    },
    addForm: {
      backgroundColor: "#f8f9fa",
      padding: "15px",
      borderRadius: "6px",
      border: "1px solid #dee2e6",
      marginBottom: "15px",
    },
    formGroup: {
      marginBottom: "10px",
    },
    formLabel: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
      color: "#333",
    },
    formInput: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
    },
    formButtons: {
      display: "flex",
      gap: "10px",
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
      minWidth: "800px",
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
      cursor: "pointer",
      userSelect: "none",
    },
    sortHeader: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    tableCell: {
      padding: "12px 16px",
      borderBottom: "1px solid #dee2e6",
      fontSize: "14px",
      color: "#333",
    },
    serialCol: {
      width: "10%",
      fontWeight: "bold",
    },
    uidCol: {
      width: "15%",
    },
    walletCol: {
      width: "45%",
    },
    statusCol: {
      width: "10%",
    },
    operateCol: {
      width: "20%",
    },
    walletAddress: {
      fontFamily: "monospace",
      wordBreak: "break-all",
    },
    statusActive: {
      color: "#28a745",
      fontWeight: "bold",
    },
    statusInactive: {
      color: "#dc3545",
      fontWeight: "bold",
    },
    editButton: {
      padding: "6px 12px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "bold",
      marginRight: "5px",
    },
    deleteButton: {
      padding: "6px 12px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "bold",
    },
    saveButton: {
      padding: "6px 12px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "bold",
      marginRight: "5px",
    },
    cancelButton: {
      padding: "6px 12px",
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "bold",
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
        <div style={styles.loadingMessage}>Loading member wallets...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Member Wallet</h2>
        <div style={styles.controlsContainer}>
          <div style={styles.searchWrapper}>
            <input
              type='text'
              placeholder='Search by UID, Wallet Address, or Serial Number'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <button style={styles.searchButton}>Search</button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.totalAccounts}</div>
          <div style={styles.statLabel}>Total Accounts</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.activeAccounts}</div>
          <div style={styles.statLabel}>Active</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.inactiveAccounts}</div>
          <div style={styles.statLabel}>Inactive</div>
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

      <div style={styles.tableContainer}>
        {/* Action Buttons
        <div style={styles.buttonContainer}>
          {!showAddForm ? (
            <button
              style={styles.addButton}
              onClick={() => setShowAddForm(true)}
            >
              Add Wallet Account +
            </button>
          ) : (
            <div style={styles.addForm}>
              <h3 style={{ marginBottom: "15px", color: "#333" }}>
                Add New Wallet Account
              </h3>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>UID:</label>
                <input
                  type='text'
                  style={styles.formInput}
                  value={newAccount.uid}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, uid: e.target.value })
                  }
                  placeholder='Enter UID'
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Wallet Address:</label>
                <input
                  type='text'
                  style={styles.formInput}
                  value={newAccount.walletAddress}
                  onChange={(e) =>
                    setNewAccount({
                      ...newAccount,
                      walletAddress: e.target.value,
                    })
                  }
                  placeholder='Enter wallet address'
                />
              </div>
              <div style={styles.formButtons}>
                <button style={styles.saveButton} onClick={handleAddAccount}>
                  Add Account
                </button>
                <button
                  style={styles.cancelButton}
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <button
            style={styles.bulkDeleteButton}
            onClick={handleBulkDelete}
            disabled={selectedAccounts.length === 0}
          >
            Delete Selected ({selectedAccounts.length})
          </button>
        </div> */}

        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={{ ...styles.tableHeaderCell, ...styles.serialCol }}>
                <input
                  type='checkbox'
                  checked={
                    selectedAccounts.length === filteredAccounts.length &&
                    filteredAccounts.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th
                style={{ ...styles.tableHeaderCell, ...styles.serialCol }}
                onClick={() => handleSort("serialNumber")}
              >
                <div style={styles.sortHeader}>
                  Serial Number
                  {sortField === "serialNumber" &&
                    (sortOrder === "asc" ? " ↑" : " ↓")}
                </div>
              </th>
              <th
                style={{ ...styles.tableHeaderCell, ...styles.uidCol }}
                onClick={() => handleSort("uid")}
              >
                <div style={styles.sortHeader}>
                  UID
                  {sortField === "uid" && (sortOrder === "asc" ? " ↑" : " ↓")}
                </div>
              </th>
              <th
                style={{ ...styles.tableHeaderCell, ...styles.walletCol }}
                onClick={() => handleSort("walletAddress")}
              >
                <div style={styles.sortHeader}>
                  Wallet Address
                  {sortField === "walletAddress" &&
                    (sortOrder === "asc" ? " ↑" : " ↓")}
                </div>
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.statusCol }}>
                Status
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.operateCol }}>
                Toggle Activation
              </th>

            </tr>
          </thead>
          <tbody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account) => (
                <tr key={account.serialNumber}>
                  <td style={{ ...styles.tableCell, ...styles.serialCol }}>
                    <input
                      type='checkbox'
                      checked={selectedAccounts.includes(account.serialNumber)}
                      onChange={() => handleSelectAccount(account.serialNumber)}
                    />
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.serialCol }}>
                    {account.serialNumber}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.uidCol }}>
                    {editingAccount === account.serialNumber ? (
                      <input
                        type='text'
                        style={styles.formInput}
                        value={editForm.uid}
                        onChange={(e) =>
                          setEditForm({ ...editForm, uid: e.target.value })
                        }
                      />
                    ) : (
                      account.uid
                    )}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.walletCol }}>
                    {editingAccount === account.serialNumber ? (
                      <input
                        type='text'
                        style={styles.formInput}
                        value={editForm.walletAddress}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            walletAddress: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <span style={styles.walletAddress}>
                        {account.walletAddress}
                      </span>
                    )}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.statusCol }}>
                    <span
                      style={
                        account.status === 'Active'
                          ? styles.statusActive
                          : styles.statusInactive
                      }
                    >
                      {account.status}
                    </span>
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.operateCol }}>
                    {/* {editingAccount === account.serialNumber ? (
                      <>
                        <button
                          style={styles.saveButton}
                          onClick={() => handleSaveEdit(account.serialNumber)}
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
                          onClick={() => handleEdit(account)}
                        >
                          Edit
                        </button>
                        <button
                          style={styles.deleteButton}
                          onClick={() => handleDelete(account.serialNumber)}
                        >
                          Delete
                        </button>
                      </>
                    )} */}
                    <button
                      style={styles.editButton}
                      onClick={() => handleEdit(account, account.status === 'Active' ? false : true)}
                    >
                      {account.status === 'Active' ? 'DeActivate' : 'Activate'}
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' style={styles.noData}>
                  {searchTerm
                    ? "No accounts found matching your search"
                    : "No accounts found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberWallet;
