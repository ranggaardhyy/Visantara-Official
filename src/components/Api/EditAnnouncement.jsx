// src/components/EditAnnouncement.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EditAnnouncement = ({ announcement, onSuccess, onError, refreshList, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    created_by: "",
  });

  useEffect(() => {
    if (announcement) {
      setFormData({
        title: announcement.title,
        content: announcement.content,
        image: announcement.image || "", // gunakan data gambar yang sudah ada
        created_by: announcement.created_by,
      });
    }
  }, [announcement]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Selalu kirim formData sebagai JSON
    const payload = JSON.stringify(formData);
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await fetch(`http://localhost:5000/api/announcements/${announcement.id}`, {
        method: "PUT",
        headers,
        body: payload,
      });

      // Debug: cetak response mentah
      const text = await response.text();
      console.log("Response text:", text);
      let result;
      try {
        result = JSON.parse(text);
      } catch (parseError) {
        console.error("Parsing error:", parseError);
        throw new Error("Response is not valid JSON");
      }

      if (response.ok) {
        onSuccess && onSuccess("Announcement updated successfully!");
        refreshList && refreshList();
      } else {
        onError && onError(result.message || "Failed to update announcement");
      }
    } catch (error) {
      onError && onError("Error: " + error.message);
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
        value={formData.title}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <textarea
        name="content"
        placeholder="Isi"
        value={formData.content}
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
        value={formData.created_by}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <div style={styles.buttonGroup}>
        <button type="submit" style={styles.submitButton}>
          Save Changes
        </button>
        <button type="button" style={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
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
  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
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
  cancelButton: {
    padding: "12px 20px",
    backgroundColor: "#aaa",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#111",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default EditAnnouncement;