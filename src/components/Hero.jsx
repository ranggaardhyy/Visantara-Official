import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import ServerStatus from "./ServerStatus";
import bgImage from "../assets/images/minecraft-bg.jpeg";
import logo from "../assets/images/logo.png";

const Hero = ({ children }) => {
  const styles = {
    heroSection: {
      position: "relative",
      display: "flex",
      flexDirection: "column", // gunakan kolom untuk urutan vertikal
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: `url(${bgImage})`,
      overflow: "hidden",
    },
    heroOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 1,
    },
    heroContent: {
      position: "relative",
      zIndex: 2,
      padding: "2rem",
      maxWidth: "600px",
      margin: "0 auto",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    heroLogo: {
      display: "block",
      margin: "0 auto 20px auto",
      marginBottom: "20px",
      width: "230px",
    },
    particlesContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
    },
    serverStatusWrapper: {
      marginTop: "40px", // jarak antara logo dan server status
    },
  };

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#ffffff" },
      links: { enable: false },
      move: {
        direction: "bottom",
        enable: true,
        outMode: "out",
        speed: 2,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 50,
      },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { random: true, value: 4 },
    },
    detectRetina: true,
  };

  return (
    <motion.section
      style={styles.heroSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Efek Partikel */}
      <div style={styles.particlesContainer}>
        <Particles options={particlesOptions} />
      </div>

      {/* Overlay */}
      <div style={styles.heroOverlay}></div>

      <motion.div
        style={styles.heroContent}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animasi heartbeat pada logo */}
        <motion.img
          src={logo}
          alt="Logo"
          style={styles.heroLogo}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* ServerStatus diletakkan tepat di bawah logo */}
        <div style={styles.serverStatusWrapper}>
          <ServerStatus />
        </div>
        {children}
      </motion.div>
    </motion.section>
  );
};

export default Hero;