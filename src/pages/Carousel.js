import React, { useState } from "react";

const Carousel = () => {
  const [carousels, setCarousels] = useState([
    {
      id: 11,
      sorting: 0,
      title: "1",
      picture: "",
      state: "Enable",
    },
    {
      id: 1,
      sorting: 1,
      title: "1",
      picture: "",
      state: "Enable",
    },
    {
      id: 2,
      sorting: 2,
      title: "2",
      picture: "",
      state: "Enable",
    },
    {
      id: 12,
      sorting: 5,
      title: "5",
      picture: "",
      state: "Enable",
    },
  ]);

  // SVG Icons
  const EditIcon = () => (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
    </svg>
  );

  const DeleteIcon = () => (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
    </svg>
  );

  const AddIcon = () => (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='currentColor'
      style={{ marginRight: "8px" }}
    >
      <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
    </svg>
  );

  const ImageIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' />
    </svg>
  );

  const handleAddCarousel = () => {
    const newCarousel = {
      id: Math.max(...carousels.map((c) => c.id)) + 1,
      sorting: carousels.length,
      title: "New Carousel",
      picture: "",
      state: "Enable",
    };
    setCarousels([...carousels, newCarousel]);
    alert("New carousel added. Please edit to add details.");
  };

  const handleEdit = (carouselId) => {
    console.log("Edit carousel:", carouselId);
    alert(`Edit carousel: ${carouselId}`);
  };

  const handleDelete = (carouselId) => {
    if (
      window.confirm(`Are you sure you want to delete carousel ${carouselId}?`)
    ) {
      const updatedCarousels = carousels.filter(
        (carousel) => carousel.id !== carouselId
      );
      setCarousels(updatedCarousels);
      alert(`Carousel ${carouselId} deleted successfully`);
    }
  };

  const handleToggleState = (carouselId) => {
    const updatedCarousels = carousels.map((carousel) =>
      carousel.id === carouselId
        ? {
            ...carousel,
            state: carousel.state === "Enable" ? "Disable" : "Enable",
          }
        : carousel
    );
    setCarousels(updatedCarousels);
  };

  const handleSortChange = (carouselId, newSorting) => {
    const updatedCarousels = carousels.map((carousel) =>
      carousel.id === carouselId
        ? { ...carousel, sorting: parseInt(newSorting) || 0 }
        : carousel
    );
    setCarousels(updatedCarousels.sort((a, b) => a.sorting - b.sorting));
  };

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      flexDirection: "column",
      gap: "15px",
      "@media (min-width: 768px)": {
        flexDirection: "row",
        gap: "0",
      },
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      margin: "0",
    },
    addButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.2s",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "center",
      "@media (min-width: 768px)": {
        width: "auto",
      },
    },
    addButtonHover: {
      backgroundColor: "#0056b3",
    },
    tableContainer: {
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "600px",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      padding: "12px 8px",
      textAlign: "left",
      fontWeight: "bold",
      color: "#333",
      borderBottom: "2px solid #dee2e6",
      fontSize: "14px",
    },
    tableCell: {
      padding: "12px 8px",
      borderBottom: "1px solid #dee2e6",
      color: "#555",
      fontSize: "14px",
    },
    operateCell: {
      padding: "12px 8px",
      borderBottom: "1px solid #dee2e6",
      display: "flex",
      gap: "8px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    editButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      transition: "background-color 0.2s",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      transition: "background-color 0.2s",
    },
    stateButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      transition: "background-color 0.2s",
    },
    stateButtonDisabled: {
      backgroundColor: "#6c757d",
    },
    stateButtonHover: {
      backgroundColor: "#218838",
    },
    stateButtonDisabledHover: {
      backgroundColor: "#5a6268",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    deleteButtonHover: {
      backgroundColor: "#c82333",
    },
    sortInput: {
      width: "60px",
      padding: "4px 8px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "12px",
      textAlign: "center",
    },
    imagePlaceholder: {
      width: "40px",
      height: "40px",
      backgroundColor: "#f8f9fa",
      border: "1px dashed #ddd",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#666",
      fontSize: "12px",
    },
  };

  const handleButtonHover = (e, hoverStyle) => {
    e.target.style.backgroundColor = hoverStyle.backgroundColor;
  };

  const handleButtonLeave = (e, originalColor) => {
    e.target.style.backgroundColor = originalColor;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Carousel Management</h1>
        <button
          style={styles.addButton}
          onMouseOver={(e) => handleButtonHover(e, styles.addButtonHover)}
          onMouseOut={(e) =>
            handleButtonLeave(e, styles.addButton.backgroundColor)
          }
          onClick={handleAddCarousel}
        >
          <AddIcon />
          Add carousel+
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sorting</th>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>title</th>
              <th style={styles.tableHeader}>picture</th>
              <th style={styles.tableHeader}>state</th>
              <th style={styles.tableHeader}>operate</th>
            </tr>
          </thead>
          <tbody>
            {carousels.map((carousel) => (
              <tr key={carousel.id}>
                <td style={styles.tableCell}>
                  <input
                    type='number'
                    value={carousel.sorting}
                    onChange={(e) =>
                      handleSortChange(carousel.id, e.target.value)
                    }
                    style={styles.sortInput}
                    min='0'
                  />
                </td>
                <td style={styles.tableCell}>{carousel.id}</td>
                <td style={styles.tableCell}>{carousel.title}</td>
                <td style={styles.tableCell}>
                  {carousel.picture ? (
                    <img
                      src={carousel.picture}
                      alt={carousel.title}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <div style={styles.imagePlaceholder}>
                      <ImageIcon />
                    </div>
                  )}
                </td>
                <td style={styles.tableCell}>
                  <button
                    style={{
                      ...styles.stateButton,
                      ...(carousel.state === "Disable"
                        ? styles.stateButtonDisabled
                        : {}),
                    }}
                    onMouseOver={(e) =>
                      handleButtonHover(
                        e,
                        carousel.state === "Disable"
                          ? styles.stateButtonDisabledHover
                          : styles.stateButtonHover
                      )
                    }
                    onMouseOut={(e) =>
                      handleButtonLeave(
                        e,
                        carousel.state === "Disable"
                          ? styles.stateButtonDisabled.backgroundColor
                          : styles.stateButton.backgroundColor
                      )
                    }
                    onClick={() => handleToggleState(carousel.id)}
                  >
                    {carousel.state}
                  </button>
                </td>
                <td style={styles.operateCell}>
                  <button
                    style={styles.editButton}
                    onMouseOver={(e) =>
                      handleButtonHover(e, styles.buttonHover)
                    }
                    onMouseOut={(e) =>
                      handleButtonLeave(e, styles.editButton.backgroundColor)
                    }
                    onClick={() => handleEdit(carousel.id)}
                    title='Revise'
                  >
                    <EditIcon />
                  </button>

                  <button
                    style={styles.deleteButton}
                    onMouseOver={(e) =>
                      handleButtonHover(e, styles.deleteButtonHover)
                    }
                    onMouseOut={(e) =>
                      handleButtonLeave(e, styles.deleteButton.backgroundColor)
                    }
                    onClick={() => handleDelete(carousel.id)}
                    title='Delete'
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {carousels.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <p>No carousels found. Click "Add carousel+" to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
