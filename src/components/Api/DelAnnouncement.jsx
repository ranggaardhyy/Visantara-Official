// src/components/DeleteAnnouncement.jsx
import React from "react";

const DeleteAnnouncement = ({ announcementId, onSuccess, onError, refreshList }) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/announcements/${announcementId}`, {
        method: "DELETE",
      });
      if (response.status === 204) {
        onSuccess && onSuccess("Announcement deleted successfully!");
        refreshList && refreshList();
      } else {
        const data = await response.json();
        onError && onError(data.message || "Failed to delete announcement");
      }
    } catch (error) {
      onError && onError("Error: " + error.message);
    }
  };

  return (
    <button onClick={handleDelete} style={styles.deleteButton}>
      Delete
    </button>
  );
};

const styles = {
  deleteButton: {
    backgroundColor: "#FF5733",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default DeleteAnnouncement;