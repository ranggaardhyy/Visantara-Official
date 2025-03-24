import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function UserForm({ onSubmit, editingUser, setEditingUser }) {
  const [user, setUser] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ name: "", email: "", role: "" });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      style={styles.form}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 style={styles.title}>{editingUser ? "Edit User" : "Add User"}</h3>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        required
        style={styles.input}
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
        style={styles.input}
      />
      <select
        name="role"
        value={user.role}
        onChange={handleChange}
        required
        style={styles.select}
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <motion.button
        type="submit"
        style={styles.submitButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {editingUser ? "Update" : "Add"}
      </motion.button>
      {editingUser && (
        <motion.button
          type="button"
          style={styles.cancelButton}
          onClick={() => setEditingUser(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </motion.button>
      )}
    </motion.form>
  );
}

const styles = {
  form: {
    maxWidth: "400px",
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
  select: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    background: "#fff",
  },
  submitButton: {
    padding: "12px",
    background: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "12px",
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default UserForm;
