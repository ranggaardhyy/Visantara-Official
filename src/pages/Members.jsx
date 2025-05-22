import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import steveAvatar from "../assets/images/steve.png";
import alexAvatar from "../assets/images/alex.png";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const nickMC = (username) => {
  const regex = /\(([^)]+)\)/;
  const match = username.match(regex);
  const mainUsername = username.split("(")[0].trim();
  const nickname = match ? match[1] : null;
  return { mainUsername, nickname };
};

const getAvatarUrl = (user) => {
  const { mainUsername, nickname } = nickMC(user.username);
  if (user.isPremium || nickname) {
    const avatarUsername = nickname ? nickname : mainUsername;
    return `https://minepic.org/avatar/128/${avatarUsername}`;
  }
  return user.skin === "Alex" ? alexAvatar : steveAvatar;
};

const roleColors = {
  Owner: "#3498db",
  Administrator: "#d96fbc",
  Developer: "#8e44ad",
  Moderator: "#5dade2",
  Helper: "#58d68d",
};

const roles = ["Owner", "Administrator", "Developer", "Moderator", "Helper"];

export default function Members() {
  const [staffMembers, setStaffMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  useEffect(() => {
    const dummyData = [
      { username: "Clementdav(Clementdav)", role: "Owner", isPremium: true, skin: "Steve" },
      { username: "Theo(7heo_)", role: "Owner", isPremium: true, skin: "Steve" },
      { username: "HnaRay(HnaRay)", role: "Administrator", isPremium: true, skin: "Steve" },
      { username: "Boenyy(Boenyy)", role: "Administrator", isPremium: true, skin: "Steve" },
      { username: "Terbang(Terbang)", role: "Developer", isPremium: true, skin: "Steve" },
      { username: "Shiroha(_Herzon)", role: "Developer", isPremium: true, skin: "Steve" },
      { username: "dawnbuild(dawnbuild)", role: "Developer", isPremium: true, skin: "Steve" },
      { username: "PVPSHINE(PVPSHINE)", role: "Moderator", isPremium: true, skin: "Steve" },
      { username: "Bocil_3l3k(Bocil_3l3k)", role: "Helper", isPremium: true, skin: "Steve" },
      { username: "SyyAnother(SyyAnother)", role: "Helper", isPremium: true, skin: "Steve" },
    ];
    setStaffMembers(dummyData);
  }, []);

  const filteredMembers = staffMembers.filter((member) =>
    member.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRole === "All" || member.role === selectedRole)
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#111", color: "#ccc" }}>
      <div style={{ width: "250px", padding: "20px", backgroundColor: "#1a1a1a", borderRight: "1px solid #222" }}>
        <h2 style={{ color: "#fff" }}>Filter</h2>
        <input
          type="text"
          placeholder="Search..."
          style={{ width: "100%", padding: "8px", marginBottom: "15px", backgroundColor: "#333", color: "#ccc", border: "1px solid #444" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          style={{ width: "100%", padding: "8px", backgroundColor: "#333", color: "#ccc", border: "1px solid #444" }}
        >
          <option value="All">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        <h2 style={{ color: "#fff" }}>Server Staff</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}
        >
          {filteredMembers.map((member) => {
            const { mainUsername, nickname } = nickMC(member.username);
            return (
              <motion.div
                key={member.username}
                style={{
                  backgroundColor: "#1a1a1a",
                  border: `2px solid ${roleColors[member.role] || "#ccc"}`,
                  borderRadius: "8px",
                  padding: "15px",
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={getAvatarUrl(member)}
                  alt={member.username}
                  style={{ width: "50px", height: "50px", borderRadius: "4px" }}
                />
                <div>
                  <p style={{ margin: 0, fontWeight: "bold", color: roleColors[member.role] }}>{member.role}</p>
                  <p style={{ margin: 0 }}>{mainUsername}{nickname ? ` (${nickname})` : ""}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
