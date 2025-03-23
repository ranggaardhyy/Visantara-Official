import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DOMPurify from "dompurify"; // Untuk membersihkan input
import ServerStatus from "../components/ServerStatus";
import AnnouncementList from "../components/AnnouncementList";

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Data statis bisa diganti dengan data dari API backend
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/api/announcements", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data pengumuman");
        }

        const data = await response.json();
        // Mencegah XSS dengan membersihkan data sebelum disimpan di state
        const sanitizedData = data.map((item) => ({
          id: item.id,
          title: DOMPurify.sanitize(item.title),
          content: DOMPurify.sanitize(item.content),
          image: item.image,
        }));

        setAnnouncements(sanitizedData);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const styles = {
    container: { padding: "20px", textAlign: "center" },
    heroSection: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: "url('/assets/images/mineforge-banner.jpg')",
    },
    heroOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    heroContent: {
      position: "relative",
      zIndex: 1,
      padding: "2rem",
      maxWidth: "600px",
      margin: "0 auto",
      color: "#fff",
    },
    heroTitle: {
      fontSize: "3rem",
      fontWeight: "800",
      marginBottom: "1rem",
      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    },
    heroText: {
      fontSize: "1.2rem",
      fontWeight: "400",
      marginBottom: "1.5rem",
    },
    announcementSection: {
      marginTop: "40px",
      padding: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.05)", // ⬅️ Warna gelap transparan
      borderRadius: "10px",
      border: "1px solid rgba(255, 255, 255, 0.2)", // ⬅️ Border transparan agar tetap terstruktur
      color: "#fff", // ⬅️ Teks tetap putih agar terlihat jelas
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // ⬅️ Efek bayangan agar lebih elegan
      backdropFilter: "blur(6px)", // ⬅️ Efek blur agar lebih modern
    },
    button: {
      marginTop: "1.5rem",
      padding: "12px 24px",
      backgroundColor: "#ffcc00",
      border: "none",
      borderRadius: "6px",
      color: "#000",
      fontWeight: "600",
      fontSize: "1.125rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease-in-out",
    },
  };

  return (
    <div style={styles.container}>
      <motion.section
        style={styles.heroSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div style={styles.heroOverlay}></div>
        <ServerStatus />

        <motion.div
          style={styles.heroContent}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 style={styles.heroTitle}>Selamat Datang di AlwiNation</h1>
          <p style={styles.heroText}>
            Server Minecraft terbaik untuk komunitas! Bergabung dan jadilah bagian dari petualangan seru bersama teman-teman.
          </p>
          <p style={styles.heroText}>
            Bangun, bertahan, dan eksplorasi dunia tanpa batas di AlwiNation!
          </p>
        </motion.div>
      </motion.section>

      {/* Bagian Pengumuman */}
      <div style={styles.announcementSection}>
        <h2>📢 Pengumuman Terbaru</h2>
        <AnnouncementList announcements={announcements} />
      </div>
    </div>
  );
};

export default Home;