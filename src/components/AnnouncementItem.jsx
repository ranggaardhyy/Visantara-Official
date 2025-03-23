import React from "react";
import { motion } from "framer-motion";
import { FaBullhorn } from "react-icons/fa";

const AnnouncementItem = ({ announcement }) => {
  if (!announcement || !announcement.title) {
    return null; // Mencegah error jika data tidak tersedia
  }

  return (
    <motion.div
      style={{
        backgroundColor: "transparent", // ⬅️ Hapus background putih
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        border: "1px solid rgba(255, 255, 255, 0.2)", // ⬅️ Border tipis transparan
        marginBottom: "12px",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Ikon Pengumuman */}
      <div
        style={{
          backgroundColor: "#3B82F6",
          color: "white",
          padding: "14px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0, // Mencegah ikon mengecil saat resize
        }}
      >
        <FaBullhorn size={22} />
      </div>

      {/* Konten Pengumuman */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff", marginBottom: "4px" }}>
          {announcement.title}
        </h3>
        <p style={{ color: "#e0e0e0", fontSize: "14px", lineHeight: "1.5" }}>
          {announcement.content}
        </p>
        {announcement.image && (
          <img
            src={announcement.image}
            alt={announcement.title}
            style={{
              marginTop: "10px",
              borderRadius: "8px",
              width: "100%",
              maxHeight: "180px",
              objectFit: "cover",
              border: "1px solid rgba(255, 255, 255, 0.3)", // ⬅️ Border agar lebih terstruktur
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default AnnouncementItem;