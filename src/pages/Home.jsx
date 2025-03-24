import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify"; 
import AnnouncementList from "../components/AnnouncementList";
import Hero from "../components/Hero";

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Data statis bisa diganti dengan data dari API backend
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/api/announcements");
        if (!response.ok) throw new Error("Gagal mengambil data pengumuman");

        const data = await response.json();
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
    container: {
      marginTop: 0, // memastikan tidak ada jarak antara navbar & hero
      padding: "0",
    },
    announcementSection: {
      marginTop: "40px",
      padding: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "10px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "#fff",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      backdropFilter: "blur(6px)",
    },
  };

  return (
    <div style={styles.container}>
      {/* Hanya integrasikan Hero tanpa teks */}
      <Hero />

      {/* Bagian Pengumuman */}
      <div style={styles.announcementSection}>
        <h2>📢 Pengumuman Terbaru</h2>
        <AnnouncementList announcements={announcements} />
      </div>
    </div>
  );
};

export default Home;
