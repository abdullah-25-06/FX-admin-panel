import React, { useState, useEffect } from "react";
import {
  Edit,
  UserPlus,
  Search,
  Filter,
  Plus,
  Trash2,
  Eye,
  MoreVertical,
  Download,
  Mail,
  Phone,
} from "lucide-react";

const AgentManagement = () => {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [viewingAgent, setViewingAgent] = useState(null);

  // Form states
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    phone: "",
    commission: "",
    maxUsers: "",
    status: "Active",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    commission: "",
    maxUsers: "",
    status: "Active",
  });

  // Sample data with more realistic information
  const sampleAgents = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      users: 45,
      maxUsers: 100,
      commission: "15%",
      totalCommission: 12500,
      status: "Active",
      joinDate: "2024-01-15",
      lastActive: "2024-12-19",
      performance: "Excellent",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 987-6543",
      users: 28,
      maxUsers: 50,
      commission: "12%",
      totalCommission: 8400,
      status: "Active",
      joinDate: "2024-02-20",
      lastActive: "2024-12-18",
      performance: "Good",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@example.com",
      phone: "+1 (555) 456-7890",
      users: 12,
      maxUsers: 25,
      commission: "10%",
      totalCommission: 3600,
      status: "Inactive",
      joinDate: "2024-03-10",
      lastActive: "2024-11-15",
      performance: "Average",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@example.com",
      phone: "+1 (555) 234-5678",
      users: 67,
      maxUsers: 150,
      commission: "18%",
      totalCommission: 24120,
      status: "Active",
      joinDate: "2024-01-05",
      lastActive: "2024-12-19",
      performance: "Excellent",
    },
    {
      id: 5,
      name: "Alex Rodriguez",
      email: "alex.r@example.com",
      phone: "+1 (555) 876-5432",
      users: 8,
      maxUsers: 20,
      commission: "8%",
      totalCommission: 1600,
      status: "Pending",
      joinDate: "2024-12-01",
      lastActive: "2024-12-10",
      performance: "New",
    },
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    const savedAgents = localStorage.getItem("agentManagement");

    if (savedAgents) {
      try {
        const parsedAgents = JSON.parse(savedAgents);
        setAgents(Array.isArray(parsedAgents) ? parsedAgents : sampleAgents);
      } catch (error) {
        console.error("Error loading agents:", error);
        setAgents(sampleAgents);
      }
    } else {
      setAgents(sampleAgents);
    }

    setIsLoading(false);
  }, []);

  // Save to localStorage whenever agents change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("agentManagement", JSON.stringify(agents));
    }
  }, [agents, isLoading]);

  // Filter agents based on search and filters
  useEffect(() => {
    let filtered = agents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.phone.includes(searchTerm);

      const matchesStatus =
        filterStatus === "All" || agent.status === filterStatus;

      return matchesSearch && matchesStatus;
    });

    setFilteredAgents(filtered);
  }, [agents, searchTerm, filterStatus]);

  // Agent operations
  const handleAddAgent = () => {
    // Validation
    if (!newAgent.name || !newAgent.email || !newAgent.commission) {
      showMessage("⚠️ Please fill all required fields", "error");
      return;
    }

    // Check for duplicate email
    const duplicate = agents.find((agent) => agent.email === newAgent.email);
    if (duplicate) {
      showMessage("❌ An agent with this email already exists", "error");
      return;
    }

    const agentToAdd = {
      id: Math.max(...agents.map((a) => a.id), 0) + 1,
      name: newAgent.name,
      email: newAgent.email,
      phone: newAgent.phone,
      users: 0,
      maxUsers: parseInt(newAgent.maxUsers) || 50,
      commission: newAgent.commission + "%",
      totalCommission: 0,
      status: newAgent.status,
      joinDate: new Date().toISOString().split("T")[0],
      lastActive: new Date().toISOString().split("T")[0],
      performance: "New",
    };

    setAgents([agentToAdd, ...agents]);
    setNewAgent({
      name: "",
      email: "",
      phone: "",
      commission: "",
      maxUsers: "",
      status: "Active",
    });
    setShowAddForm(false);
    showMessage(`✅ Agent "${newAgent.name}" added successfully`, "success");
  };

  const handleEdit = (agent) => {
    setEditingAgent(agent.id);
    setEditForm({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      commission: agent.commission.replace("%", ""),
      maxUsers: agent.maxUsers.toString(),
      status: agent.status,
    });
  };

  const handleSaveEdit = (agentId) => {
    if (!editForm.name || !editForm.email || !editForm.commission) {
      showMessage("⚠️ Please fill all required fields", "error");
      return;
    }

    // Check for duplicate email (excluding current agent)
    const duplicate = agents.find(
      (agent) => agent.email === editForm.email && agent.id !== agentId
    );
    if (duplicate) {
      showMessage("❌ An agent with this email already exists", "error");
      return;
    }

    const updatedAgents = agents.map((agent) =>
      agent.id === agentId
        ? {
            ...agent,
            name: editForm.name,
            email: editForm.email,
            phone: editForm.phone,
            commission: editForm.commission + "%",
            maxUsers: parseInt(editForm.maxUsers) || agent.maxUsers,
            status: editForm.status,
          }
        : agent
    );

    setAgents(updatedAgents);
    setEditingAgent(null);
    setEditForm({
      name: "",
      email: "",
      phone: "",
      commission: "",
      maxUsers: "",
      status: "Active",
    });
    showMessage(`✅ Agent updated successfully`, "success");
  };

  const handleCancelEdit = () => {
    setEditingAgent(null);
    setEditForm({
      name: "",
      email: "",
      phone: "",
      commission: "",
      maxUsers: "",
      status: "Active",
    });
  };

  const handleDelete = (agentId) => {
    const agent = agents.find((a) => a.id === agentId);
    if (
      window.confirm(
        `Are you sure you want to delete agent "${agent.name}"? This action cannot be undone.`
      )
    ) {
      const updatedAgents = agents.filter((agent) => agent.id !== agentId);
      setAgents(updatedAgents);
      setSelectedAgents(selectedAgents.filter((id) => id !== agentId));
      showMessage(`✅ Agent "${agent.name}" deleted successfully`, "success");
    }
  };

  const handleBulkDelete = () => {
    if (selectedAgents.length === 0) {
      showMessage("⚠️ Please select at least one agent to delete", "error");
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedAgents.length} selected agents?`
      )
    ) {
      const updatedAgents = agents.filter(
        (agent) => !selectedAgents.includes(agent.id)
      );
      setAgents(updatedAgents);
      setSelectedAgents([]);
      showMessage(
        `✅ ${selectedAgents.length} agents deleted successfully`,
        "success"
      );
    }
  };

  const handleStatusChange = (agentId, newStatus) => {
    const updatedAgents = agents.map((agent) =>
      agent.id === agentId ? { ...agent, status: newStatus } : agent
    );

    setAgents(updatedAgents);
    const agent = agents.find((a) => a.id === agentId);
    showMessage(
      `✅ Agent "${agent.name}" status updated to ${newStatus}`,
      "success"
    );
  };

  const handleBulkStatusChange = (newStatus) => {
    if (selectedAgents.length === 0) {
      showMessage("⚠️ Please select at least one agent", "error");
      return;
    }

    const updatedAgents = agents.map((agent) =>
      selectedAgents.includes(agent.id)
        ? { ...agent, status: newStatus }
        : agent
    );

    setAgents(updatedAgents);
    setSelectedAgents([]);
    showMessage(
      `${selectedAgents.length} agents status updated to ${newStatus}`,
      "success"
    );
  };

  const handleSelectAgent = (agentId) => {
    setSelectedAgents((prev) =>
      prev.includes(agentId)
        ? prev.filter((id) => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAgents.length === filteredAgents.length) {
      setSelectedAgents([]);
    } else {
      setSelectedAgents(filteredAgents.map((agent) => agent.id));
    }
  };

  const handleExportData = () => {
    const dataToExport = filteredAgents.map((agent) => ({
      ID: agent.id,
      Name: agent.name,
      Email: agent.email,
      Phone: agent.phone,
      Users: agent.users,
      "Max Users": agent.maxUsers,
      Commission: agent.commission,
      "Total Commission": agent.totalCommission,
      Status: agent.status,
      "Join Date": agent.joinDate,
      "Last Active": agent.lastActive,
      Performance: agent.performance,
    }));

    const headers = Object.keys(dataToExport[0]).join(",");
    const csv = [
      headers,
      ...dataToExport.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agents-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showMessage(`📊 Exported ${filteredAgents.length} agents`, "success");
  };

  // Helper functions
  const showMessage = (text, type = "info") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  const getStatusColor = (status) => {
    const colors = {
      Active: "#27ae60",
      Inactive: "#e74c3c",
      Pending: "#f39c12",
      Suspended: "#95a5a6",
    };
    return colors[status] || "#666";
  };

  const getPerformanceColor = (performance) => {
    const colors = {
      Excellent: "#27ae60",
      Good: "#2ecc71",
      Average: "#f39c12",
      Poor: "#e74c3c",
      New: "#3498db",
    };
    return colors[performance] || "#666";
  };

  // Statistics
  const getStatistics = () => {
    const totalAgents = agents.length;
    const activeAgents = agents.filter((a) => a.status === "Active").length;
    const totalUsers = agents.reduce((sum, agent) => sum + agent.users, 0);
    const totalCommission = agents.reduce(
      (sum, agent) => sum + agent.totalCommission,
      0
    );

    return {
      totalAgents,
      activeAgents,
      totalUsers,
      totalCommission,
      selected: selectedAgents.length,
    };
  };

  const stats = getStatistics();

  // Styles
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
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      margin: "0",
    },
    controlsContainer: {
      display: "flex",
      gap: "15px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    searchContainer: {
      display: "flex",
      alignItems: "center",
      background: "white",
      padding: "8px 12px",
      borderRadius: "6px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      minWidth: "250px",
    },
    statsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "15px",
      marginBottom: "20px",
    },
    statCard: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "6px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    statNumber: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    statLabel: {
      fontSize: "12px",
      color: "#666",
      textTransform: "uppercase",
    },
    actionBar: {
      backgroundColor: "white",
      borderRadius: "6px",
      padding: "15px 20px",
      marginBottom: "15px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      flexWrap: "wrap",
    },
    filterContainer: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    select: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      background: "white",
      minWidth: "120px",
    },
    button: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontWeight: "500",
    },
    buttonPrimary: {
      backgroundColor: "#3498db",
      color: "white",
    },
    buttonSuccess: {
      backgroundColor: "#27ae60",
      color: "white",
    },
    buttonDanger: {
      backgroundColor: "#e74c3c",
      color: "white",
    },
    buttonWarning: {
      backgroundColor: "#f39c12",
      color: "white",
    },
    buttonSecondary: {
      backgroundColor: "#95a5a6",
      color: "white",
    },
    message: {
      padding: "12px 16px",
      borderRadius: "6px",
      marginBottom: "15px",
      fontSize: "14px",
      fontWeight: "500",
    },
    successMessage: {
      backgroundColor: "#d4edda",
      color: "#155724",
      border: "1px solid #c3e6cb",
    },
    errorMessage: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb",
    },
    warningMessage: {
      backgroundColor: "#fff3cd",
      color: "#856404",
      border: "1px solid #ffeaa7",
    },
    formContainer: {
      backgroundColor: "white",
      borderRadius: "6px",
      padding: "20px",
      marginBottom: "15px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "15px",
      marginBottom: "15px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    formLabel: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#333",
    },
    formInput: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      outline: "none",
    },
    formButtons: {
      display: "flex",
      gap: "10px",
    },
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "6px",
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "1000px",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      borderBottom: "2px solid #dee2e6",
    },
    tableHeaderCell: {
      padding: "12px 8px",
      textAlign: "left",
      fontWeight: "bold",
      color: "#333",
      fontSize: "12px",
      borderBottom: "1px solid #dee2e6",
      whiteSpace: "nowrap",
    },
    tableCell: {
      padding: "12px 8px",
      borderBottom: "1px solid #dee2e6",
      fontSize: "13px",
      color: "#333",
    },
    statusBadge: {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "11px",
      fontWeight: "bold",
      textTransform: "uppercase",
      display: "inline-flex",
      alignItems: "center",
      gap: "3px",
    },
    actionButtons: {
      display: "flex",
      gap: "4px",
      flexWrap: "wrap",
    },
    smallButton: {
      padding: "4px 8px",
      border: "none",
      borderRadius: "4px",
      fontSize: "11px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "2px",
      fontWeight: "500",
    },
    userProgress: {
      width: "100%",
      height: "6px",
      backgroundColor: "#ecf0f1",
      borderRadius: "3px",
      overflow: "hidden",
    },
    userProgressBar: {
      height: "100%",
      borderRadius: "3px",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px",
    },
    modalContent: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "500px",
      width: "100%",
      maxHeight: "90vh",
      overflow: "auto",
    },
    noData: {
      textAlign: "center",
      padding: "40px",
      color: "#666",
      fontSize: "16px",
    },
    loadingMessage: {
      textAlign: "center",
      padding: "40px",
      color: "#666",
      fontSize: "16px",
    },
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingMessage}>Loading agent management...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Agent Management</h1>
        <div style={styles.controlsContainer}>
          <div style={styles.searchContainer}>
            <Search size={16} color='#666' />
            <input
              type='text'
              placeholder='Search agents...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                fontSize: "14px",
                width: "100%",
                marginLeft: "8px",
                background: "transparent",
              }}
            />
          </div>
          <button
            style={{ ...styles.button, ...styles.buttonPrimary }}
            onClick={handleExportData}
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.totalAgents}</div>
          <div style={styles.statLabel}>Total Agents</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.activeAgents}</div>
          <div style={styles.statLabel}>Active Agents</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.totalUsers}</div>
          <div style={styles.statLabel}>Total Users</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>
            ${stats.totalCommission.toLocaleString()}
          </div>
          <div style={styles.statLabel}>Total Commission</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.selected}</div>
          <div style={styles.statLabel}>Selected</div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div
          style={{
            ...styles.message,
            ...(messageType === "success"
              ? styles.successMessage
              : messageType === "error"
              ? styles.errorMessage
              : messageType === "warning"
              ? styles.warningMessage
              : {}),
          }}
        >
          {message}
        </div>
      )}

      {/* Action Bar */}
      <div style={styles.actionBar}>
        {!showAddForm ? (
          <button
            style={{ ...styles.button, ...styles.buttonSuccess }}
            onClick={() => setShowAddForm(true)}
          >
            <Plus size={16} />
            Add Agent
          </button>
        ) : (
          <div style={styles.formContainer}>
            <h3 style={{ margin: "0 0 15px 0", color: "#333" }}>
              Add New Agent
            </h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Name *</label>
                <input
                  type='text'
                  style={styles.formInput}
                  value={newAgent.name}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, name: e.target.value })
                  }
                  placeholder='Enter agent name'
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Email *</label>
                <input
                  type='email'
                  style={styles.formInput}
                  value={newAgent.email}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, email: e.target.value })
                  }
                  placeholder='Enter agent email'
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Phone</label>
                <input
                  type='text'
                  style={styles.formInput}
                  value={newAgent.phone}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, phone: e.target.value })
                  }
                  placeholder='Enter phone number'
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Commission *</label>
                <input
                  type='number'
                  style={styles.formInput}
                  value={newAgent.commission}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, commission: e.target.value })
                  }
                  placeholder='Commission percentage'
                  min='1'
                  max='50'
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Max Users</label>
                <input
                  type='number'
                  style={styles.formInput}
                  value={newAgent.maxUsers}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, maxUsers: e.target.value })
                  }
                  placeholder='Maximum users'
                  min='1'
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Status</label>
                <select
                  style={styles.formInput}
                  value={newAgent.status}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, status: e.target.value })
                  }
                >
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
                  <option value='Pending'>Pending</option>
                </select>
              </div>
            </div>
            <div style={styles.formButtons}>
              <button
                style={{ ...styles.button, ...styles.buttonSuccess }}
                onClick={handleAddAgent}
              >
                Add Agent
              </button>
              <button
                style={{ ...styles.button, ...styles.buttonSecondary }}
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div style={styles.filterContainer}>
          <select
            style={styles.select}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value='All'>All Status</option>
            <option value='Active'>Active</option>
            <option value='Inactive'>Inactive</option>
            <option value='Pending'>Pending</option>
          </select>

          {selectedAgents.length > 0 && (
            <>
              <button
                style={{ ...styles.button, ...styles.buttonSuccess }}
                onClick={() => handleBulkStatusChange("Active")}
              >
                Activate Selected
              </button>
              <button
                style={{ ...styles.button, ...styles.buttonWarning }}
                onClick={() => handleBulkStatusChange("Inactive")}
              >
                Deactivate Selected
              </button>
              <button
                style={{ ...styles.button, ...styles.buttonDanger }}
                onClick={handleBulkDelete}
              >
                <Trash2 size={14} />
                Delete Selected
              </button>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableHeaderCell}>
                <input
                  type='checkbox'
                  checked={
                    selectedAgents.length === filteredAgents.length &&
                    filteredAgents.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th style={styles.tableHeaderCell}>Name</th>
              <th style={styles.tableHeaderCell}>Contact</th>
              <th style={styles.tableHeaderCell}>Users</th>
              <th style={styles.tableHeaderCell}>Commission</th>
              <th style={styles.tableHeaderCell}>Performance</th>
              <th style={styles.tableHeaderCell}>Status</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <tr key={agent.id}>
                  <td style={styles.tableCell}>
                    <input
                      type='checkbox'
                      checked={selectedAgents.includes(agent.id)}
                      onChange={() => handleSelectAgent(agent.id)}
                    />
                  </td>
                  <td style={styles.tableCell}>
                    <div style={{ fontWeight: "500" }}>{agent.name}</div>
                    <div style={{ fontSize: "11px", color: "#666" }}>
                      Joined: {agent.joinDate}
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        marginBottom: "2px",
                      }}
                    >
                      <Mail size={12} color='#666' />
                      {agent.email}
                    </div>
                    {agent.phone && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "11px",
                          color: "#666",
                        }}
                      >
                        <Phone size={12} color='#666' />
                        {agent.phone}
                      </div>
                    )}
                  </td>
                  <td style={styles.tableCell}>
                    <div style={{ marginBottom: "4px" }}>
                      {agent.users} / {agent.maxUsers}
                    </div>
                    <div style={styles.userProgress}>
                      <div
                        style={{
                          ...styles.userProgressBar,
                          width: `${(agent.users / agent.maxUsers) * 100}%`,
                          backgroundColor:
                            agent.users >= agent.maxUsers
                              ? "#e74c3c"
                              : agent.users / agent.maxUsers > 0.8
                              ? "#f39c12"
                              : "#27ae60",
                        }}
                      />
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={{ fontWeight: "500" }}>{agent.commission}</div>
                    <div style={{ fontSize: "11px", color: "#666" }}>
                      Total: ${agent.totalCommission.toLocaleString()}
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        backgroundColor:
                          getPerformanceColor(agent.performance) + "20",
                        color: getPerformanceColor(agent.performance),
                      }}
                    >
                      {agent.performance}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    {editingAgent === agent.id ? (
                      <select
                        style={{
                          ...styles.formInput,
                          fontSize: "12px",
                          padding: "4px 8px",
                        }}
                        value={editForm.status}
                        onChange={(e) =>
                          setEditForm({ ...editForm, status: e.target.value })
                        }
                      >
                        <option value='Active'>Active</option>
                        <option value='Inactive'>Inactive</option>
                        <option value='Pending'>Pending</option>
                      </select>
                    ) : (
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor: getStatusColor(agent.status) + "20",
                          color: getStatusColor(agent.status),
                        }}
                      >
                        {agent.status}
                      </span>
                    )}
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      {editingAgent === agent.id ? (
                        <>
                          <button
                            style={{
                              ...styles.smallButton,
                              backgroundColor: "#27ae60",
                              color: "white",
                            }}
                            onClick={() => handleSaveEdit(agent.id)}
                          >
                            Save
                          </button>
                          <button
                            style={{
                              ...styles.smallButton,
                              backgroundColor: "#95a5a6",
                              color: "white",
                            }}
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            style={{
                              ...styles.smallButton,
                              backgroundColor: "#3498db",
                              color: "white",
                            }}
                            onClick={() => handleEdit(agent)}
                            title='Edit'
                          >
                            <Edit size={12} />
                          </button>
                          <button
                            style={{
                              ...styles.smallButton,
                              backgroundColor: "#27ae60",
                              color: "white",
                            }}
                            onClick={() => setViewingAgent(agent)}
                            title='View Details'
                          >
                            <Eye size={12} />
                          </button>
                          <button
                            style={{
                              ...styles.smallButton,
                              backgroundColor: "#e74c3c",
                              color: "white",
                            }}
                            onClick={() => handleDelete(agent.id)}
                            title='Delete'
                          >
                            <Trash2 size={12} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='8' style={styles.noData}>
                  {searchTerm || filterStatus !== "All"
                    ? "No agents found matching your criteria"
                    : "No agents found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Agent Details Modal */}
      {viewingAgent && (
        <div style={styles.modalOverlay} onClick={() => setViewingAgent(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: "0 0 15px 0", color: "#333" }}>
              Agent Details - {viewingAgent.name}
            </h3>

            <div style={{ display: "grid", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Email:</span>
                <span>{viewingAgent.email}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Phone:</span>
                <span>{viewingAgent.phone || "N/A"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Commission Rate:</span>
                <span style={{ fontWeight: "500" }}>
                  {viewingAgent.commission}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Total Commission:</span>
                <span style={{ fontWeight: "500", color: "#27ae60" }}>
                  ${viewingAgent.totalCommission.toLocaleString()}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Users:</span>
                <span>
                  {viewingAgent.users} / {viewingAgent.maxUsers}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Performance:</span>
                <span
                  style={{
                    color: getPerformanceColor(viewingAgent.performance),
                    fontWeight: "500",
                  }}
                >
                  {viewingAgent.performance}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Status:</span>
                <span
                  style={{
                    color: getStatusColor(viewingAgent.status),
                    fontWeight: "500",
                  }}
                >
                  {viewingAgent.status}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Join Date:</span>
                <span>{viewingAgent.joinDate}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#666" }}>Last Active:</span>
                <span>{viewingAgent.lastActive}</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
                justifyContent: "flex-end",
              }}
            >
              <button
                style={{ ...styles.button, ...styles.buttonSecondary }}
                onClick={() => setViewingAgent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentManagement;
