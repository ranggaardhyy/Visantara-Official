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
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      overflow: "hidden",
      filter: `blur(0px)`, // Jangan blur langsung section
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
    particlesContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
    },
    serverStatusWrapper: {
      marginTop: "40px",
    },
  };

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 0,
        density: {
          enable: false,
          area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        options: {
          sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
    },
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
    detectRetina: true,
  };

  return (
    <motion.section
      style={styles.heroSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Particles Background */}
      <div style={styles.particlesContainer}>
        <Particles options={particlesOptions} />
      </div>

      {/* Overlay dengan blur dan opacity */}
      <div style={styles.heroOverlay}></div>

      {/* Content */}
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
    </motion.section>
  );
};

export default Hero;