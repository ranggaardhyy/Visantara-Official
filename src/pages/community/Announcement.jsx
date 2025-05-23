import React from "react";
import AnnouncementList from "../../components/announcements/AnnouncementList";

const Announcements = () => {
  const styles = {
    container: {
      marginTop: "20px",
      padding: "20px",
      background: "rgba(0, 0, 0, 0.4)",
      borderRadius: "10px",
      color: "#fff",
      maxWidth: "800px",
      marginLeft: "auto",
      marginRight: "auto",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(6px)",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Pengumuman</h2>
      <AnnouncementList />
    </div>
  );
};

export default Announcements;
