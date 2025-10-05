import React, { useState, useEffect } from "react";

const ProductList = () => {
  // State management
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editForm, setEditForm] = useState({ title: "" });
  const [newCategory, setNewCategory] = useState({ title: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState("");

  // Initial data
  const initialCategories = [
    {
      id: 5,
      title: "Foreign Exchange",
      createdAt: "2024-01-15",
      productCount: 24,
    },
    {
      id: 6,
      title: "Cryptocurrency",
      createdAt: "2024-01-14",
      productCount: 18,
    },
    { id: 7, title: "Stocks", createdAt: "2024-01-13", productCount: 32 },
    { id: 8, title: "Commodities", createdAt: "2024-01-12", productCount: 15 },
    { id: 9, title: "Indices", createdAt: "2024-01-11", productCount: 8 },
    { id: 10, title: "Forex Pairs", createdAt: "2024-01-10", productCount: 28 },
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    const savedCategories = localStorage.getItem("productCategories");

    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (error) {
        console.error("Error loading saved categories:", error);
        setCategories(initialCategories);
      }
    } else {
      setCategories(initialCategories);
    }

    setIsLoading(false);
  }, []);

  // Save to localStorage whenever categories change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("productCategories", JSON.stringify(categories));
    }
  }, [categories, isLoading]);

  // SVG Icons
  const EditIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
    </svg>
  );

  const DeleteIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
    </svg>
  );

  const SaveIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' />
    </svg>
  );

  const CancelIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
    </svg>
  );

  // Filter and search functionality
  const filteredCategories = categories
    .filter(
      (category) =>
        category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.id.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });

  // Category operations
  const handleEdit = (category) => {
    setEditingCategory(category.id);
    setEditForm({ title: category.title });
    setMessage("");
  };

  const handleSaveEdit = (categoryId) => {
    if (!editForm.title.trim()) {
      setMessage("Category title cannot be empty");
      return;
    }

    const updatedCategories = categories.map((category) =>
      category.id === categoryId
        ? { ...category, title: editForm.title }
        : category
    );

    setCategories(updatedCategories);
    setEditingCategory(null);
    setEditForm({ title: "" });
    setMessage(`Category "${editForm.title}" updated successfully`);

    // Clear success message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditForm({ title: "" });
    setMessage("");
  };

  const handleDelete = (categoryId, categoryTitle) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${categoryTitle}"? This action will also remove all products in this category.`
      )
    ) {
      const updatedCategories = categories.filter(
        (category) => category.id !== categoryId
      );
      setCategories(updatedCategories);
      setMessage(`Category "${categoryTitle}" deleted successfully`);

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleAddCategory = () => {
    if (!newCategory.title.trim()) {
      setMessage("Category title cannot be empty");
      return;
    }

    // Check for duplicate titles
    const duplicate = categories.find(
      (cat) => cat.title.toLowerCase() === newCategory.title.toLowerCase()
    );

    if (duplicate) {
      setMessage("A category with this name already exists");
      return;
    }

    const newId = Math.max(...categories.map((cat) => cat.id), 0) + 1;
    const categoryToAdd = {
      id: newId,
      title: newCategory.title,
      createdAt: new Date().toISOString().split("T")[0],
      productCount: 0,
    };

    setCategories([categoryToAdd, ...categories]);
    setNewCategory({ title: "" });
    setShowAddForm(false);
    setMessage(`Category "${newCategory.title}" added successfully`);

    // Clear success message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCancelAdd = () => {
    setNewCategory({ title: "" });
    setShowAddForm(false);
    setMessage("");
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Statistics
  const getStatistics = () => {
    const totalCategories = categories.length;
    const totalProducts = categories.reduce(
      (sum, cat) => sum + cat.productCount,
      0
    );
    const averageProducts =
      totalCategories > 0 ? (totalProducts / totalCategories).toFixed(1) : 0;

    return {
      totalCategories,
      totalProducts,
      averageProducts,
    };
  };

  const stats = getStatistics();

  // Enhanced styles
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    },
    pageTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    statsContainer: {
      display: "flex",
      gap: "15px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    statCard: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      minWidth: "120px",
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
    controlsContainer: {
      display: "flex",
      gap: "15px",
      marginBottom: "20px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    searchInput: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      minWidth: "250px",
    },
    message: {
      padding: "10px 15px",
      borderRadius: "4px",
      marginBottom: "15px",
      fontSize: "14px",
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
    categoriesContainer: {
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      padding: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      padding: "12px 16px",
      textAlign: "left",
      fontWeight: "bold",
      color: "#333",
      borderBottom: "2px solid #dee2e6",
      cursor: "pointer",
    },
    sortHeader: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    tableCell: {
      padding: "12px 16px",
      borderBottom: "1px solid #dee2e6",
      color: "#555",
    },
    operateCell: {
      padding: "12px 16px",
      borderBottom: "1px solid #dee2e6",
      display: "flex",
      gap: "8px",
    },
    editButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      transition: "background-color 0.2s",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      transition: "background-color 0.2s",
    },
    saveButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      transition: "background-color 0.2s",
      marginRight: "5px",
    },
    cancelButton: {
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      transition: "background-color 0.2s",
    },
    addButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.2s",
      marginBottom: "15px",
    },
    addForm: {
      backgroundColor: "#f8f9fa",
      padding: "15px",
      borderRadius: "6px",
      border: "1px solid #dee2e6",
      marginBottom: "15px",
    },
    formGroup: {
      marginBottom: "10px",
    },
    formLabel: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
      color: "#333",
    },
    formInput: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
    },
    formButtons: {
      display: "flex",
      gap: "10px",
    },
    addButtonHover: {
      backgroundColor: "#0056b3",
    },
    editButtonHover: {
      backgroundColor: "#0056b3",
    },
    deleteButtonHover: {
      backgroundColor: "#c82333",
    },
    saveButtonHover: {
      backgroundColor: "#218838",
    },
    cancelButtonHover: {
      backgroundColor: "#545b62",
    },
    productCount: {
      backgroundColor: "#e9ecef",
      color: "#495057",
      padding: "2px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "bold",
      marginLeft: "8px",
    },
    loadingMessage: {
      textAlign: "center",
      padding: "40px",
      color: "#666",
      fontSize: "16px",
    },
  };

  const handleButtonHover = (e, hoverStyle) => {
    e.target.style.backgroundColor = hoverStyle.backgroundColor;
  };

  const handleButtonLeave = (e, originalColor) => {
    e.target.style.backgroundColor = originalColor;
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingMessage}>Loading product categories...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Product Categories</h1>

      {/* Statistics */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.totalCategories}</div>
          <div style={styles.statLabel}>Total Categories</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.totalProducts}</div>
          <div style={styles.statLabel}>Total Products</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{stats.averageProducts}</div>
          <div style={styles.statLabel}>Avg Products/Category</div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div
          style={{
            ...styles.message,
            ...(message.includes("successfully")
              ? styles.successMessage
              : styles.errorMessage),
          }}
        >
          {message}
        </div>
      )}

      {/* Controls */}
      <div style={styles.controlsContainer}>
        <input
          type='text'
          placeholder='Search categories...'
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span style={{ color: "#666", fontSize: "14px" }}>
          Showing {filteredCategories.length} of {categories.length} categories
        </span>
      </div>

      <div style={styles.categoriesContainer}>
        {/* Add Category Button */}
        {!showAddForm ? (
          <button
            style={styles.addButton}
            onMouseOver={(e) => handleButtonHover(e, styles.addButtonHover)}
            onMouseOut={(e) =>
              handleButtonLeave(e, styles.addButton.backgroundColor)
            }
            onClick={() => setShowAddForm(true)}
          >
            Add Category +
          </button>
        ) : (
          <div style={styles.addForm}>
            <h3 style={{ marginBottom: "15px", color: "#333" }}>
              Add New Category
            </h3>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Category Title:</label>
              <input
                type='text'
                style={styles.formInput}
                value={newCategory.title}
                onChange={(e) => setNewCategory({ title: e.target.value })}
                placeholder='Enter category title'
                autoFocus
              />
            </div>
            <div style={styles.formButtons}>
              <button
                style={styles.saveButton}
                onMouseOver={(e) =>
                  handleButtonHover(e, styles.saveButtonHover)
                }
                onMouseOut={(e) =>
                  handleButtonLeave(e, styles.saveButton.backgroundColor)
                }
                onClick={handleAddCategory}
              >
                <SaveIcon /> Add Category
              </button>
              <button
                style={styles.cancelButton}
                onMouseOver={(e) =>
                  handleButtonHover(e, styles.cancelButtonHover)
                }
                onMouseOut={(e) =>
                  handleButtonLeave(e, styles.cancelButton.backgroundColor)
                }
                onClick={handleCancelAdd}
              >
                <CancelIcon /> Cancel
              </button>
            </div>
          </div>
        )}

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader} onClick={handleSort}>
                <div style={styles.sortHeader}>
                  Serial Number {sortOrder === "asc" ? "↑" : "↓"}
                </div>
              </th>
              <th style={styles.tableHeader}>Title</th>
              <th style={styles.tableHeader}>Products</th>
              <th style={styles.tableHeader}>Created At</th>
              <th style={styles.tableHeader}>Operate</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id}>
                <td style={styles.tableCell}>{category.id}</td>
                <td style={styles.tableCell}>
                  {editingCategory === category.id ? (
                    <input
                      type='text'
                      style={styles.formInput}
                      value={editForm.title}
                      onChange={(e) => setEditForm({ title: e.target.value })}
                      autoFocus
                    />
                  ) : (
                    category.title
                  )}
                </td>
                <td style={styles.tableCell}>
                  <span style={styles.productCount}>
                    {category.productCount} products
                  </span>
                </td>
                <td style={styles.tableCell}>{category.createdAt}</td>
                <td style={styles.operateCell}>
                  {editingCategory === category.id ? (
                    <>
                      <button
                        style={styles.saveButton}
                        onMouseOver={(e) =>
                          handleButtonHover(e, styles.saveButtonHover)
                        }
                        onMouseOut={(e) =>
                          handleButtonLeave(
                            e,
                            styles.saveButton.backgroundColor
                          )
                        }
                        onClick={() => handleSaveEdit(category.id)}
                        title='Save'
                      >
                        <SaveIcon />
                      </button>
                      <button
                        style={styles.cancelButton}
                        onMouseOver={(e) =>
                          handleButtonHover(e, styles.cancelButtonHover)
                        }
                        onMouseOut={(e) =>
                          handleButtonLeave(
                            e,
                            styles.cancelButton.backgroundColor
                          )
                        }
                        onClick={handleCancelEdit}
                        title='Cancel'
                      >
                        <CancelIcon />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        style={styles.editButton}
                        onMouseOver={(e) =>
                          handleButtonHover(e, styles.editButtonHover)
                        }
                        onMouseOut={(e) =>
                          handleButtonLeave(
                            e,
                            styles.editButton.backgroundColor
                          )
                        }
                        onClick={() => handleEdit(category)}
                        title='Edit'
                      >
                        <EditIcon />
                      </button>

                      <button
                        style={styles.deleteButton}
                        onMouseOver={(e) =>
                          handleButtonHover(e, styles.deleteButtonHover)
                        }
                        onMouseOut={(e) =>
                          handleButtonLeave(
                            e,
                            styles.deleteButton.backgroundColor
                          )
                        }
                        onClick={() =>
                          handleDelete(category.id, category.title)
                        }
                        title='Delete'
                      >
                        <DeleteIcon />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCategories.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            {searchTerm
              ? "No categories found matching your search"
              : "No categories found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
