import React, { useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      no: 1,
      serial: 14,
      productName: "BTC/USDT",
      status: "Open market",
      category: "Foreign Exchange",
      randomValues: "0.008",
      riskControlLow: "0.00001",
      riskControlHigh: "0.010",
      operate: "Close market",
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
      operate: "Close market",
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
      operate: "Close market",
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
      operate: "Close market",
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
      operate: "Close market",
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
      operate: "Close market",
    },
    {
      no: 7,
      serial: 31,
      productName: "LTC/USDT",
      status: "Open market",
      category: "Foreign Exchange",
      randomValues: "0.04",
      riskControlLow: "0.03",
      riskControlHigh: "0.18",
      operate: "Close market",
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
      operate: "Close market",
    },
    {
      no: 9,
      serial: 58,
      productName: "ADA/USDT",
      status: "Open market",
      category: "Foreign Exchange",
      randomValues: "0.0008",
      riskControlLow: "0.00009",
      riskControlHigh: "0.00015",
      operate: "Close market",
    },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedProducts = [...products].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setProducts(sortedProducts);
  };

  const handleStatusChange = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].status =
      updatedProducts[index].status === "Open market"
        ? "Close market"
        : "Open market";
    updatedProducts[index].operate =
      updatedProducts[index].operate === "Open market"
        ? "Close market"
        : "Open market";
    setProducts(updatedProducts);
  };

  const handleCheckboxChange = (productIndex, checkboxIndex) => {
    // This would handle the checkbox functionality
    console.log(
      `Product ${productIndex + 1}, Checkbox ${checkboxIndex + 1} clicked`
    );
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
    controls: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },
    sortButton: {
      padding: "8px 16px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
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
      minWidth: "1300px",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      borderBottom: "2px solid #dee2e6",
    },
    tableHeaderCell: {
      padding: "12px 8px",
      textAlign: "center",
      fontWeight: "bold",
      color: "#333",
      fontSize: "12px",
      borderBottom: "1px solid #dee2e6",
      whiteSpace: "nowrap",
      cursor: "pointer",
    },
    tableCell: {
      padding: "12px 8px",
      borderBottom: "1px solid #dee2e6",
      fontSize: "12px",
      color: "#333",
      textAlign: "center",
    },
    noCol: { width: "5%" },
    serialCol: { width: "6%" },
    productNameCol: { width: "10%" },
    statusCol: { width: "8%" },
    categoryCol: { width: "10%" },
    randomValuesCol: { width: "8%" },
    riskControlLowCol: { width: "8%" },
    riskControlHighCol: { width: "8%" },
    operateCol: { width: "10%" },
    checkboxesCol: { width: "12%" },
    statusButton: {
      padding: "4px 8px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "11px",
      fontWeight: "bold",
      width: "100%",
    },
    openStatusButton: {
      backgroundColor: "#28a745",
    },
    checkboxContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
    },
    checkbox: {
      width: "16px",
      height: "16px",
      cursor: "pointer",
    },
    sortIndicator: {
      marginLeft: "5px",
      fontSize: "10px",
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
        <h2 style={styles.title}>product list</h2>
        <div style={styles.controls}>
          <button style={styles.sortButton}>Sorting</button>
          <button style={styles.addButton}>Add product</button>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th
                style={{ ...styles.tableHeaderCell, ...styles.noCol }}
                onClick={() => handleSort("no")}
              >
                No.
                {sortConfig.key === "no" && (
                  <span style={styles.sortIndicator}>
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th
                style={{ ...styles.tableHeaderCell, ...styles.serialCol }}
                onClick={() => handleSort("serial")}
              >
                Serial
                {sortConfig.key === "serial" && (
                  <span style={styles.sortIndicator}>
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
              <th
                style={{ ...styles.tableHeaderCell, ...styles.productNameCol }}
              >
                Product Name
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.statusCol }}>
                Status
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.categoryCol }}>
                Category
              </th>
              <th
                style={{ ...styles.tableHeaderCell, ...styles.randomValuesCol }}
              >
                Random Values
              </th>
              <th
                style={{
                  ...styles.tableHeaderCell,
                  ...styles.riskControlLowCol,
                }}
              >
                Risk control low
              </th>
              <th
                style={{
                  ...styles.tableHeaderCell,
                  ...styles.riskControlHighCol,
                }}
              >
                Risk control high
              </th>
              <th style={{ ...styles.tableHeaderCell, ...styles.operateCol }}>
                Operate
              </th>
              <th
                style={{ ...styles.tableHeaderCell, ...styles.checkboxesCol }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.serial}>
                  <td style={{ ...styles.tableCell, ...styles.noCol }}>
                    {product.no}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.serialCol }}>
                    {product.serial}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.productNameCol }}>
                    {product.productName}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.statusCol }}>
                    {product.status}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.categoryCol }}>
                    {product.category}
                  </td>
                  <td
                    style={{ ...styles.tableCell, ...styles.randomValuesCol }}
                  >
                    {product.randomValues}
                  </td>
                  <td
                    style={{ ...styles.tableCell, ...styles.riskControlLowCol }}
                  >
                    {product.riskControlLow}
                  </td>
                  <td
                    style={{
                      ...styles.tableCell,
                      ...styles.riskControlHighCol,
                    }}
                  >
                    {product.riskControlHigh}
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.operateCol }}>
                    <button
                      style={{
                        ...styles.statusButton,
                        ...(product.status === "Open market"
                          ? styles.openStatusButton
                          : {}),
                      }}
                      onClick={() => handleStatusChange(index)}
                    >
                      {product.operate}
                    </button>
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.checkboxesCol }}>
                    <div style={styles.checkboxContainer}>
                      <input
                        type='checkbox'
                        style={styles.checkbox}
                        onChange={() => handleCheckboxChange(index, 0)}
                        defaultChecked
                      />
                      <input
                        type='checkbox'
                        style={styles.checkbox}
                        onChange={() => handleCheckboxChange(index, 1)}
                      />
                      <input
                        type='checkbox'
                        style={styles.checkbox}
                        onChange={() => handleCheckboxChange(index, 2)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='10' style={styles.noData}>
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
