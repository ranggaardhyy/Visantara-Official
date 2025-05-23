import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import ServerStatus from "./ServerStatus";
import bgImage from "../assets/images/visantara-bg.jpg";
import logo from "../assets/images/logo.png";

const Hero = ({ children, blur = 6, overlayOpacity = 0.85 }) => {
  const styles = {
    heroSection: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
      overflow: "hidden",
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: 0, // paling bawah
    },
    heroOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
      backdropFilter: `blur(${blur}px)`,
      WebkitBackdropFilter: `blur(${blur}px)`,
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
      marginBottom: "20px",
      width: "230px",
    },
    serverStatusWrapper: {
      marginTop: "40px",
    },
    particlesContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 3, // Paling atas
      pointerEvents: "none", // supaya klik tetap ke konten bawah
    },
  };

  const particlesOptions = {
    particles: {
      number: {
        value: 60,
        density: { enable: true, value_area: 800 },
      },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: true, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { quantity: 4 },
      },
    },
    retina_detect: true,
  };

  return (
    <motion.section
      style={styles.heroSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background image - paling bawah */}
      <div style={styles.backgroundImage}></div>

      {/* Overlay - di atas background */}
      <div style={styles.heroOverlay}></div>

      {/* Content - di atas overlay */}
      <motion.div
        style={styles.heroContent}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          src={logo}
          alt="Logo"
          style={styles.heroLogo}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div style={styles.serverStatusWrapper}>
          <ServerStatus />
        </div>
        {children}
      </motion.div>

      {/* Particles - paling depan */}
      <div style={styles.particlesContainer}>
        <Particles params={particlesOptions} />
      </div>
    </motion.section>
  );
};

export default Hero;
