import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Impor gambar default dari folder assets
import steveAvatar from "../assets/images/steve.png";
import alexAvatar from "../assets/images/alex.png";

/* Variants untuk animasi Framer Motion (staggered list) */
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Fungsi untuk mendapatkan avatar (menggunakan Alex dan Steve untuk semua)
const getAvatarUrl = (user) => {
  return user.skin === "Alex" ? alexAvatar : steveAvatar;
};

// Fungsi untuk memisahkan nama pengguna dan nama dalam tanda kurung
const nickMC = (username) => {
  const regex = /\(([^)]+)\)/;
  const match = username.match(regex);
  const mainUsername = username.split("(")[0].trim();
  const nickname = match ? match[1] : null;
  return { mainUsername, nickname };
};

function Members() {
  const [staffMembers, setStaffMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("View All");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/members");
        if (!response.ok) throw new Error("Gagal mengambil data anggota");
        const data = await response.json();
        // Filter agar hanya menampilkan pengurus (role selain "member")
        const staff = data.filter(
          (member) => member.role.toLowerCase() !== "member"
        );
        // Tambahkan beberapa profil manual
        const manualProfiles = [
          {
            username: "ZiwoxYT",
            role: "Moderator",
            isPremium: true, // Menggunakan skin premium
            skin: "Alex",
          },
          {
            username: "nonPremiumUser",
            role: "Administrator",
            isPremium: false, // Tidak premium, gunakan avatar default
            skin: "Steve",
          },
        ];
        setStaffMembers([...staff, ...manualProfiles]);
      } catch (error) {
        console.error("Error fetching members:", error);
        const manualProfiles = [
          {
            username: "Alwisusilo(Alwisusilo)",
            role: "CEO",
            isPremium: true,
            skin: "Steve",
          },
          {
            username: "Starfruit(Senn0_)",
            role: "Supervisor",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "Graymontt(Graymontt)",
            role: "Supervisor",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "Jukius(JukianaAzura)",
            role: "Supervisor",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "AmatsukaYuto(UtoYuto)",
            role: "Supervisor",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "AlanDinos(AlanDinos)",
            role: "Supervisor",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "Mutti(shanskira)",
            role: "Supervisor",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "Ray28s(Ray28s)",
            role: "Developer",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "Sy4dd(Sy4dd)",
            role: "Developer",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "64sein(64sein)",
            role: "Developer",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "Twelve(Twelve)",
            role: "Developer",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "AGoldMach(AGoldMach)",
            role: "Administrator",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "Zero(ZeroTheBoys)",
            role: "Administrator",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "Vinn(Vinncenz_)",
            role: "Administrator",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "Itsumaqydesu(.Itsumaqydesu)",
            role: "Community Manager",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "Polivin4875(.Polivin4875)",
            role: "Moderator",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "Rafli1123(Rafli1123)",
            role: "Moderator",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "Boenyy",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "Syawmoon",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: ".Novalgaming2512",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "PIXELS19",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: ".Dartnes9440",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "SyafrielAD",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: ".NandaPutra7",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "ArcadianFish",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "mervynn",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "Kirry",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: ".FesGamers",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "RanggaFauzi",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "ZFRAx",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: ".PIXXELXL",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "LangNaySKY",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },
          {
            username: "KITLY",
            role: "Helper",
            isPremium: false,
            skin: "Steve",
          },                                                                                                                                                                                                                                                                                                                                       
        ];
        setStaffMembers(manualProfiles);
      }
    };

    fetchMembers();
  }, []);

  const filteredStaff = staffMembers.filter((staff) =>
    staff.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredByRole = selectedGroup === "View All"
    ? filteredStaff
    : filteredStaff.filter((staff) => staff.role === selectedGroup);

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
          <select
            id="groupSelect"
            style={styles.select}
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option>View All</option>
            <option>CEO</option>
            <option>Supervisor</option>
            <option>Administrator</option>
            <option>Community Manager</option>
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
          {filteredByRole.length > 0 ? (
            filteredByRole.map((staff) => {
              const { mainUsername, nickname } = nickMC(staff.username);
              return (
                <motion.div
                  key={staff.username}
                  style={styles.staffCard}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={getAvatarUrl(staff)}
                    alt={staff.username}
                    style={styles.staffAvatar}
                  />
                  <div style={styles.staffInfo}>
                    <p style={styles.staffRole}>{staff.role}</p>
                    <p style={styles.staffName}>
                      {mainUsername}
                      {nickname && ` (${nickname})`}
                    </p>
                  </div>
                </motion.div>
              );
            })
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
