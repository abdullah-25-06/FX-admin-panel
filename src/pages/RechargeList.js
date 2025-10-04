import React, { useState } from "react";
import { Bell, Edit2, Trash2 } from "lucide-react";

const ProductList = () => {
  const products = [
    {
      no: 1,
      serial: 14,
      productName: "BTC/USDT",
      status: "Open market",
      category: "Foreign Exchange",
      randomValues: "0.008",
      riskControlLow: "0.00001",
      riskControlHigh: "0.010",
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
    },
  ];

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Top Header - Only right side info */}
      <div
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e0e0e0",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: "13px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#666" }}>online</span>
            <span style={{ fontWeight: "600" }}>1</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#666" }}>top up</span>
            <span style={{ fontWeight: "600" }}>4</span>
            <Bell size={16} color='#4a90e2' />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#666" }}>Withdraw money</span>
            <span style={{ fontWeight: "600" }}>4</span>
            <Bell size={16} color='#4a90e2' />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#666" }}>Order</span>
            <span style={{ fontWeight: "600" }}>0</span>
            <Bell size={16} color='#4a90e2' />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#666" }}>admin</span>
            <span style={{ color: "#999" }}>▼</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        {/* Action Buttons Row */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "4px",
            padding: "15px 20px",
            marginBottom: "15px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            style={{
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "8px 20px",
              fontSize: "13px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Sorting
          </button>
          <button
            style={{
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "8px 20px",
              fontSize: "13px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Add product
          </button>
        </div>

        {/* Table */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "4px",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                fontSize: "13px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderBottom: "2px solid #e0e0e0",
                  }}
                >
                  <th
                    style={{
                      padding: "12px 15px",
                      textAlign: "center",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    No.
                  </th>
                  <th
                    style={{
                      padding: "12px 15px",
                      textAlign: "center",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Serial
                  </th>
                  <th
                    style={{
                      padding: "12px 15px",
                      textAlign: "center",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Product Name
                  </th>
                  <th
                    style={{
                      padding: "12px 15px",
                      textAlign: "center",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      padding: "12px 15px",
                      textAlign: "center",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Category
                  </th>
                  <th
                    style={{
                      padding: "12px 15px",
                      textAlign: "center",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Random Values
                  </th>
                  <th
                    style={{
                      padding: "12px 15px",
                      textAlign: "center",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Risk control low
                  </th>
                  <th
                    style={{
                      padding: "12px 15px",
                      textAlign: "center",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Risk control high
                  </th>
                  <th
                    style={{
                      padding: "12px 15px",
                      textAlign: "center",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Operate
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((item) => (
                  <tr
                    key={item.no}
                    style={{ borderBottom: "1px solid #f0f0f0" }}
                  >
                    <td
                      style={{
                        padding: "12px 15px",
                        color: "#666",
                        textAlign: "center",
                      }}
                    >
                      {item.no}
                    </td>
                    <td
                      style={{
                        padding: "12px 15px",
                        color: "#666",
                        textAlign: "center",
                      }}
                    >
                      {item.serial}
                    </td>
                    <td
                      style={{
                        padding: "12px 15px",
                        color: "#333",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                        fontWeight: "500",
                      }}
                    >
                      {item.productName}
                    </td>
                    <td
                      style={{
                        padding: "12px 15px",
                        color: "#666",
                        textAlign: "center",
                      }}
                    >
                      {item.status}
                    </td>
                    <td
                      style={{
                        padding: "12px 15px",
                        color: "#666",
                        textAlign: "center",
                      }}
                    >
                      {item.category}
                    </td>
                    <td
                      style={{
                        padding: "12px 15px",
                        color: "#666",
                        textAlign: "center",
                      }}
                    >
                      {item.randomValues}
                    </td>
                    <td
                      style={{
                        padding: "12px 15px",
                        color: "#666",
                        textAlign: "center",
                      }}
                    >
                      {item.riskControlLow}
                    </td>
                    <td
                      style={{
                        padding: "12px 15px",
                        color: "#666",
                        textAlign: "center",
                      }}
                    >
                      {item.riskControlHigh}
                    </td>
                    <td style={{ padding: "12px 15px", textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "#e74c3c",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "6px 15px",
                            fontSize: "12px",
                            cursor: "pointer",
                            fontWeight: "500",
                          }}
                        >
                          Close market
                        </button>
                        <button
                          style={{
                            backgroundColor: "#3498db",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "6px 10px",
                            fontSize: "12px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          style={{
                            backgroundColor: "#e74c3c",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "6px 10px",
                            fontSize: "12px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
