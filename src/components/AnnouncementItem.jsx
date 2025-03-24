import React from "react";
import { motion } from "framer-motion";

const AnnouncementItem = ({ announcement, onEdit, onDelete }) => {
  return (
    <motion.div
      style={styles.card}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 style={styles.title}>{announcement.title}</h3>
      <p style={styles.content}>{announcement.content}</p>
      {announcement.image && (
        <img
          src={announcement.image}
          alt={announcement.title}
          style={styles.image}
        />
      )}
      {/* Tombol untuk Admin (edit & delete) */}
      {onEdit && onDelete && (
        <div style={styles.buttonGroup}>
          <button style={styles.editButton} onClick={() => onEdit(announcement)}>
            Edit
          </button>
          <button style={styles.deleteButton} onClick={() => onDelete(announcement.id)}>
            Hapus
          </button>
        </div>
      )}
    </motion.div>
  );
};

const styles = {
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 10px",
    color: "#333",
  },
  content: {
    fontSize: "14px",
    margin: "0 0 10px",
    color: "#555",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: "10px",
    borderRadius: "4px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  editButton: {
    backgroundColor: "#ffc107",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AnnouncementItem;
