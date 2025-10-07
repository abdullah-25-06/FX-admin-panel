import axios from "axios";
import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    newToday: 1,
    totalUsers: 33,
    totalBalance: 11887313.69,
    todaysOrder: 4,
    customerProfitLoss: 800.0,
    todaysRunningFee: 350.0,
    rechargeToday: 0,
    withdrawToday: 0,
    handlingFee: 0,
  });
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [again, setAgain] = useState(true)
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [filters, setFilters] = useState({
    status: "all",
    direction: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [timeRange, setTimeRange] = useState("realtime");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRange === "realtime") {
        updateRealTimeData();
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [timeRange]);

  useEffect(() => {
    let filtered = orders;

    if (filters.status !== "all") {
      filtered = filtered.filter((order) => order.status === filters.status);
    }

    if (filters.direction !== "all") {
      filtered = filtered.filter(
        (order) => order.direction === filters.direction
      );
    }


    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.toString().includes(searchTerm)
      );
    }

    setFilteredOrders(filtered);
  }, [filters, searchTerm, orders]);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/order-set/all-orders`
          , {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('auth')
            }
          });
        setOrders(response.data)
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([])
        if (error.response) {
          if (error.response.status === 401) {
            console.warn("Unauthorized: Token may be expired or invalid.");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("auth");
            localStorage.removeItem("username")

            navigate("/login");
          } else {
            console.error("Error fetching orders:", error.response.data?.message || error.message);
          }
        } else {
          console.error("Network or server error:", error.message);
        }
      }
    };
    getAllOrders();
  }, [again]);

  const updateRealTimeData = () => {
    setStats((prev) => ({
      ...prev,
      newToday: prev.newToday + Math.floor(Math.random() * 3),
      todaysOrder: prev.todaysOrder + Math.floor(Math.random() * 2),
      totalBalance: prev.totalBalance + (Math.random() - 0.5) * 1000,
      customerProfitLoss: prev.customerProfitLoss + (Math.random() - 0.5) * 100,
    }));
  };

  const handleRefreshData = async () => {
    setIsLoading(true);
    setAgain(prev => !prev)
    // Update with mock data
    setStats({
      newToday: Math.floor(Math.random() * 10) + 1,
      totalUsers: 33 + Math.floor(Math.random() * 5),
      totalBalance: 11887313.69 + (Math.random() - 0.5) * 5000,
      todaysOrder: Math.floor(Math.random() * 10) + 1,
      customerProfitLoss: 800.0 + (Math.random() - 0.5) * 200,
      todaysRunningFee: 350.0 + Math.random() * 50,
      rechargeToday: Math.floor(Math.random() * 5),
      withdrawToday: Math.floor(Math.random() * 3),
      handlingFee: Math.floor(Math.random() * 20),
    });

    setIsLoading(false);
  };

  const handleExportData = () => {
    const csvContent = [
      [
        "ID",
        // "Account",
        "Name",
        "Order Time",
        "Product",
        "Status",
        "Direction",
        "Order duration",
        "Price",
        "Actual profit and loss",
        "Earned Status"
      ],
      ...filteredOrders.map((order) => [
        order._id,
        // order.account,
        order.userId?.user_name,
        order.start_time,
        order.coin,
        order.status,
        order.direction,
        order.order_duration,
        order.opening_price,
        order.order_outcome_amount > 0 ? formatCurrency(order.order_outcome_amount) : formatCurrency(order.amount),
        order.earned_status
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dashboard-export-${new Date().toISOString().split("T")[0]
      }.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStateColor = (state) => {
    switch (state) {
      case "ON_GOING":
        return "#007bff";
      case "COMPLETED":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  const getProfitLossColor = (amount, orderAmount) => {
    return amount > 0 ? "#28a745" : "#dc3545";
  };

  const getOrderColor = (earned_status) => {
    switch (earned_status) {
      case "TOTAL_LOSS":
        return "#dc3545";
      case "TOTAL_PROFIT":
        return "#28a745";
      default:
        return "#007bff";
    }
  }

  const getDirectionColor = (direction) => {
    return direction === "BUY" ? "#dc3545" : "#28a745";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const statsCards = [
    {
      key: "newToday",
      label: "New today",
      value: stats.newToday,
      color: "#ff6b6b",
    },
    {
      key: "totalUsers",
      label: "Total users",
      value: stats.totalUsers,
      color: "#555",
    },
    {
      key: "totalBalance",
      label: "Total balance",
      value: formatCurrency(stats.totalBalance),
      color: "#00bfff",
    },
    {
      key: "todaysOrder",
      label: "Today's order",
      value: stats.todaysOrder,
      color: "#ff6b6b",
    },
    {
      key: "customerProfitLoss",
      label: "Customer profit/loss",
      value: formatCurrency(stats.customerProfitLoss),
      color: "#555",
    },
    {
      key: "todaysRunningFee",
      label: "Today's running fee",
      value: formatCurrency(stats.todaysRunningFee),
      color: "#00bfff",
    },
    {
      key: "rechargeToday",
      label: "Recharge today",
      value: stats.rechargeToday,
      color: "#20c997",
    },
    {
      key: "withdrawToday",
      label: "Withdraw cash today",
      value: stats.withdrawToday,
      color: "#ff6b6b",
    },
    {
      key: "handlingFee",
      label: "Same day handling fee",
      value: formatCurrency(stats.handlingFee),
      color: "#555",
    },
  ];

  const styles = {
    container: {
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
      fontSize: "28px",
      fontWeight: "bold",
      color: "#333",
      margin: 0,
    },
    controls: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    searchInput: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      minWidth: "200px",
    },
    filterSelect: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      backgroundColor: "white",
    },
    button: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      transition: "all 0.2s ease",
    },
    primaryButton: {
      backgroundColor: "#007bff",
      color: "white",
    },
    secondaryButton: {
      backgroundColor: "#28a745",
      color: "white",
    },
    outlineButton: {
      backgroundColor: "transparent",
      color: "#007bff",
      border: "1px solid #007bff",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "15px",
      marginBottom: "20px",
    },
    statCard: {
      color: "#fff",
      padding: "15px",
      textAlign: "center",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "transform 0.2s ease",
    },
    statValue: {
      fontSize: "24px",
      fontWeight: "bold",
      marginTop: "8px",
    },
    tableContainer: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      overflowX: "auto",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "1200px",
    },
    th: {
      padding: "12px 8px",
      fontSize: "14px",
      fontWeight: "bold",
      borderBottom: "2px solid #dee2e6",
      whiteSpace: "nowrap",
      backgroundColor: "#f8f9fa",
      textAlign: "center",
    },
    td: {
      padding: "12px 8px",
      fontSize: "13px",
      whiteSpace: "nowrap",
      borderBottom: "1px solid #eee",
      textAlign: "center",
    },
    loading: {
      textAlign: "center",
      padding: "20px",
      color: "#666",
    },
    emptyState: {
      textAlign: "center",
      padding: "40px",
      color: "#666",
    },
    stateBadge: {
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "600",
      color: "white",
    },
    timeFilter: {
      display: "flex",
      gap: "10px",
      marginBottom: "15px",
      alignItems: "center",
    },
    timeButton: {
      padding: "6px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      backgroundColor: "white",
      cursor: "pointer",
      fontSize: "12px",
    },
    activeTimeButton: {
      backgroundColor: "#007bff",
      color: "white",
      borderColor: "#007bff",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Trading Dashboard</h1>
        <div style={styles.controls}>
          <input
            type='text'
            placeholder='Search orders...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={handleRefreshData}
            disabled={isLoading}
          >
            {isLoading ? "🔄 Refreshing..." : "🔄 Refresh"}
          </button>
          <button
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleExportData}
          >
            📊 Export CSV
          </button>
        </div>
      </div>

      {/* Time Range Filter */}
      <div style={styles.timeFilter}>
        <span style={{ fontWeight: "600", color: "#333" }}>Time Range:</span>
        {["realtime", "today", "week", "month"].map((range) => (
          <button
            key={range}
            style={{
              ...styles.timeButton,
              ...(timeRange === range && styles.activeTimeButton),
            }}
            onClick={() => setTimeRange(range)}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {statsCards.map((stat) => (
          <div
            key={stat.key}
            style={{
              ...styles.statCard,
              backgroundColor: stat.color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div>{stat.label}</div>
            <div style={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "15px",
          flexWrap: "wrap",
        }}
      >
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          style={styles.filterSelect}
        >
          <option value='all'>All States</option>
          <option value='COMPLETED'>COMPLETED</option>
          <option value='ON_GOING'>ON_GOING</option>
        </select>

        <select
          value={filters.direction}
          onChange={(e) =>
            setFilters({ ...filters, direction: e.target.value })
          }
          style={styles.filterSelect}
        >
          <option value='all'>All Directions</option>
          <option value='BUY'>BUY</option>
          <option value='SELL'>SELL</option>
        </select>

      </div>

      {/* Table Section */}
      <div style={styles.tableContainer}>
        {isLoading ? (
          <div style={styles.loading}>
            <p>Loading data...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No orders found matching your criteria.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Order time</th>
                <th style={styles.th}>Product Information</th>
                <th style={styles.th}>State</th>
                <th style={styles.th}>Direction</th>
                <th style={styles.th}>Time/Points</th>
                <th style={styles.th}>Position opening point</th>
                <th style={styles.th}>Closing point</th>
                <th style={styles.th}>Actual profit and loss</th>
                <th style={styles.th}>Earned Status</th>
                <th style={styles.th}>Owning agent</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, idx) => (
                <tr key={order?._id}>
                  <td style={styles.td}>{order._id}</td>
                  <td style={styles.td}>{order?.userId?.user_name}</td>
                  <td style={styles.td}>{order.start_time}</td>
                  <td style={styles.td}>{order.coin}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.stateBadge,
                        backgroundColor: getStateColor(order.status),
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td
                    style={{
                      ...styles.td,
                      color: getDirectionColor(order.direction),
                    }}
                  >
                    {order.direction}
                  </td>
                  <td style={styles.td}>{order.order_duration}</td>
                  <td style={styles.td}>{order.opening_price}</td>
                  <td style={styles.td}> - </td>
                  <td
                    style={{
                      ...styles.td,
                      color: getProfitLossColor(order.order_outcome_amount),
                    }}
                  >
                    {order.order_outcome_amount > 0 ? formatCurrency(order.order_outcome_amount) : formatCurrency(order.amount)}
                  </td>
                  <td
                    style={{
                      ...styles.td,
                      color: getOrderColor(order.earned_status),
                    }}
                  >
                    {order.earned_status}
                  </td>
                  <td style={styles.td}>{order.agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>Summary</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div>
            <strong>Total Orders:</strong> {filteredOrders.length}
          </div>
          <div>
            <strong>Total Profit/Loss:</strong>
            <span
              style={{
                color: getProfitLossColor(
                  filteredOrders.reduce(
                    (sum, order) => {
                      return order.earned_status === 'TOTAL_PROFIT' ? sum + order.order_outcome_amount : sum - order.amount
                    },
                    0
                  )
                ),
              }}
            >
              {formatCurrency(
                filteredOrders.reduce(
                  (sum, order) => order.earned_status === 'TOTAL_PROFIT' ? sum + order.order_outcome_amount : sum + 0,
                  0
                )
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
