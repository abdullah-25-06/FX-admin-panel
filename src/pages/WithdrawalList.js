import React, { useState } from "react";
import { Bell } from "lucide-react";

const WithdrawalList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Sample data — you can connect this with backend/API later
  const data = [
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
      status: "Process/Reject",
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
    },
  ];

  const [rowStatuses, setRowStatuses] = useState(() => {
    const map = {};
    data.forEach((d) => {
      if (["Passed", "Rejected", "Frozen"].includes(d.status)) {
        map[d.no] = d.status;
      } else {
        map[d.no] = "";
      }
    });
    return map;
  });

  const [frozenStatuses, setFrozenStatuses] = useState(() => {
    const map = {};
    data.forEach((d) => {
      map[d.no] = d.status === "Frozen";
    });
    return map;
  });

  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    if (status === "Passed") return "#27ae60";
    if (status === "Rejected") return "#e74c3c";
    if (status === "Frozen") return "#f39c12";
    return "#000";
  };

  const handleStatus = (no, newStatus) => {
    setRowStatuses((prev) => ({ ...prev, [no]: newStatus }));
  };

  const handleFreeze = (no) => {
    setFrozenStatuses((prev) => ({ ...prev, [no]: !prev[no] }));
    setRowStatuses((prev) => ({
      ...prev,
      [no]: frozenStatuses[no] ? "" : "Frozen",
    }));
  };

  const containerStyle = {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "16px",
    boxSizing: "border-box",
    marginLeft: "0",
  };

  const tableWrapperStyle = {
    backgroundColor: "white",
    borderRadius: "4px",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    marginTop: "12px",
  };

  const tableStyle = {
    width: "100%",
    fontSize: "12px",
    borderCollapse: "collapse",
    minWidth: "900px",
  };

  return (
    <div>
      {/* ✅ CSS styling */}
      <style>{`
            @media (min-width: 1000px) {
              .withdrawal-container { margin-left: 220px; }
            }

            @media (min-width: 769px) {
              .wl-card-list { display: none; }
              .wl-table-wrapper { display: block; }
            }

            @media (max-width: 768px) {
              .wl-card-list { display: block; }
              .wl-table-wrapper { display: none; }
            }

            .wl-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-wrap: wrap;
              gap: 12px;
              margin-bottom: 12px;
            }

            .wl-search {
              display: flex;
              gap: 8px;
              align-items: center;
              background: white;
              padding: 8px 10px;
              border-radius: 6px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.04);
              flex: 1;
              max-width: 240px;
            }

            .wl-search input {
              border: none;
              outline: none;
              font-size: 13px;
              width: 100%;
            }

            .wl-table thead th {
              padding: 10px 12px;
              text-align: left;
              color: #666;
              font-weight: 500;
              white-space: nowrap;
              font-size: 13px;
            }

            .wl-table tbody td {
              padding: 10px 12px;
              color: #333;
              font-size: 13px;
              vertical-align: middle;
              white-space: nowrap;
            }

            .wl-truncate {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              max-width: 160px;
              display: inline-block;
              vertical-align: middle;
            }

            .wl-card {
              background: #fff;
              border-radius: 6px;
              padding: 12px;
              margin-bottom: 12px;
              box-shadow: 0 1px 4px rgba(0,0,0,0.06);
              display: flex;
              flex-direction: column;
              gap: 6px;
              word-break: break-word;
            }

            .wl-card-row {
              display: flex;
              justify-content: space-between;
              gap: 8px;
              align-items: center;
            }

            .wl-card-label {
              color: #666;
              font-size: 12px;
              min-width: 100px;
            }

            .wl-card-value {
              color: #333;
              font-size: 13px;
              text-align: right;
              flex: 1;
            }

            @media (max-width: 420px) {
              .wl-card-label { min-width: 90px; font-size: 11px; }
              .wl-card-value { font-size: 12px; }
              .wl-truncate { max-width: 100px; }
            }

            .wl-pass, .wl-reject, .wl-freeze, .wl-btn {
              border: none;
              border-radius: 4px;
              padding: 4px 8px;
              font-size: 12px;
              cursor: pointer;
              white-space: nowrap;
            }
            .wl-pass { background-color: #27ae60; color: white; }
            .wl-reject { background-color: #e74c3c; color: white; }
            .wl-freeze { background-color: #f39c12; color: white; }
            .wl-btn { background-color: #3498db; color: white; }

            .wl-disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }
          `}</style>

      <div className='withdrawal-container' style={containerStyle}>
        {/* ✅ HEADER */}
        <div className='wl-header'>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Withdrawal List</h2>
            <span style={{ color: "#999", fontSize: 13 }}>
              Total: {filteredData.length}
            </span>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div className='wl-search'>
              <input
                placeholder='Search by username...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className='wl-btn' type='button'>
              <Bell size={16} />
            </button>
          </div>
        </div>

        {/* ✅ TABLE (Desktop) */}
        <div className='wl-table-wrapper' style={tableWrapperStyle}>
          <div style={{ overflowX: "auto" }}>
            <table className='wl-table' style={tableStyle}>
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderBottom: "2px solid #e0e0e0",
                  }}
                >
                  <th>No.</th>
                  <th>UID</th>
                  <th>Username</th>
                  <th>Date/Time</th>
                  <th>Withdraw Amount</th>
                  <th>Account Balance</th>
                  <th>Account Holder</th>
                  <th>Bank</th>
                  <th>Account #</th>
                  <th>Wallet</th>
                  <th>QR Code</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => {
                  const currentStatus = rowStatuses[item.no] || "";
                  const isFrozen = frozenStatuses[item.no];
                  const isDecided = ["Passed", "Rejected", "Frozen"].includes(
                    currentStatus
                  );
                  return (
                    <tr
                      key={item.no}
                      style={{ borderBottom: "1px solid #f0f0f0" }}
                    >
                      <td>{item.no}</td>
                      <td>{item.uid}</td>
                      <td>{item.username}</td>
                      <td>
                        <div>{item.dateTime.split(" ")[0]}</div>
                        <div style={{ color: "#999", fontSize: 11 }}>
                          {item.dateTime.split(" ")[1]}
                        </div>
                      </td>
                      <td style={{ color: "#27ae60", fontWeight: 500 }}>
                        ${item.withdrawAmount.toFixed(2)}
                      </td>
                      <td>${item.accountBalance.toFixed(2)}</td>
                      <td>{item.holderName || "-"}</td>
                      <td>{item.bankName || "-"}</td>
                      <td>{item.accountNumber || "-"}</td>
                      <td>
                        <div className='wl-truncate'>
                          {item.walletAddress || "-"}
                        </div>
                      </td>
                      <td>{item.qrCode || "-"}</td>
                      <td>
                        <div
                          style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                        >
                          {isDecided ? (
                            <span
                              style={{
                                color: getStatusColor(currentStatus),
                                fontWeight: 600,
                              }}
                            >
                              {currentStatus}
                            </span>
                          ) : (
                            <span
                              style={{ color: "#999", fontStyle: "italic" }}
                            >
                              Pending
                            </span>
                          )}
                          <button
                            className={`wl-pass ${
                              isDecided ? "wl-disabled" : ""
                            }`}
                            onClick={() => handleStatus(item.no, "Passed")}
                            disabled={isDecided}
                          >
                            Pass
                          </button>
                          <button
                            className={`wl-reject ${
                              isDecided ? "wl-disabled" : ""
                            }`}
                            onClick={() => handleStatus(item.no, "Rejected")}
                            disabled={isDecided}
                          >
                            Reject
                          </button>
                          <button
                            className={`wl-freeze ${
                              isFrozen ? "wl-disabled" : ""
                            }`}
                            onClick={() => handleFreeze(item.no)}
                          >
                            {isFrozen ? "Unfreeze" : "Freeze"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ✅ CARD LIST (Mobile) */}
        <div className='wl-card-list'>
          {filteredData.map((item) => {
            const currentStatus = rowStatuses[item.no] || "";
            const isFrozen = frozenStatuses[item.no];
            const isDecided = ["Passed", "Rejected", "Frozen"].includes(
              currentStatus
            );
            return (
              <div className='wl-card' key={`card-${item.no}`}>
                <div className='wl-card-row'>
                  <strong>{item.username}</strong>
                  <span style={{ color: "#999", fontSize: 12 }}>
                    #{item.uid}
                  </span>
                </div>
                <div className='wl-card-row'>
                  <div className='wl-card-label'>Amount</div>
                  <div className='wl-card-value' style={{ color: "#27ae60" }}>
                    ${item.withdrawAmount.toFixed(2)}
                  </div>
                </div>
                <div className='wl-card-row'>
                  <div className='wl-card-label'>Date</div>
                  <div className='wl-card-value'>
                    {item.dateTime.split(" ")[0]}
                  </div>
                </div>
                <div className='wl-card-row'>
                  <div className='wl-card-label'>Holder</div>
                  <div className='wl-card-value'>{item.holderName || "-"}</div>
                </div>
                <div className='wl-card-row'>
                  <div className='wl-card-label'>Bank</div>
                  <div className='wl-card-value'>{item.bankName || "-"}</div>
                </div>
                <div className='wl-card-row'>
                  <div className='wl-card-label'>Wallet</div>
                  <div className='wl-card-value wl-truncate'>
                    {item.walletAddress || "-"}
                  </div>
                </div>

                <div className='wl-card-row' style={{ marginTop: 8 }}>
                  {isDecided ? (
                    <span
                      style={{
                        color: getStatusColor(currentStatus),
                        fontWeight: 600,
                      }}
                    >
                      {currentStatus}
                    </span>
                  ) : (
                    <span style={{ color: "#999", fontStyle: "italic" }}>
                      Pending
                    </span>
                  )}

                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button
                      className={`wl-pass ${isDecided ? "wl-disabled" : ""}`}
                      onClick={() => handleStatus(item.no, "Passed")}
                      disabled={isDecided}
                    >
                      Pass
                    </button>
                    <button
                      className={`wl-reject ${isDecided ? "wl-disabled" : ""}`}
                      onClick={() => handleStatus(item.no, "Rejected")}
                      disabled={isDecided}
                    >
                      Reject
                    </button>
                    <button
                      className={`wl-freeze ${isFrozen ? "wl-disabled" : ""}`}
                      onClick={() => handleFreeze(item.no)}
                    >
                      {isFrozen ? "Unfreeze" : "Freeze"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalList;
