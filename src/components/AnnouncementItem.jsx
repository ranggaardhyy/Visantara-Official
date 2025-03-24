// src/components/AnnouncementItem.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnnouncementItem = ({ announcement }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row", // kolom untuk mobile, baris untuk desktop
    backgroundColor: "#222",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    marginBottom: "20px",
  };

  const imageContainerStyle = {
    flex: isMobile ? "0 0 auto" : "0 0 40%",
    width: isMobile ? "100%" : "auto",
    backgroundColor: "#333",
  };

  const imageStyle = {
    width: "100%",
    height: isMobile ? "auto" : "100%",
    objectFit: "cover",
  };

  const placeholderStyle = {
    width: "100%",
    height: "100%",
    minHeight: isMobile ? "200px" : "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#444",
    color: "#ccc",
    fontSize: "14px",
  };

  const contentStyle = {
    flex: "1",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "8px",
  };

  const textStyle = {
    fontSize: "1rem",
    color: "#ccc",
    marginBottom: "8px",
  };

  const infoStyle = {
    fontSize: "0.9rem",
    color: "#aaa",
  };

  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={imageContainerStyle}>
        {announcement.image ? (
          <img src={announcement.image} alt="Announcement" style={imageStyle} />
        ) : (
          <div style={placeholderStyle}>No Image</div>
        )}
      </div>
      <div style={contentStyle}>
        <div>
          <div style={titleStyle}>{announcement.title}</div>
          <div style={textStyle}>{announcement.content}</div>
        </div>
        <div style={infoStyle}>
          {announcement.created_by} |{" "}
          {announcement.created_at
            ? new Date(announcement.created_at).toLocaleString()
            : "Unknown Date"}
        </div>
      </div>
    </motion.div>
  );
};

export default AnnouncementItem;