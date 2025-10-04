import React, { useState } from "react";
import { Bell } from "lucide-react";

const WithdrawalList = () => {
  const [searchTerm, setSearchTerm] = useState("");

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
      no: 382,
      uid: "1058801",
      username: "Ali 12345",
      dateTime: "2025-09-17 19:33:15",
      withdrawAmount: 116478.0,
      accountBalance: 116478,
      holderName: "Saiyad rukman ratt",
      bankName: "Karnataka bank",
      accountNumber: "653250010104810I",
      walletAddress: "",
      qrCode: "",
      status: "Rejected",
    },
    {
      no: 381,
      uid: "1058812",
      username: "Sivaprakash",
      dateTime: "2025-09-16 14:15:14",
      withdrawAmount: 499.0,
      accountBalance: 18499,
      holderName: "Sivaprakash",
      bankName: "Federal Bank",
      accountNumber: "17970100084842",
      walletAddress: "",
      qrCode: "",
      status: "Rejected",
    },
    {
      no: 380,
      uid: "1058812",
      username: "Sivaprakash",
      dateTime: "2025-09-14 08:19:01",
      withdrawAmount: 499.0,
      accountBalance: 13499.0,
      holderName: "Sivaprakash",
      bankName: "Federal Bank",
      accountNumber: "17970100084842",
      walletAddress: "",
      qrCode: "",
      status: "Passed",
    },
    {
      no: 379,
      uid: "1058815",
      username: "suryavk2580",
      dateTime: "2025-09-14 07:31:05",
      withdrawAmount: 19120.0,
      accountBalance: 19120,
      holderName: "SURYA KUMBHAKAR",
      bankName: "Slice small finance bank",
      accountNumber: "033325221098115",
      walletAddress: "",
      qrCode: "",
      status: "Rejected",
    },
    {
      no: 377,
      uid: "1058815",
      username: "suryavk2580",
      dateTime: "2025-09-14 06:39:49",
      withdrawAmount: 9820.0,
      accountBalance: 9820,
      holderName: "",
      bankName: "",
      accountNumber: "",
      walletAddress: "",
      qrCode: "",
      status: "Passed",
    },
    {
      no: 372,
      uid: "1058812",
      username: "Sivaprakash",
      dateTime: "2025-09-14 05:24:34",
      withdrawAmount: 5000.0,
      accountBalance: 18499,
      holderName: "Sivaprakash",
      bankName: "Federal Bank",
      accountNumber: "17970100084842",
      walletAddress: "",
      qrCode: "",
      status: "Rejected",
    },
    {
      no: 371,
      uid: "1058814",
      username: "Raza",
      dateTime: "2025-09-13 14:41:49",
      withdrawAmount: 392.0,
      accountBalance: 123,
      holderName: "",
      bankName: "",
      accountNumber: "",
      walletAddress: "",
      qrCode: "",
      status: "Passed",
    },
    {
      no: 365,
      uid: "1058801",
      username: "Ali 12345",
      dateTime: "2025-09-12 16:20:34",
      withdrawAmount: 116478.0,
      accountBalance: 116478,
      holderName: "Saiyad rukman ratt",
      bankName: "Karnataka bank",
      accountNumber: "653250010104810I",
      walletAddress: "",
      qrCode: "",
      status: "Rejected",
    },
  ];

  // local state to keep track of statuses per "no"
  const [rowStatuses, setRowStatuses] = useState(() => {
    const map = {};
    data.forEach((d) => {
      if (d.status === "Passed" || d.status === "Rejected")
        map[d.no] = d.status;
      else map[d.no] = ""; // pending/none
    });
    return map;
  });

  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    if (status === "Passed") return "#27ae60";
    if (status === "Rejected") return "#e74c3c";
    return "#000";
  };

  const handleStatus = (no, newStatus) => {
    setRowStatuses((prev) => ({ ...prev, [no]: newStatus }));
    // TODO: send API request to persist status if needed
  };

  // layout container style: takes sidebar into account on larger screens
  const containerStyle = {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "20px",
    boxSizing: "border-box",
    marginLeft: "0", // overridden by CSS media query for larger screens
  };

  const tableWrapperStyle = {
    backgroundColor: "white",
    borderRadius: "4px",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  };

  const tableStyle = {
    width: "100%",
    fontSize: "12px",
    borderCollapse: "collapse",
    minWidth: "900px", // allow horizontal scroll on small screens if table visible
  };

  return (
    <div>
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
        .wl-card { background: #fff; border-radius: 6px; padding: 12px; margin-bottom: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); display: flex; flex-direction: column; gap: 6px; word-break: break-word; }
        .wl-card-row { display: flex; justify-content: space-between; gap: 8px; align-items: center; }
        .wl-card-label { color: #666; font-size: 12px; min-width: 120px; }
        .wl-card-value { color: #333; font-size: 13px; text-align: right; flex: 1; }
        .wl-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 160px; display: inline-block; vertical-align: middle; }
        .wl-table thead th { padding: 10px 12px; text-align: left; color: #666; font-weight: 500; white-space: nowrap; font-size: 13px; }
        .wl-table tbody td { padding: 10px 12px; color: #333; font-size: 13px; vertical-align: middle; }
        @media (max-width: 420px) { .wl-card-label { min-width: 100px; font-size: 11px; } .wl-card-value { font-size: 12px; } .wl-truncate { max-width: 120px; } }
        .wl-header { display: flex; gap: 12px; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; }
        .wl-search { display: flex; gap: 8px; align-items: center; background: white; padding: 8px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
        .wl-search input { border: none; outline: none; font-size: 13px; }
        .wl-actions { display: flex; gap: 8px; align-items: center; }
        .wl-btn { background-color: #3498db; color: white; border: none; border-radius: 4px; padding: 6px 10px; font-size: 13px; cursor: pointer; }
        .wl-pass { background-color: #27ae60; color: white; border: none; border-radius: 4px; padding: 6px 10px; font-size: 12px; cursor: pointer; }
        .wl-reject { background-color: #e74c3c; color: white; border: none; border-radius: 4px; padding: 6px 10px; font-size: 12px; cursor: pointer; }
        .wl-small { padding: 4px 8px; font-size: 12px; }
        .wl-disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div className='withdrawal-container' style={containerStyle}>
        <div className='wl-header'>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Withdrawal List</h2>
            <div style={{ color: "#999", fontSize: 13 }}>
              Total: {filteredData.length}
            </div>
          </div>

          <div className='wl-actions'>
            <div className='wl-search' style={{ minWidth: 180 }}>
              <input
                placeholder='Search by username...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ minWidth: 120 }}
              />
            </div>
            <button className='wl-btn' type='button'>
              <Bell size={16} />
            </button>
          </div>
        </div>

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
                  <th>Account Holder Name</th>
                  <th>Bank Name</th>
                  <th>Account Number</th>
                  <th>Wallet address</th>
                  <th>Qr Code</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item) => {
                  const currentStatus = rowStatuses[item.no] || "";
                  const isDecided =
                    currentStatus === "Passed" || currentStatus === "Rejected";
                  return (
                    <tr
                      key={item.no}
                      style={{ borderBottom: "1px solid #f0f0f0" }}
                    >
                      <td>{item.no}</td>
                      <td>{item.uid}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{item.username}</td>
                      <td>
                        <div>{item.dateTime.split(" ")[0]}</div>
                        <div style={{ color: "#999", fontSize: "11px" }}>
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
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          {isDecided ? (
                            <span
                              style={{
                                color: getStatusColor(currentStatus),
                                fontWeight: 600,
                              }}
                            >
                              {currentStatus === "Passed"
                                ? "✅ Passed"
                                : "❌ Rejected"}
                            </span>
                          ) : (
                            <span
                              style={{ color: "#999", fontStyle: "italic" }}
                            >
                              Pending
                            </span>
                          )}

                          <button
                            className={`wl-pass wl-small ${
                              isDecided ? "wl-disabled" : ""
                            }`}
                            onClick={() => handleStatus(item.no, "Passed")}
                            disabled={isDecided}
                            title='Mark as Passed'
                          >
                            Pass
                          </button>
                          <button
                            className={`wl-reject wl-small ${
                              isDecided ? "wl-disabled" : ""
                            }`}
                            onClick={() => handleStatus(item.no, "Rejected")}
                            disabled={isDecided}
                            title='Mark as Rejected'
                          >
                            Reject
                          </button>

                          <button
                            className='wl-btn wl-small'
                            style={{ marginLeft: 4 }}
                          >
                            Order Status
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

        <div className='wl-card-list' style={{ marginTop: 8 }}>
          {filteredData.map((item) => {
            const currentStatus = rowStatuses[item.no] || "";
            const isDecided =
              currentStatus === "Passed" || currentStatus === "Rejected";
            return (
              <div className='wl-card' key={`card-${item.no}`}>
                <div className='wl-card-row'>
                  <div
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                  >
                    <strong style={{ fontSize: 15 }}>{item.username}</strong>
                    <div style={{ color: "#999", fontSize: 12 }}>
                      #{item.uid}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#27ae60", fontWeight: 600 }}>
                      ${item.withdrawAmount.toFixed(2)}
                    </div>
                    <div style={{ color: "#999", fontSize: 12 }}>
                      {item.dateTime.split(" ")[0]}
                    </div>
                  </div>
                </div>

                <div className='wl-card-row'>
                  <div className='wl-card-label'>Account Holder</div>
                  <div className='wl-card-value'>{item.holderName || "-"}</div>
                </div>

                <div className='wl-card-row'>
                  <div className='wl-card-label'>Bank</div>
                  <div className='wl-card-value'>{item.bankName || "-"}</div>
                </div>

                <div className='wl-card-row'>
                  <div className='wl-card-label'>Account #</div>
                  <div className='wl-card-value'>
                    {item.accountNumber || "-"}
                  </div>
                </div>

                <div className='wl-card-row'>
                  <div className='wl-card-label'>Wallet</div>
                  <div className='wl-card-value wl-truncate'>
                    {item.walletAddress || "-"}
                  </div>
                </div>

                <div className='wl-card-row'>
                  <div className='wl-card-label'>Status</div>
                  <div
                    className='wl-card-value'
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {isDecided ? (
                      <span
                        style={{
                          color: getStatusColor(currentStatus),
                          fontWeight: 600,
                        }}
                      >
                        {currentStatus === "Passed"
                          ? "✅ Passed"
                          : "❌ Rejected"}
                      </span>
                    ) : (
                      <span style={{ color: "#999", fontStyle: "italic" }}>
                        Pending
                      </span>
                    )}

                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className={`wl-pass wl-small ${
                          isDecided ? "wl-disabled" : ""
                        }`}
                        onClick={() => handleStatus(item.no, "Passed")}
                        disabled={isDecided}
                        title='Mark as Passed'
                      >
                        Pass
                      </button>
                      <button
                        className={`wl-reject wl-small ${
                          isDecided ? "wl-disabled" : ""
                        }`}
                        onClick={() => handleStatus(item.no, "Rejected")}
                        disabled={isDecided}
                        title='Mark as Rejected'
                      >
                        Reject
                      </button>
                      <button className='wl-btn wl-small'>Order Status</button>
                    </div>
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
