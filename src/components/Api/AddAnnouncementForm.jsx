// src/components/Api/AddAnnouncementForm.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const AddAnnouncementForm = ({ onSuccess, onError }) => {
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    content: "",
    image: "",
    created_by: "",
  });

  const handleChange = (e) => {
    setAnnouncementData({
      ...announcementData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAnnouncementData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(announcementData),
      });
      const data = await response.json();
      if (response.ok) {
        onSuccess("Announcement added successfully!");
        setAnnouncementData({
          title: "",
          content: "",
          image: "",
          created_by: "",
        });
      } else {
        onError(data.message || "Failed to add announcement");
      }
    } catch (error) {
      onError("Error: " + error.message);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={styles.form}
    >
      <input
        type="text"
        name="title"
        placeholder="Judul"
        value={announcementData.title}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <textarea
        name="content"
        placeholder="Isi"
        value={announcementData.content}
        onChange={handleChange}
        style={{ ...styles.input, height: "100px" }}
        required
      />
      <input
        type="file"
        accept="image/*"
        name="image"
        onChange={handleImageUpload}
        style={styles.input}
      />
      <input
        type="text"
        name="created_by"
        placeholder="Pengupload"
        value={announcementData.created_by}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <button type="submit" style={styles.submitButton}>
        Submit Announcement
      </button>
    </motion.form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    backgroundColor: "#222",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "16px",
  },
  submitButton: {
    padding: "12px 20px",
    backgroundColor: "#ffcc00",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#111",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default AddAnnouncementForm;
