// src/components/AnnouncementList.jsx
import React, { useEffect, useState } from "react";
import AnnouncementItem from "./AnnouncementItem";

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/announcements")
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching announcements:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={styles.loadingText}>Loading announcements...</p>;
  }

  return (
    <div style={styles.container}>
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <AnnouncementItem key={announcement.id} announcement={announcement} />
        ))
      ) : (
        <p style={styles.emptyText}>Tidak ada pengumuman untuk ditampilkan.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    margin: "20px",
  },
  emptyText: {
    fontStyle: "italic",
    color: "#aaa",
    textAlign: "center",
  },
  loadingText: {
    fontStyle: "italic",
    color: "#aaa",
    textAlign: "center",
  },
};

export default AnnouncementList;