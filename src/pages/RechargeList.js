import React, { useState } from "react";
import { Bell } from "lucide-react";

const RechargeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("Member account");
  const [topupType, setTopupType] = useState("all");

  const data = [
    {
      id: 386,
      uid: "1058819",
      account: "Alex AA",
      orderNumber: "",
      method: "",
      voucher: "",
      operatingTime: "2025-09-23 12:08:57",
      amount: 700.0,
      balance: 700,
      shown: "display",
      remark: "Successfully added funds to the system",
      reviewTime: "2025-09-23 12:08:57",
      status: "passed",
    },
    {
      id: 383,
      uid: "1058817",
      account: "Waheed1",
      orderNumber: "",
      method: "",
      voucher: "",
      operatingTime: "2025-09-20 16:45:12",
      amount: 70.0,
      balance: 70,
      shown: "display",
      remark: "Successfully added funds to the system",
      reviewTime: "2025-09-20 16:45:12",
      status: "passed",
    },
    {
      id: 378,
      uid: "1058815",
      account: "suryavk2580",
      orderNumber: "",
      method: "",
      voucher: "",
      operatingTime: "2025-09-14 06:40:03",
      amount: 9300.0,
      balance: 19120,
      shown: "display",
      remark: "Successfully added funds to the system",
      reviewTime: "2025-09-14 06:40:03",
      status: "passed",
    },
    {
      id: 376,
      uid: "1058815",
      account: "suryavk2580",
      orderNumber: "",
      method: "",
      voucher: "",
      operatingTime: "2025-09-14 06:39:34",
      amount: 9820.0,
      balance: 19640,
      shown: "display",
      remark: "Successfully added funds to the system",
      reviewTime: "2025-09-14 06:39:34",
      status: "passed",
    },
    {
      id: 375,
      uid: "1058815",
      account: "suryavk2580",
      orderNumber: "",
      method: "",
      voucher: "",
      operatingTime: "2025-09-14 06:39:04",
      amount: 5000.0,
      balance: 9820,
      shown: "display",
      remark: "Successfully added funds to the system",
      reviewTime: "2025-09-14 06:39:04",
      status: "passed",
    },
  ];

  const filteredData = data.filter((item) =>
    item.account.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Top Header */}
      <div
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e0e0e0",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: "0",
            }}
          >
            ☰
          </button>
          <h1
            style={{
              fontSize: "18px",
              margin: "0",
              color: "#ff6b6b",
              fontWeight: "normal",
            }}
          >
            MANAGEMENT SYSTEM
          </h1>
        </div>

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
        {/* Filters */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "4px",
            padding: "20px",
            marginBottom: "15px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  color: "#666",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{
                  width: "100%",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "6px 10px",
                  fontSize: "13px",
                }}
              >
                <option>Member account</option>
                <option>Agent account</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  color: "#666",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Account
              </label>
              <input
                type='text'
                placeholder='Account'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "6px 10px",
                  fontSize: "13px",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  color: "#666",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Type of top-up
              </label>
              <select
                value={topupType}
                onChange={(e) => setTopupType(e.target.value)}
                style={{
                  width: "100%",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "6px 10px",
                  fontSize: "13px",
                }}
              >
                <option value='all'>all</option>
                <option value='manual'>Manual</option>
                <option value='auto'>Auto</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  color: "#666",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                Order time
              </label>
              <input
                type='text'
                placeholder='Click Select Time'
                style={{
                  width: "100%",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "6px 10px",
                  fontSize: "13px",
                  color: "#999",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <input
              type='text'
              placeholder='Click Select Time'
              style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "6px 10px",
                fontSize: "13px",
                color: "#999",
              }}
            />

            <button
              style={{
                backgroundColor: "#27ae60",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "7px 20px",
                fontSize: "13px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Search
            </button>
            <button
              onClick={() => {
                setSearchTerm("");
                setTopupType("all");
                setType("Member account");
              }}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "7px 20px",
                fontSize: "13px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Reset
            </button>
            <span
              style={{ color: "#666", fontSize: "13px", marginLeft: "10px" }}
            >
              Total deposit amount:{" "}
              <span style={{ fontWeight: "500" }}>13321916.5</span>
            </span>
          </div>
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
                fontSize: "12px",
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
                      padding: "10px 12px",
                      textAlign: "left",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    #ID
                  </th>
                  <th
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    UID
                  </th>
                  <th
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Account
                  </th>
                  <th
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Order number
                  </th>
                  <th
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Deposit method
                  </th>
                  <th
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Recharge voucher
                  </th>
                  <th
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Operating time
                  </th>
                  <th
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Member account amount
                  </th>
                  <th
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Whether it is balance
                  </th>
                  <th
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    shown
                  </th>
                  <th
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    remark
                  </th>
                  <th
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Review time
                  </th>
                  <th
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      color: "#666",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Audit/status
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    style={{ borderBottom: "1px solid #f0f0f0" }}
                  >
                    <td style={{ padding: "10px 12px", color: "#333" }}>
                      {item.id}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#333" }}>
                      {item.uid}
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        color: "#333",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.account}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#333" }}>
                      {item.orderNumber}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#333" }}>
                      {item.method}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#333" }}>
                      {item.voucher}
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        color: "#333",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <div>{item.operatingTime.split(" ")[0]}</div>
                      <div style={{ color: "#999", fontSize: "11px" }}>
                        {item.operatingTime.split(" ")[1]}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        color: "#e74c3c",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ${item.amount.toFixed(2)}
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        color: "#e74c3c",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ${item.balance}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#333" }}>
                      {item.shown}
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        color: "#666",
                        maxWidth: "200px",
                      }}
                    >
                      <div
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.remark}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        color: "#333",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <div>{item.reviewTime.split(" ")[0]}</div>
                      <div style={{ color: "#999", fontSize: "11px" }}>
                        {item.reviewTime.split(" ")[1]}
                      </div>
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{ color: "#27ae60", fontWeight: "500" }}>
                        {item.status}
                      </span>
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

export default RechargeList;
