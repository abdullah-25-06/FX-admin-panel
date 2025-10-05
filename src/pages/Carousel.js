import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [carousels, setCarousels] = useState([
    {
      id: 11,
      sorting: 0,
      title: "Carousel 1",
      picture: "",
      state: "Enable",
      description: "",
      link: "",
    },
    {
      id: 1,
      sorting: 1,
      title: "Carousel 2",
      picture: "",
      state: "Enable",
      description: "",
      link: "",
    },
    {
      id: 2,
      sorting: 2,
      title: "Carousel 3",
      picture: "",
      state: "Enable",
      description: "",
      link: "",
    },
    {
      id: 12,
      sorting: 5,
      title: "Carousel 4",
      picture: "",
      state: "Enable",
      description: "",
      link: "",
    },
  ]);

  const [editingCarousel, setEditingCarousel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("All");

  // Load carousels from localStorage on component mount
  useEffect(() => {
    const savedCarousels = localStorage.getItem("carouselSettings");
    if (savedCarousels) {
      try {
        const parsedCarousels = JSON.parse(savedCarousels);
        setCarousels(parsedCarousels);
      } catch (error) {
        console.error("Error loading saved carousels:", error);
      }
    }
  }, []);

  // Save carousels to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("carouselSettings", JSON.stringify(carousels));
  }, [carousels]);

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

  const SearchIcon = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
    </svg>
  );

  const handleAddCarousel = () => {
    const newCarousel = {
      id: Date.now(), // Use timestamp for unique ID
      sorting:
        carousels.length > 0
          ? Math.max(...carousels.map((c) => c.sorting)) + 1
          : 0,
      title: "New Carousel",
      picture: "",
      state: "Enable",
      description: "",
      link: "",
    };
    setCarousels([...carousels, newCarousel]);
  };

  const handleEdit = (carousel) => {
    setEditingCarousel({ ...carousel });
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingCarousel) {
      const updatedCarousels = carousels.map((carousel) =>
        carousel.id === editingCarousel.id ? editingCarousel : carousel
      );
      setCarousels(updatedCarousels.sort((a, b) => a.sorting - b.sorting));
      setIsModalOpen(false);
      setEditingCarousel(null);
    }
  };

  const handleCancelEdit = () => {
    setIsModalOpen(false);
    setEditingCarousel(null);
  };

  const handleDelete = (carouselId) => {
    if (window.confirm(`Are you sure you want to delete this carousel?`)) {
      const updatedCarousels = carousels.filter(
        (carousel) => carousel.id !== carouselId
      );
      setCarousels(updatedCarousels);
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

  const handlePictureUpload = (event, carouselId) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedCarousels = carousels.map((carousel) =>
          carousel.id === carouselId
            ? { ...carousel, picture: e.target.result }
            : carousel
        );
        setCarousels(updatedCarousels);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = (carouselId) => {
    const updatedCarousels = carousels.map((carousel) =>
      carousel.id === carouselId ? { ...carousel, picture: "" } : carousel
    );
    setCarousels(updatedCarousels);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const oldIndex = e.dataTransfer.getData("text/plain");
    const reorderedCarousels = [...carousels];
    const [movedCarousel] = reorderedCarousels.splice(oldIndex, 1);
    reorderedCarousels.splice(newIndex, 0, movedCarousel);

    // Update sorting numbers based on new order
    const updatedCarousels = reorderedCarousels.map((carousel, index) => ({
      ...carousel,
      sorting: index,
    }));

    setCarousels(updatedCarousels);
  };

  // Filter carousels based on search and state filter
  const filteredCarousels = carousels.filter((carousel) => {
    const matchesSearch =
      carousel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carousel.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState =
      filterState === "All" || carousel.state === filterState;
    return matchesSearch && matchesState;
  });

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      flexDirection: "column",
      gap: "15px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      margin: "0",
    },
    controls: {
      display: "flex",
      gap: "15px",
      width: "100%",
      flexDirection: "column",
    },
    searchContainer: {
      position: "relative",
      width: "100%",
    },
    searchInput: {
      width: "100%",
      padding: "10px 40px 10px 12px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      fontSize: "14px",
    },
    searchIcon: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#666",
    },
    filterSelect: {
      padding: "10px 12px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      fontSize: "14px",
      backgroundColor: "white",
      width: "100%",
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
      cursor: "pointer",
    },
    imageContainer: {
      position: "relative",
      display: "inline-block",
    },
    imageActions: {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      display: "flex",
      gap: "2px",
    },
    smallButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      fontSize: "10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    // Modal Styles
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "90%",
      maxWidth: "500px",
      maxHeight: "90vh",
      overflowY: "auto",
    },
    modalTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    formGroup: {
      marginBottom: "20px",
    },
    formLabel: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "600",
      color: "#333",
    },
    formInput: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    textArea: {
      minHeight: "80px",
      resize: "vertical",
    },
    modalActions: {
      display: "flex",
      gap: "10px",
      justifyContent: "flex-end",
      marginTop: "20px",
    },
    cancelButton: {
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    },
    saveButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    },
    dragHandle: {
      cursor: "grab",
      padding: "8px",
      color: "#666",
    },
    rowDragging: {
      backgroundColor: "#f8f9fa",
    },
  };

  // Media queries for responsive design
  if (window.matchMedia("(min-width: 768px)").matches) {
    styles.header.flexDirection = "row";
    styles.controls.flexDirection = "row";
    styles.controls.width = "auto";
    styles.searchContainer.width = "300px";
    styles.filterSelect.width = "150px";
    styles.addButton.width = "auto";
  }

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
        <div style={styles.controls}>
          <div style={styles.searchContainer}>
            <input
              type='text'
              placeholder='Search carousels...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <div style={styles.searchIcon}>
              <SearchIcon />
            </div>
          </div>
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            style={styles.filterSelect}
          >
            <option value='All'>All States</option>
            <option value='Enable'>Enabled</option>
            <option value='Disable'>Disabled</option>
          </select>
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
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sort</th>
              <th style={styles.tableHeader}>Sorting</th>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Title</th>
              <th style={styles.tableHeader}>Picture</th>
              <th style={styles.tableHeader}>State</th>
              <th style={styles.tableHeader}>Operate</th>
            </tr>
          </thead>
          <tbody>
            {filteredCarousels.map((carousel, index) => (
              <tr
                key={carousel.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <td style={styles.tableCell}>
                  <div style={styles.dragHandle}>⋮⋮</div>
                </td>
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
                    <div style={styles.imageContainer}>
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
                      <div style={styles.imageActions}>
                        <button
                          style={styles.smallButton}
                          onClick={() => handleRemovePicture(carousel.id)}
                          title='Remove image'
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label style={styles.imagePlaceholder}>
                      <ImageIcon />
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => handlePictureUpload(e, carousel.id)}
                        style={{ display: "none" }}
                      />
                    </label>
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
                    onClick={() => handleEdit(carousel)}
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

        {filteredCarousels.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <p>No carousels found. Click "Add carousel+" to create one.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingCarousel && (
        <div style={styles.modalOverlay} onClick={handleCancelEdit}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Edit Carousel</h2>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Title</label>
              <input
                type='text'
                value={editingCarousel.title}
                onChange={(e) =>
                  setEditingCarousel({
                    ...editingCarousel,
                    title: e.target.value,
                  })
                }
                style={styles.formInput}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Description</label>
              <textarea
                value={editingCarousel.description}
                onChange={(e) =>
                  setEditingCarousel({
                    ...editingCarousel,
                    description: e.target.value,
                  })
                }
                style={{ ...styles.formInput, ...styles.textArea }}
                placeholder='Enter carousel description...'
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Link URL</label>
              <input
                type='url'
                value={editingCarousel.link}
                onChange={(e) =>
                  setEditingCarousel({
                    ...editingCarousel,
                    link: e.target.value,
                  })
                }
                style={styles.formInput}
                placeholder='https://example.com'
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Sorting</label>
              <input
                type='number'
                value={editingCarousel.sorting}
                onChange={(e) =>
                  setEditingCarousel({
                    ...editingCarousel,
                    sorting: parseInt(e.target.value) || 0,
                  })
                }
                style={styles.formInput}
                min='0'
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>State</label>
              <select
                value={editingCarousel.state}
                onChange={(e) =>
                  setEditingCarousel({
                    ...editingCarousel,
                    state: e.target.value,
                  })
                }
                style={styles.formInput}
              >
                <option value='Enable'>Enable</option>
                <option value='Disable'>Disable</option>
              </select>
            </div>

            <div style={styles.modalActions}>
              <button style={styles.cancelButton} onClick={handleCancelEdit}>
                Cancel
              </button>
              <button style={styles.saveButton} onClick={handleSaveEdit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
