import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBook, FaShoppingCart, FaPoll, FaDiscord, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const styles = {
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 20px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(10px)",
      zIndex: 1000,
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      marginLeft: isMobile ? "50px" : "10px", // Geser sedikit untuk mobile
    },
    logo: {
      width: "35px", // Ukuran logo lebih kecil
      height: "35px",
    },
    menuButton: {
      display: isMobile ? "block" : "none",
      fontSize: "24px",
      color: "#ffffff",
      background: "none",
      border: "none",
      cursor: "pointer",
      position: "absolute",
      left: "15px", // Hamburger di kiri atas
    },
    navLinks: {
      display: isMobile ? "none" : "flex",
      alignItems: "center",
      gap: "20px",
      flexGrow: 1,
      justifyContent: "center",
    },
    navLink: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 15px",
      borderRadius: "5px",
      transition: "background 0.3s ease, transform 0.2s ease",
    },
    discordButton: {
      color: "#ffffff",
      textDecoration: "none",
      padding: "10px 15px",
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "#5865F2",
      borderRadius: "5px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "background 0.3s ease",
      marginRight: "15px", // Geser sedikit ke kiri
    },
    mobileMenu: {
      position: "fixed",
      top: 0,
      left: menuOpen ? "0" : "-50%", // Geser dari kiri
      width: "50%", // Hanya setengah layar
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      paddingTop: "60px",
      display: "flex",
      flexDirection: "column",
      transition: "left 0.3s ease-in-out",
    },
    closeButton: {
      position: "absolute",
      top: "15px",
      left: "15px",
      fontSize: "30px",
      color: "#ffffff",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <nav style={styles.navbar}>
      {/* Tombol Hamburger */}
      <button style={styles.menuButton} onClick={toggleMenu}>
        <FaBars />
      </button>

      {/* Logo */}
      <div style={styles.logoContainer}>
        <img src="/logo.png" alt="Logo" style={styles.logo} />
      </div>

      {/* Navigasi Desktop */}
      <div style={styles.navLinks}>
        <Link to="/" style={styles.navLink}><FaHome /> Home</Link>
        <Link to="/rules" style={styles.navLink}><FaBook /> Rules</Link>
        <Link to="/store" style={styles.navLink}><FaShoppingCart /> Store</Link>
        <Link to="/vote" style={styles.navLink}><FaPoll /> Vote</Link>
      </div>

      {/* Tombol Discord */}
      <a href="https://discord.gg/alwination" target="_blank" rel="noopener noreferrer" style={styles.discordButton}>
        <FaDiscord /> Discord
      </a>

      {/* Mobile Menu */}
      <div style={styles.mobileMenu}>
        <button style={styles.closeButton} onClick={toggleMenu}>
          <FaTimes />
        </button>
        <Link to="/" style={styles.navLink} onClick={toggleMenu}><FaHome /> Home</Link>
        <Link to="/rules" style={styles.navLink} onClick={toggleMenu}><FaBook /> Rules</Link>
        <Link to="/store" style={styles.navLink} onClick={toggleMenu}><FaShoppingCart /> Store</Link>
        <Link to="/vote" style={styles.navLink} onClick={toggleMenu}><FaPoll /> Vote</Link>
        <a href="https://discord.gg/alwination" target="_blank" rel="noopener noreferrer" style={styles.discordButton} onClick={toggleMenu}>
          <FaDiscord /> Discord
        </a>
      </div>
    </nav>
  );
};

export default Navbar;