// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "../../components/layout/Hero";
import Footer from "../../components/layout/Footer";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("announcement");
  const [message, setMessage] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  // Fungsi berpindah tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMessage("");
    if (tab === "announcement") {
      loadAnnouncements();
      setIsEditing(false);
      setEditingAnnouncement(null);
    }
  };

  // Mengambil data pengumuman dari backend
  const loadAnnouncements = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/announcements");
      const data = await res.json();
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "announcement") {
      loadAnnouncements();
    }
  }, [activeTab]);

  // Callback untuk edit submission yang akan dipanggil dari EditAnnouncement.jsx
  const handleEditSubmit = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/announcements/${editingAnnouncement.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage("Announcement updated successfully!");
        setIsEditing(false);
        setEditingAnnouncement(null);
        loadAnnouncements();
      } else {
        setMessage(data.message || "Failed to update announcement");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  // Fungsi untuk mengaktifkan mode edit
  const handleEditAnnouncement = (announcement) => {
    setIsEditing(true);
    setEditingAnnouncement(announcement);
  };

  // Callback untuk add announcement
  const handleAddSuccess = (msg) => {
    setMessage(msg);
    loadAnnouncements();
  };

  const handleAddError = (msg) => {
    setMessage(msg);
  };

  // Member form handling (inline)
  const [memberData, setMemberData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleMemberChange = (e) => {
    setMemberData({
      ...memberData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Member added successfully!");
        setMemberData({
          name: "",
          email: "",
          password: "",
          role: "user",
        });
      } else {
        setMessage(data.message || "Failed to add member");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div style={pageStyles.pageContainer}>
      {/* Integrasi Hero */}
      <Hero>
        <div style={pageStyles.heroContent}>
          <h1 style={pageStyles.heroTitle}>Admin Dashboard</h1>
        </div>
      </Hero>

      {/* Dashboard Container */}
      <div style={styles.dashboardContainer}>
        {/* Sidebar */}
        <motion.div
          style={styles.sidebar}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.button
            style={{
              ...styles.sidebarButton,
              backgroundColor:
                activeTab === "announcement" ? "#ffcc00" : "transparent",
              color: activeTab === "announcement" ? "#111" : "#fff",
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleTabChange("announcement")}
          >
            Add Announcement
          </motion.button>
          <motion.button
            style={{
              ...styles.sidebarButton,
              backgroundColor: activeTab === "members" ? "#ffcc00" : "transparent",
              color: activeTab === "members" ? "#111" : "#fff",
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleTabChange("members")}
          >
            Add Members
          </motion.button>
        </motion.div>

        {/* Content Area */}
        <motion.div
          style={styles.contentArea}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {activeTab === "announcement" ? (
            <>
              {isEditing && editingAnnouncement ? (
                <EditAnnouncement
                  announcement={editingAnnouncement}
                  onSuccess={handleEditSubmit}
                  onError={(msg) => setMessage(msg)}
                  refreshList={loadAnnouncements}
                  onCancel={() => {
                    setIsEditing(false);
                    setEditingAnnouncement(null);
                  }}
                />
              ) : (
                <AddAnnouncement
                  onSuccess={handleAddSuccess}
                  onError={handleAddError}
                />
              )}

              {/* Daftar Pengumuman */}
              <div style={styles.listContainer}>
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <motion.div
                      key={announcement.id}
                      style={styles.announcementCard}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={styles.cardImageContainer}>
                        {announcement.image ? (
                          <img
                            src={announcement.image}
                            alt="Announcement"
                            style={styles.cardImage}
                          />
                        ) : (
                          <div style={styles.cardPlaceholder}>No Image</div>
                        )}
                      </div>
                      <div style={styles.cardContent}>
                        <h3 style={styles.cardTitle}>{announcement.title}</h3>
                        <p style={styles.cardText}>{announcement.content}</p>
                        <p style={styles.cardInfo}>
                          {announcement.created_by} |{" "}
                          {announcement.created_at
                            ? new Date(announcement.created_at).toLocaleString()
                            : "Unknown Date"}
                        </p>
                        <div style={styles.cardButtons}>
                          <button
                            style={styles.editButton}
                            onClick={() => handleEditAnnouncement(announcement)}
                          >
                            Edit
                          </button>
                          {/* Gunakan komponen DelAnnouncement untuk menghapus */}
                          <DelAnnouncement
                            announcementId={announcement.id}
                            onSuccess={(msg) => {
                              setMessage(msg);
                              loadAnnouncements();
                            }}
                            onError={(msg) => setMessage(msg)}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p style={styles.emptyText}>
                    Tidak ada pengumuman untuk ditampilkan.
                  </p>
                )}
              </div>
            </>
          ) : (
            <motion.div
              key="members"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={styles.formContainer}
            >
              <h2 style={styles.formTitle}>Add Members</h2>
              <form style={styles.form} onSubmit={handleMemberSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nama"
                  style={styles.input}
                  value={memberData.name}
                  onChange={handleMemberChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  style={styles.input}
                  value={memberData.email}
                  onChange={handleMemberChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  style={styles.input}
                  value={memberData.password}
                  onChange={handleMemberChange}
                  required
                />
                <select
                  name="role"
                  style={styles.input}
                  value={memberData.role}
                  onChange={handleMemberChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit" style={styles.submitButton}>
                  Submit Member
                </button>
              </form>
            </motion.div>
          )}
          {message && (
            <motion.div
              style={styles.message}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

const pageStyles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
  },
  heroContent: {
    textAlign: "center",
    color: "#fff",
    padding: "2rem",
  },
  heroTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
};

const styles = {
  dashboardContainer: {
    display: "flex",
    minHeight: "calc(100vh - 40vh)",
    backgroundColor: "#121212",
    color: "#fff",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#222",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    zIndex: 2,
    position: "relative",
    pointerEvents: "auto",
  },
  sidebarButton: {
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  contentArea: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#1e1e1e",
    position: "relative",
    zIndex: 1,
  },
  formContainer: {
    backgroundColor: "#222",
    borderRadius: "8px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  formTitle: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffcc00",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
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
  message: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "16px",
    color: "#ffcc00",
  },
  listContainer: {
    marginTop: "30px",
  },
  announcementCard: {
    display: "flex",
    backgroundColor: "#222",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    marginBottom: "20px",
  },
  cardImageContainer: {
    flex: "0 0 40%",
    backgroundColor: "#333",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#444",
    color: "#ccc",
    fontSize: "14px",
  },
  cardContent: {
    flex: "1",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "8px",
  },
  cardText: {
    fontSize: "1rem",
    color: "#ccc",
    marginBottom: "8px",
  },
  cardInfo: {
    fontSize: "0.9rem",
    color: "#aaa",
  },
  cardButtons: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#FF5733",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  emptyText: {
    fontStyle: "italic",
    color: "#aaa",
    textAlign: "center",
  },
};

export default AdminDashboard;