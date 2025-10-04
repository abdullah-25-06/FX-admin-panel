import React from "react";

const trades = [
  {
    id: 1676,
    uid: "1058819",
    username: "Alex AA",
    time: "2025-09-23 12:18:30",
    product: "BTC/USDT",
    state: "Open",
    direction: "Buy",
    duration: "30Second",
    opening: "11154.521",
    percentage: "20,30% / 10,20%",
    profitLoss: "$100.0",
  },
  {
    id: 1675,
    uid: "1058819",
    username: "Alex AA",
    time: "2025-09-23 12:13:15",
    product: "BTC/USDT",
    state: "Open",
    direction: "Buy",
    duration: "30Second",
    opening: "11154.521",
    percentage: "20,30% / 10,20%",
    profitLoss: "$100.0",
  },
  {
    id: 1674,
    uid: "1058819",
    username: "Alex AA",
    time: "2025-09-23 12:11:16",
    product: "BTC/USDT",
    state: "Open",
    direction: "Buy",
    duration: "30Second",
    opening: "11154.521",
    percentage: "20,30% / 10,20%",
    profitLoss: "$100.0",
  },
];

const stats = [
  { label: "Profit and loss statistics", value: "$600.00", color: "#e74c3c" },
  { label: "Trading lots", value: "3 Order", color: "#666" },
  { label: "Commission amount", value: "$300.0", color: "#3498db" },
  { label: "Effective amount", value: "$0", color: "#e74c3c" },
  { label: "Invalid amount", value: "$0", color: "#1abc9c" },
  { label: "Handling fee", value: "$0", color: "#666" },
];

export default function OpenOrder() {
  const containerStyle = {
    padding: "20px",
    background: "#f5f6fa",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  };

  const headerStyle = {
    marginBottom: "15px",
  };

  const titleStyle = {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "5px",
  };

  const subtitleStyle = {
    color: "#888",
    fontSize: "14px",
  };

  const tableWrapperStyle = {
    overflowX: "auto",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "950px",
  };

  const thTdBase = {
    padding: "10px 12px",
    fontSize: "14px",
    textAlign: "left",
    whiteSpace: "nowrap",
  };

  const theadStyle = {
    background: "#f0f0f0",
  };

  const plButtonStyle = {
    background: "#e74c3c",
    color: "#fff",
    fontSize: "12px",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background 0.3s",
  };

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
    marginTop: "20px",
  };

  const statBoxStyle = (color) => ({
    background: color,
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  });

  const directionStyle = (type) => ({
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600",
    background: type === "Buy" ? "#eafaf1" : "#fdeaea",
    color: type === "Buy" ? "#2ecc71" : "#e74c3c",
  });

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Open Order</h1>
        <p style={subtitleStyle}>Manage all current active trades</p>
      </div>

      {/* Table */}
      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              {[
                "Selection",
                "No.",
                "UID",
                "Username",
                "Time",
                "Product",
                "State",
                "Direction",
                "Duration",
                "Opening",
                "Closing",
                "Percentage(%)",
                "Profit/Loss",
                "Action",
              ].map((header) => (
                <th key={header} style={{ ...thTdBase, fontWeight: "600" }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, idx) => (
              <tr
                key={trade.id}
                style={{
                  background: idx % 2 === 0 ? "#fff" : "#f9f9f9",
                  borderTop: "1px solid #eee",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#eef5ff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    idx % 2 === 0 ? "#fff" : "#f9f9f9")
                }
              >
                <td style={thTdBase}>
                  <input type='checkbox' />
                </td>
                <td style={thTdBase}>{trade.id}</td>
                <td style={thTdBase}>{trade.uid}</td>
                <td style={thTdBase}>{trade.username}</td>
                <td style={thTdBase}>{trade.time}</td>
                <td style={{ ...thTdBase, fontWeight: "500" }}>
                  {trade.product}
                </td>
                <td
                  style={{ ...thTdBase, color: "#27ae60", fontWeight: "600" }}
                >
                  {trade.state}
                </td>
                <td style={thTdBase}>
                  <span style={directionStyle(trade.direction)}>
                    {trade.direction}
                  </span>
                </td>
                <td style={thTdBase}>{trade.duration}</td>
                <td style={thTdBase}>{trade.opening}</td>
                <td style={{ ...thTdBase, color: "#e74c3c" }}>
                  {trade.opening}
                </td>
                <td style={{ ...thTdBase, color: "#e67e22" }}>
                  {trade.percentage}
                </td>
                <td
                  style={{ ...thTdBase, color: "#27ae60", fontWeight: "bold" }}
                >
                  {trade.profitLoss}
                </td>
                <td style={thTdBase}>
                  <button
                    style={plButtonStyle}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#c0392b")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#e74c3c")
                    }
                  >
                    P/L
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats Section */}
      <div style={statsGridStyle}>
        {stats.map((item, idx) => (
          <div key={idx} style={statBoxStyle(item.color)}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "4px",
              }}
            >
              {item.label}
            </div>
            <div style={{ fontSize: "16px", fontWeight: "700" }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
