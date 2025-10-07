import axios from "axios";
import { ChevronsUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Initial data
const initialTrades = [
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
    closing: "11200.000",
    percentage: "20,30% / 10,20%",
    profitLoss: "$100.0",
  },
  {
    id: 1675,
    uid: "1058820",
    username: "Maria BB",
    time: "2025-09-23 12:13:15",
    product: "ETH/USDT",
    state: "Closed",
    direction: "Sell",
    duration: "1Minute",
    opening: "1850.500",
    closing: "1840.200",
    percentage: "15,20% / 8,15%",
    profitLoss: "-$50.0",
  },
  {
    id: 1674,
    uid: "1058821",
    username: "John CC",
    time: "2025-09-23 12:11:16",
    product: "ADA/USDT",
    state: "Open",
    direction: "Buy",
    duration: "2Minute",
    opening: "0.4521",
    closing: "0.4580",
    percentage: "25,40% / 12,25%",
    profitLoss: "$75.5",
  },
];

const initialStats = [
  { label: "Profit and loss statistics", value: "$125.50", color: "#e74c3c" },
  { label: "Trading lots", value: "3 Order", color: "#666" },
  { label: "Commission amount", value: "$15.75", color: "#3498db" },
  { label: "Effective amount", value: "$2,500.00", color: "#e74c3c" },
  { label: "Invalid amount", value: "$0", color: "#1abc9c" },
  { label: "Handling fee", value: "$5.25", color: "#666" },
];

const profitMarginEnum = {
  120: 20,
  160: 30,
  200: 40,
  240: 50,
  240: 50
}

