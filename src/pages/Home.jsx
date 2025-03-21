import React from "react";
import { Link } from "react-router-dom";
import ServerStatus from "../components/ServerStatus";
import { FaUsers, FaCogs, FaGlobe } from "react-icons/fa";

const Home = () => {
  // Style Objects
  const mainContainerStyle = {
    backgroundColor: "#1a202c", // bg-gray-900
    color: "#ffffff",
    minHeight: "100vh",
  };

  // Hero Section Styles
  const heroSectionStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: "url('/images/minecraft-bg.jpg')",
  };

  const heroOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "8px",
  };

  const heroContentStyle = {
    position: "relative",
    zIndex: 1,
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    borderRadius: "8px",
  };

  const heroTitleStyle = {
    fontSize: "3rem",
    fontWeight: "800",
    marginBottom: "1rem",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  };

  const heroTextStyle = {
    fontSize: "1.125rem",
    opacity: 0.9,
    marginBottom: "1.5rem",
  };

  const buttonStyle = {
    marginTop: "1.5rem",
    padding: "0.75rem 2rem",
    backgroundColor: "#48bb78", // green-500
    border: "none",
    borderRadius: "0.5rem",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1.125rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  // Server Status Section Styles
  const serverStatusSectionStyle = {
    padding: "4rem 0",
    backgroundColor: "#2d3748", // bg-gray-800
    textAlign: "center",
  };

  const statusContainerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "0 1.5rem",
  };

  // Feature Section Styles
  const featureSectionStyle = {
    padding: "4rem 0",
    backgroundColor: "#1a202c", // bg-gray-900
    textAlign: "center",
  };

  const featureContainerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
  };

  const featureItemStyle = {
    padding: "1.5rem",
    backgroundColor: "#2d3748", // bg-gray-800
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease",
  };

  const featureIconStyle = {
    color: "#68d391", // text-green-400
    fontSize: "2.5rem",
    marginBottom: "1rem",
  };

  const featureTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
  };

  const featureTextStyle = {
    opacity: 0.9,
  };

  return (
    <div style={mainContainerStyle}>
      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle}></div>
        <div style={heroContentStyle}>
          <h1 style={heroTitleStyle}>Selamat Datang di AlwiNation SMP</h1>
          <p style={heroTextStyle}>Server Minecraft terbaik untuk komunitas!</p>
          <Link to="/dashboard">
            <button style={buttonStyle}>Gabung Sekarang</button>
          </Link>
        </div>
      </section>

      {/* Server Status Section */}
      <section style={serverStatusSectionStyle}>
        <div style={statusContainerStyle}>
          <h3 style={{ fontSize: "1.875rem", fontWeight: "600" }}>
            Server Status
          </h3>
          <ServerStatus />
        </div>
      </section>

      {/* Feature Section */}
      <section style={featureSectionStyle}>
        <div style={statusContainerStyle}>
          <h3
            style={{
              fontSize: "1.875rem",
              fontWeight: "600",
              marginBottom: "2rem",
              color: "#68d391",
            }}
          >
            Kenapa Main di AlwiNation?
          </h3>
          <div style={featureContainerStyle}>
            <div style={featureItemStyle}>
              <FaGlobe style={featureIconStyle} />
              <h4 style={featureTitleStyle}>Survival Mode</h4>
              <p style={featureTextStyle}>
                Jelajahi dunia tanpa batas dengan teman-temanmu!
              </p>
            </div>
            <div style={featureItemStyle}>
              <FaCogs style={featureIconStyle} />
              <h4 style={featureTitleStyle}>Custom Plugins</h4>
              <p style={featureTextStyle}>
                Pengalaman unik dengan fitur eksklusif.
              </p>
            </div>
            <div style={featureItemStyle}>
              <FaUsers style={featureIconStyle} />
              <h4 style={featureTitleStyle}>Komunitas Aktif</h4>
              <p style={featureTextStyle}>
                Bergabung dengan ratusan pemain setiap hari.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
