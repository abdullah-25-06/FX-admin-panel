import React from "react";

const Dashboard = () => {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Top Stats Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ff6b6b",
            color: "#fff",
            padding: "10px",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <div>New today</div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>1</div>
        </div>

        <div
          style={{
            backgroundColor: "#555",
            color: "#fff",
            padding: "10px",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <div>Total users</div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>33</div>
        </div>

        <div
          style={{
            backgroundColor: "#00bfff",
            color: "#fff",
            padding: "10px",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <div>Total balance</div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>
            11887313.69
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ff6b6b",
            color: "#fff",
            padding: "10px",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <div>Today's order</div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>4</div>
        </div>

        <div
          style={{
            backgroundColor: "#555",
            color: "#fff",
            padding: "10px",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <div>Customer profit/loss</div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>800.00</div>
        </div>

        <div
          style={{
            backgroundColor: "#00bfff",
            color: "#fff",
            padding: "10px",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <div>Today's running fee</div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>350.0</div>
        </div>

        <div
          style={{
            backgroundColor: "#20c997",
            color: "#fff",
            padding: "10px",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <div>Recharge today</div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>0</div>
        </div>

        <div
          style={{
            backgroundColor: "#ff6b6b",
            color: "#fff",
            padding: "10px",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <div>Withdraw cash today</div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>0</div>
        </div>

        <div
          style={{
            backgroundColor: "#555",
            color: "#fff",
            padding: "10px",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <div>Same day handling fee</div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>0</div>
        </div>
      </div>

      {/* Table Section */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "5px",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "900px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={thStyle}>#ID</th>
              <th style={thStyle}>Account</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Order time</th>
              <th style={thStyle}>Product Information</th>
              <th style={thStyle}>State</th>
              <th style={thStyle}>Direction</th>
              <th style={thStyle}>Time/Points</th>
              <th style={thStyle}>Position opening point</th>
              <th style={thStyle}>Closing point</th>
              <th style={thStyle}>Commission amount</th>
              <th style={thStyle}>Invalid delegation</th>
              <th style={thStyle}>Valid delegation</th>
              <th style={thStyle}>Actual profit and loss</th>
              <th style={thStyle}>Balance after purchase</th>
              <th style={thStyle}>Owning agent</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: 1677,
                name: "Alex AA",
                product: "BTC/USDT",
                commission: "$50.0",
                valid: "$50.0",
                profit: "$200.0",
              },
              {
                id: 1676,
                name: "Alex AA",
                product: "BTC/USDT",
                commission: "$100.0",
                valid: "$100.0",
                profit: "$200.0",
              },
            ].map((row, idx) => (
              <tr
                key={idx}
                style={{ textAlign: "center", borderBottom: "1px solid #eee" }}
              >
                <td style={tdStyle}>{row.id}</td>
                <td style={tdStyle}>Alex AA</td>
                <td style={tdStyle}>{row.name}</td>
                <td style={tdStyle}>2025-09-23</td>
                <td style={tdStyle}>{row.product}</td>
                <td style={tdStyle}>Open a position</td>
                <td style={{ ...tdStyle, color: "red" }}>Buy up</td>
                <td style={tdStyle}>30 second</td>
                <td style={tdStyle}>111154.521</td>
                <td style={tdStyle}>-</td>
                <td style={{ ...tdStyle, color: "red" }}>{row.commission}</td>
                <td style={{ ...tdStyle, color: "red" }}>$0</td>
                <td style={{ ...tdStyle, color: "green" }}>{row.valid}</td>
                <td style={{ ...tdStyle, color: "red" }}>{row.profit}</td>
                <td style={tdStyle}>$0</td>
                <td style={tdStyle}>0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Inline table styles
const thStyle = {
  padding: "8px",
  fontSize: "14px",
  fontWeight: "bold",
  borderBottom: "1px solid #ddd",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "8px",
  fontSize: "13px",
  whiteSpace: "nowrap",
};

export default Dashboard;