export default function OpenOrder() {
  const [trades, setTrades] = useState([]);
  const [stats, setStats] = useState(initialStats);
  const [selectedTrades, setSelectedTrades] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("All");
  const [filterDirection, setFilterDirection] = useState("All");
  const navigate = useNavigate();


  // Container styles
  const containerStyle = {
    padding: "20px",
    background: "#f5f6fa",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  };

  const headerStyle = {
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
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

  const controlsStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  };

  const searchInputStyle = {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    minWidth: "200px",
  };

  const filterSelectStyle = {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    background: "white",
  };

  const tableWrapperStyle = {
    overflowX: "auto",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginTop: "15px",
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
    marginLeft: "5px",
  };

  const closeButtonStyle = {
    background: "#95a5a6",
    color: "#fff",
    fontSize: "12px",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background 0.3s",
    marginLeft: "5px",
  };

  const dropdownContainerStyle = {
    position: "relative",
    display: "inline-block",
  };

  const dropdownButtonStyle = {
    background: "#3498db",
    color: "#fff",
    fontSize: "12px",
    border: "none",
    padding: "5px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background 0.3s",
    minWidth: "100px",
    textAlign: "center",
  };

  const dropdownMenuStyle = {
    position: "absolute",
    top: "100%",
    left: "0",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    zIndex: "1000",
    minWidth: "120px",
  };

  const dropdownItemStyle = {
    padding: "8px 12px",
    fontSize: "12px",
    cursor: "pointer",
    borderBottom: "1px solid #f0f0f0",
    transition: "background 0.2s",
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

  const stateStyle = (state) => ({
    color: state === "Open" ? "#27ae60" : "#e74c3c",
    fontWeight: "600",
  });

  const profitLossStyle = (status) => ({
    color: status === 'TOTAL_LOSS' ? "#e74c3c" : "#27ae60",
    fontWeight: "bold",
  });

  // Filter trades based on search and filters
  const filteredTrades = trades.filter((trade) => {
    const matchesSearch =
      trade?.userId.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade?.coin?.toLowerCase().includes(searchTerm.toLowerCase()) || trade._id.includes(searchTerm);

    const matchesState = filterState === "All" || trade.status === filterState;
    const matchesDirection =
      filterDirection === "All" || trade.direction === filterDirection;

    return matchesSearch && matchesState && matchesDirection;
  });

  // Handle individual trade selection
  const handleTradeSelect = (tradeId) => {
    setSelectedTrades((prev) =>
      prev.includes(tradeId)
        ? prev.filter((id) => id !== tradeId)
        : [...prev, tradeId]
    );
  };

  // Handle select all trades
  const handleSelectAll = () => {
    if (selectedTrades.length === filteredTrades.length) {
      setSelectedTrades([]);
    } else {
      setSelectedTrades(filteredTrades.map((trade) => trade.id));
    }
  };

  // Close selected trades
  const handleCloseTrades = () => {
    if (selectedTrades.length === 0) {
      alert("Please select at least one trade to close");
      return;
    }

    setTrades((prevTrades) =>
      prevTrades.map((trade) =>
        selectedTrades.includes(trade.id)
          ? { ...trade, state: "Closed" }
          : trade
      )
    );
    setSelectedTrades([]);
    updateStatistics();
  };

  // Update statistics based on current trades
  const updateStatistics = () => {
    const totalProfitLoss = trades.reduce((sum, trade) => {
      const amount = parseFloat(
        trade.profitLoss?.replace("$", "").replace(",", "").replace("-", "")
      );
      return trade.profitLoss?.startsWith("-") ? sum - amount : sum + amount;
    }, 0);

    const openTrades = trades.filter((trade) => trade.state === "Open").length;
    const closedTrades = trades.filter(
      (trade) => trade.state === "Closed"
    ).length;

    setStats([
      {
        label: "Profit and loss statistics",
        value: `$${totalProfitLoss.toFixed(2)}`,
        color: totalProfitLoss >= 0 ? "#27ae60" : "#e74c3c",
      },
      {
        label: "Trading lots",
        value: `${trades.length} Order`,
        color: "#666",
      },
      {
        label: "Open trades",
        value: `${openTrades} Open`,
        color: "#3498db",
      },
      {
        label: "Closed trades",
        value: `${closedTrades} Closed`,
        color: "#e74c3c",
      },
      {
        label: "Total buy orders",
        value: `${trades.filter((t) => t.direction === "Buy").length} Buy`,
        color: "#2ecc71",
      },
      {
        label: "Total sell orders",
        value: `${trades.filter((t) => t.direction === "Sell").length} Sell`,
        color: "#e74c3c",
      },
    ]);
  };

  // Dropdown functionality
  const handleDropdownToggle = (tradeId, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === tradeId ? null : tradeId);
  };

  const handleMenuAction = async (action, trade) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/order-set/set-proposed-status/${trade._id}`,
        { proposedStatus: action },
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

      // ✅ Update state
      setTrades(() =>
        filteredTrades.map((elem) =>
          elem._id === trade._id
            ? { ...elem, proposed_status: action }
            : elem
        )
      );

      // ✅ Alert based on action
      switch (action) {
        case "TOTAL_PROFIT":
          alert(`Total Profit for trade: $${Math.max(0, trade.amount).toFixed(2)}`);
          break;
        case "TOTAL_LOSS":
          alert(`Total Loss for trade: $${Math.max(0, trade.amount).toFixed(2)}`);
          break;
        default:
          break;
      }
    } catch (error) {
      // ✅ Handle 401 from error response too
      if (error.response && error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem("auth");
        alert("⚠️ Session expired. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        console.error("Error updating trade status:", error);
        alert("❌ Failed to update trade status. Please try again.");
      }
    }
  };

  // // P/L button functionality
  // const handlePLButton = (trade) => {
  //   alert(
  //     `Profit/Loss for Trade #${trade.id} (${trade.product}): ${trade.profitLoss}`
  //   );
  // };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Update statistics when trades change
  useEffect(() => {
    updateStatistics();
  }, [trades]);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/order-set/all-ongoing-orders/ON_GOING`
          , {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('auth')
            }
          });
        setTrades(response.data.orders)
      } catch (error) {
        console.error("Error fetching orders:", error);
        setTrades([])
      }
    };

    getAllOrders();
  }, []);

  // Get display text for dropdown button
  const getDropdownButtonText = (tradeId) => {
    return selectedOptions[tradeId] || "Default";
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Open Order</h1>
          <p style={subtitleStyle}>Manage all current active trades</p>
        </div>

        <div style={controlsStyle}>
          <input
            type='text'
            placeholder='Search by username, product, or UID...'
            style={searchInputStyle}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            style={filterSelectStyle}
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value='All'>All States</option>
            <option value='ON_GOING'>ON_GOING</option>
            <option value='COMPLETED'>COMPLETED</option>
          </select>
          <select
            style={filterSelectStyle}
            value={filterDirection}
            onChange={(e) => setFilterDirection(e.target.value)}
          >
            <option value='All'>All Directions</option>
            <option value='BUY'>BUY</option>
            <option value='SELL'>SELL</option>
          </select>
          <button
            style={closeButtonStyle}
            onClick={handleCloseTrades}
            disabled={selectedTrades.length === 0}
          >
            Close Selected ({selectedTrades.length})
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th style={thTdBase}>
                <input
                  type='checkbox'
                  checked={
                    selectedTrades.length === filteredTrades.length &&
                    filteredTrades.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              {[
                "No.",
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
            {filteredTrades.map((trade, idx) => (
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
                  <input
                    type='checkbox'
                    checked={selectedTrades.includes(trade.id)}
                    onChange={() => handleTradeSelect(trade.id)}
                  />
                </td>
                <td style={thTdBase}>{trade._id}</td>
                <td style={thTdBase}>{trade.userId.user_name}</td>
                <td style={thTdBase}>{trade.start_time}</td>
                <td style={{ ...thTdBase, fontWeight: "500" }}>
                  {trade.coin}
                </td>
                <td style={{ ...thTdBase, ...stateStyle(trade.status) }}>
                  {trade.status}
                </td>
                <td style={thTdBase}>
                  <span style={directionStyle(trade.direction)}>
                    {trade.direction}
                  </span>
                </td>
                <td style={thTdBase}>{trade.order_duration}</td>
                <td style={thTdBase}>{trade.opening_price}</td>
                <td style={{ ...thTdBase, color: "#e74c3c" }}>
                  {trade.closing}
                </td>
                <td style={{ ...thTdBase, color: "#e67e22" }}>
                  {profitMarginEnum[trade.order_duration]}
                </td>
                <td
                  style={{ ...thTdBase, ...profitLossStyle(trade.proposed_status) }}
                >
                  {trade.proposed_status}
                </td>
                <td style={thTdBase}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {/* Dropdown Menu First */}
                    <div style={dropdownContainerStyle}>
                      <button
                        style={dropdownButtonStyle}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#2980b9")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#3498db")
                        }
                        onClick={(e) => handleDropdownToggle(trade._id, e)}
                      >
                        {getDropdownButtonText(trade.id)}
                      </button>

                      {activeDropdown === trade._id && (
                        <div style={dropdownMenuStyle}>
                          {["Default", "TOTAL_LOSS", "TOTAL_PROFIT"].map(
                            (option) => (
                              <div
                                key={option}
                                style={{
                                  ...dropdownItemStyle,
                                  background:
                                    selectedOptions[trade.id] === option
                                      ? "#e3f2fd"
                                      : "#fff",
                                  fontWeight:
                                    selectedOptions[trade.id] === option
                                      ? "600"
                                      : "normal",
                                }}
                                onClick={() => handleMenuAction(option, trade)}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.background = "#f5f6fa")
                                }
                                onMouseLeave={(e) =>
                                (e.currentTarget.style.background =
                                  selectedOptions[trade.id] === option
                                    ? "#e3f2fd"
                                    : "#fff")
                                }
                              >
                                {option}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    {/* P/L Button After Dropdown */}
                    {/* <button
                      style={plButtonStyle}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#c0392b")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#e74c3c")
                      }
                      onClick={() => handlePLButton(trade)}   
                    >
                      P/L
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTrades.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            No trades found matching your criteria.
          </div>
        )}
      </div>

      {/* Stats Section */}
      {/* <div style={statsGridStyle}>
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
      </div> */}
    </div>
  );
}
