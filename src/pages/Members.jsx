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

// Fungsi untuk memisahkan nama pengguna dan nama dalam tanda kurung
const nickMC = (username) => {
  const regex = /\(([^)]+)\)/;
  const match = username.match(regex);
  const mainUsername = username.split("(")[0].trim();
  const nickname = match ? match[1] : null;
  return { mainUsername, nickname };
};

// Fungsi untuk mendapatkan avatar premium.
// Jika properti isPremium bernilai true atau terdapat nickname (format main(nickname)),
// maka URL akan menggunakan minepic.org. Jika terdapat nickname, maka digunakan nilai nickname,
// jika tidak, digunakan mainUsername.
const getAvatarUrl = (user) => {
  const { mainUsername, nickname } = nickMC(user.username);
  if (user.isPremium || nickname) {
    // Gunakan nickname jika ada, jika tidak gunakan mainUsername
    const avatarUsername = nickname ? nickname : mainUsername;
    return `https://minepic.org/avatar/128/${avatarUsername}`;
  }
  // Jika akun tidak premium, gunakan avatar default berdasarkan skin
  return user.skin === "Alex" ? alexAvatar : steveAvatar;
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
            username: "ZiwoxYT", // tidak ada tanda kurung, dianggap non-premium jika isPremium false
            role: "Moderator",
            isPremium: true, // Karena isPremium true, maka avatar premium akan dipakai
            skin: "Alex",
          },
          {
            username: "nonPremiumUser",
            role: "Administrator",
            IsPremium: true, // Tidak premium, gunakan avatar default
            skin: "Steve",
          },
        ];
        setStaffMembers([...staff, ...manualProfiles]);
      } catch (error) {
        console.error("Error fetching members:", error);
        const manualProfiles = [
          {
            username: "Alwisusilo(Alwisusilo)", // premium: nickname sama dengan mainUsername
            role: "CEO",
            isPremium: true,
            skin: "Steve",
          },
          {
            username: "Starfruit(Senn0_)", // premium: terdapat nickname yang berbeda
            role: "Supervisor",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "Graymontt(Graymontt)",
            role: "Supervisor",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "Jukius(JukianaAzura)",
            role: "Supervisor",
            IsPremium: true,
            skin: "Steve",
          },          {
            username: "AmatsukaYuto(UtoYuto)",
            role: "Supervisor",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "AlanDinos(AlanDinos)",
            role: "Supervisor",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "Mutti(shanskira)",
            role: "Supervisor",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "Ray28s(Ray28s)",
            role: "Developer",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "Sy4dd(Sy4dd)",
            role: "Developer",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "64sein(64sein)",
            role: "Developer",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "Twelve(Twelve)",
            role: "Developer",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "AGoldMach(AGoldMach)",
            role: "Administrator",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "ZeroTheBoys(ZeroTheBoys)",
            role: "Administrator",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "Vinn(Vinncenz_)",
            role: "Administrator",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "Itsumaqydesu(.Itsumaqydesu)",
            role: "Community Manager",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "Polivin4875(.Polivin4875)",
            role: "Moderator",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "Rafli1123(Rafli1123)",
            role: "Moderator",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "Boenyy(Helper)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "Syawmoon(Syawmoon)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: ".Novalgaming2512(.Novalgaming2512)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "PIXELS19(PIXELS19)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: ".Dartnes9440(.Dartnes9440)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "SyafrielAD(SyafrielAD)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: ".NandaPutra7(.NandaPutra7)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "ArcadianFish(ArcadianFish)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "mervynn(mervynn)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "Kirry(Kirry)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: ".FesGamers(.FesGamers)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "RanggaFauzi(RanggaFauzi)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "ZFRAx(ZFRAx)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: ".PIXXELXL(.PIXXELXL)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "LangNaySKY(LangNaySKY)",
            role: "Helper",
            IsPremium: true,
            skin: "Steve",
          },
          {
            username: "KITLY(KITLY))",
            role: "Helper",
            IsPremium: true,
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

  const filteredByRole =
    selectedGroup === "View All"
      ? filteredStaff
      : filteredStaff.filter((staff) => staff.role === selectedGroup);

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Overview</h2>
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

  // Media Query untuk mobile
  '@media (max-width: 768px)': {
    container: {
      flexDirection: "column",
    },
    sidebar: {
      width: "100%",
      padding: "15px",
      borderRight: "none",
    },
    mainContent: {
      padding: "15px",
    },
    sidebarTitle: {
      fontSize: "16px",
    },
    searchBar: {
      padding: "8px",
      fontSize: "14px",
    },
    staffCard: {
      width: "100%",
      padding: "10px",
      gap: "8px",
    },
    staffAvatar: {
      width: "40px",
      height: "40px",
    },
    staffRole: {
      fontSize: "11px",
    },
    staffName: {
      fontSize: "12px",
    },
    viewAllButton: {
      width: "100%",
      padding: "12px 0",
    },
  },
};

export default Members;
