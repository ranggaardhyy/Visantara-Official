import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnnouncementForm = ({ onSubmit, editingAnnouncement, setEditingAnnouncement }) => {
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    content: "",
    image: "",
    created_by: "",
  });

  useEffect(() => {
    if (editingAnnouncement) {
      setFormData(editingAnnouncement);
    } else {
      setFormData({ id: null, title: "", content: "", image: "", created_by: "" });
    }
  }, [editingAnnouncement]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ id: null, title: "", content: "", image: "", created_by: "" });
  };

  const handleCancel = () => {
    setEditingAnnouncement(null);
    setFormData({ id: null, title: "", content: "", image: "", created_by: "" });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      style={styles.form}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 style={styles.title}>{editingAnnouncement ? "Edit Announcement" : "Add Announcement"}</h3>
      <input
        type="text"
        name="title"
        placeholder="Announcement Title"
        value={formData.title}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <textarea
        name="content"
        placeholder="Announcement Content"
        value={formData.content}
        onChange={handleChange}
        style={styles.textarea}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL (optional)"
        value={formData.image}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="text"
        name="created_by"
        placeholder="Created By (username)"
        value={formData.created_by}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <div style={styles.buttonGroup}>
        <motion.button
          type="submit"
          style={styles.submitButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {editingAnnouncement ? "Update" : "Add"}
        </motion.button>
        {editingAnnouncement && (
          <motion.button
            type="button"
            onClick={handleCancel}
            style={styles.cancelButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        )}
      </div>
    </motion.form>
  );
};

const styles = {
  form: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "25px",
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#333",
  },
  input: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
  },
  textarea: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    resize: "vertical",
    minHeight: "80px",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
  submitButton: {
    padding: "12px 20px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "12px 20px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default AnnouncementForm;