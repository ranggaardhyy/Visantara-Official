import React from "react";
import Hero from "../components/Hero";
import AnnouncementList from "../components/AnnouncementList";

const Home = () => {
  const styles = {
    container: {
      marginTop: 0,
      padding: "0",
    },
    announcementSection: {
      marginTop: "0px",
      padding: "20px",
      background: "transparent",
      borderRadius: "10px",
      border: "1px solid rgba(0, 0, 0, 0.2)",
      color: "#fff",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      backdropFilter: "blur(6px)",
    },
  };

  return (
    <div style={styles.container}>
      <Hero />
      <div style={styles.announcementSection}>
        <AnnouncementList />
      </div>
    </div>
  );
};

export default Home;