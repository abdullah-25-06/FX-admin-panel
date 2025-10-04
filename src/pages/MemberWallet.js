import React, { useState } from "react";

const MemberWallet = () => {
  const [accounts, setAccounts] = useState([
    {
      serialNumber: 25,
      uid: 1058819,
      walletAddress: "Trcejdvsbskkdjhjdda3uhsgwb",
    },
    {
      serialNumber: 24,
      uid: 1058817,
      walletAddress: "Trcejdvsbskkdjhjdda3uhsgwb",
    },
    { serialNumber: 23, uid: 1058810, walletAddress: "Dhanera" },
    { serialNumber: 22, uid: 1058808, walletAddress: "Husenchhai" },
    { serialNumber: 21, uid: 1058801, walletAddress: "67478" },
    { serialNumber: 20, uid: 1058800, walletAddress: "AshokS492" },
    {
      serialNumber: 19,
      uid: 1058792,
      walletAddress: "TNmpnecog7YtKQouqmUdi3PwrPddSeJ",
    },
    { serialNumber: 18, uid: 1058788, walletAddress: "isohagiodhgotidwhgoldf" },
    {
      serialNumber: 17,
      uid: 1058784,
      walletAddress: "0x434971859d64BccTaFd92F-40469F2305A997aac6",
    },
    {
      serialNumber: 16,
      uid: 1058770,
      walletAddress: "Jdigldhsbduduudhdhdhqeg",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (serialNumber) => {
    setAccounts(
      accounts.filter((account) => account.serialNumber !== serialNumber)
    );
  };

  const filteredAccounts = accounts.filter(
    (account) =>
      account.uid.toString().includes(searchTerm) ||
      account.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      textTransform: "lowercase",
    },
    searchContainer: {
      display: "flex",
      alignItems: "center",
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
      textTransform: "lowercase",
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
      minWidth: "600px",
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
    },
    tableCell: {
      padding: "12px 16px",
      borderBottom: "1px solid #dee2e6",
      fontSize: "14px",
      color: "#333",
    },
    serialCol: {
      width: "15%",
      fontWeight: "bold",
    },
    uidCol: {
      width: "20%",
    },
    walletCol: {
      width: "45%",
    },
    operateCol: {
      width: "20%",
    },
    walletAddress: {
      fontFamily: "monospace",
      wordBreak: "break-all",
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
      textTransform: "lowercase",
    },
    noData: {
      textAlign: "center",
      padding: "40px",
      color: "#666",
      fontSize: "16px",
    },
    placeholder: {
      color: "#999",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Member Wallet</h2>
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <input
              type='text'
              placeholder='utdname/mobile number/card nu'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <button style={styles.searchButton}>search</button>
          </div>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={{ ...styles.tableHeaderCell, ...styles.serialCol }}>
                Serial number
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.uidCol }}>
                UID
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.walletCol }}>
                Wallet Address
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.operateCol }}>
                operate
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account) => (
                <tr key={account.serialNumber}>
                  <td style={{ ...styles.tableCell, ...styles.serialCol }}>
                    {account.serialNumber}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.uidCol }}>
                    {account.uid}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.walletCol }}>
                    <span style={styles.walletAddress}>
                      {account.walletAddress}
                    </span>
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.operateCol }}>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(account.serialNumber)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4' style={styles.noData}>
                  No accounts found
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
