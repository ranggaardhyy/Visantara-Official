import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";

/* Variants untuk animasi Framer Motion (staggered list) */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function Members() {
  const [staffMembers, setStaffMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/members");
        if (!response.ok) throw new Error("Gagal mengambil data anggota");
        const data = await response.json();
        // Hanya tampilkan pengurus (role selain "member")
        const staff = data.filter(
          (member) => member.role.toLowerCase() !== "member"
        );
        setStaffMembers(staff);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const filteredStaff = staffMembers.filter((staff) =>
    staff.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Overview</h2>
        <ul style={styles.sidebarList}>
          <li style={styles.sidebarItem}>
            <span style={styles.sidebarLinkActive}>Pengurus Server</span>
          </li>
          <li style={styles.sidebarItem}>
            <span style={styles.sidebarLink}>Registered members</span>
          </li>
        </ul>

        <div style={styles.groupSection}>
          <label htmlFor="groupSelect" style={styles.label}>
            View group
          </label>
          <select id="groupSelect" style={styles.select}>
            <option>Group...</option>
            <option>CEO</option>
            <option>Supervisor</option>
            <option>Administrator</option>
            <option>Moderator</option>
            <option>Helper</option>
          </select>
        </div>

        <h3 style={styles.newMembersTitle}>New members</h3>
        <div style={styles.newMembersContainer}>
          <p style={{ fontStyle: "italic", color: "#777", margin: "0" }}>
            Tidak ada anggota baru
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.mainContent}>
        <h2 style={styles.mainTitle}>Pengurus Server</h2>

        {/* Search Bar */}
        <div style={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Search pengurus..."
            style={styles.searchBar}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Daftar Staff dengan animasi stagger */}
        <motion.div
          style={styles.staffContainer}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredStaff.length > 0 ? (
            filteredStaff.map((staff) => (
              <motion.div
                key={staff.username}
                style={styles.staffCard}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={staff.avatarUrl}
                  alt={staff.username}
                  style={styles.staffAvatar}
                />
                <div style={styles.staffInfo}>
                  <p style={styles.staffRole}>{staff.role}</p>
                  <p style={styles.staffName}>{staff.username}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p style={styles.emptyText}>
              Tidak ada pengurus server untuk ditampilkan.
            </p>
          )}
        </motion.div>

        <button style={styles.viewAllButton}>View all</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#111",
    minHeight: "100vh",
    color: "#ccc",
    fontFamily: "Arial, sans-serif",
    paddingTop: "120px", // Jarak dari navbar global (sesuaikan tinggi navbar)
  },
  sidebar: {
    width: "250px",
    minWidth: "250px",
    backgroundColor: "#1a1a1a",
    padding: "20px",
    paddingTop: "30px",
    borderRight: "1px solid #222",
  },
  sidebarTitle: {
    fontSize: "18px",
    color: "#fff",
    marginBottom: "15px",
    borderBottom: "1px solid #333",
    paddingBottom: "5px",
  },
  sidebarList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 20px 0",
  },
  sidebarItem: {
    marginBottom: "10px",
  },
  sidebarLink: {
    color: "#aaa",
    cursor: "pointer",
  },
  sidebarLinkActive: {
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  groupSection: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    color: "#fff",
    marginBottom: "5px",
  },
  select: {
    width: "100%",
    padding: "8px",
    backgroundColor: "#333",
    border: "1px solid #444",
    color: "#ccc",
    borderRadius: "4px",
  },
  newMembersTitle: {
    fontSize: "16px",
    color: "#fff",
    marginBottom: "10px",
    borderBottom: "1px solid #333",
    paddingBottom: "5px",
  },
  newMembersContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  mainContent: {
    flex: 1,
    minWidth: "300px",
    padding: "20px",
  },
  mainTitle: {
    fontSize: "22px",
    color: "#fff",
    marginBottom: "20px",
    borderBottom: "1px solid #333",
    paddingBottom: "5px",
  },
  searchBarContainer: {
    marginBottom: "20px",
  },
  searchBar: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#ccc",
  },
  staffContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
  },
  staffCard: {
    backgroundColor: "#1a1a1a",
    border: "1px solid #222",
    borderRadius: "5px",
    padding: "15px",
    width: "180px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
  staffAvatar: {
    width: "50px",
    height: "50px",
    borderRadius: "4px",
  },
  staffInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  staffRole: {
    color: "#ffcc00",
    margin: 0,
    fontSize: "12px",
  },
  staffName: {
    color: "#ccc",
    margin: 0,
    fontSize: "14px",
  },
  emptyText: {
    color: "#777",
    fontStyle: "italic",
    width: "100%",
    textAlign: "center",
  },
  viewAllButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#ccc",
    border: "1px solid #444",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.2s",
  },
};

export default Members;