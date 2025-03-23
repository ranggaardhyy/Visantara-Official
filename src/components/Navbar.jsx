import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaShoppingCart,
  FaPoll,
  FaDiscord,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../assets/images/logo.png";

function Navbar() {
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

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>

      {/* Desktop Links */}
      {!isMobile && (
        <div style={styles.navCenter}>
          <div style={styles.navLeft}>
            <Link to="/" style={styles.navLink}>
              <FaHome style={styles.icon} /> Home
            </Link>
            <Link to="/rules" style={styles.navLink}>
              <FaBook style={styles.icon} /> Rules
            </Link>
          </div>
          <div style={styles.navRight}>
            <Link to="/store" style={styles.navLink}>
              <FaShoppingCart style={styles.icon} /> Store
            </Link>
            <Link to="/vote" style={styles.navLink}>
              <FaPoll style={styles.icon} /> Vote
            </Link>
            <a
              href="https://discord.gg/alwination"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.discordButton}
            >
              <FaDiscord style={styles.icon} /> Discord
            </a>
          </div>
        </div>
      )}

      {/* Mobile Hamburger */}
      {isMobile && (
        <>
          <button style={styles.menuButton} onClick={toggleMenu}>
            <FaBars />
          </button>
          <div style={{ ...styles.mobileMenu, left: menuOpen ? "0" : "-70%" }}>
            <button style={styles.closeButton} onClick={toggleMenu}>
              <FaTimes />
            </button>
            <Link to="/" style={styles.mobileNavLink} onClick={toggleMenu}>
              <FaHome style={styles.icon} /> Home
            </Link>
            <Link to="/rules" style={styles.mobileNavLink} onClick={toggleMenu}>
              <FaBook style={styles.icon} /> Rules
            </Link>
            <Link to="/store" style={styles.mobileNavLink} onClick={toggleMenu}>
              <FaShoppingCart style={styles.icon} /> Store
            </Link>
            <Link to="/vote" style={styles.mobileNavLink} onClick={toggleMenu}>
              <FaPoll style={styles.icon} /> Vote
            </Link>
            <a
              href="https://discord.gg/alwination"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.mobileDiscordButton}
              onClick={toggleMenu}
            >
              <FaDiscord style={styles.icon} /> Discord
            </a>
          </div>
        </>
      )}
    </nav>
  );
}

const styles = {
  navbar: {
    position: "absolute", // Agar menempel di atas hero
    top: 0,
    left: 0,
    right: 0,    // Pastikan menempel hingga sisi kanan
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    padding: "10px 20px", // Kurangi padding jika perlu
    background: "transparent",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "100px",
    height: "auto",
    maxWidth: "100%", // Pastikan tidak melebihi layar
  },
  navCenter: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "20px",
  },
  navLeft: {
    display: "flex",
    gap: "20px",
  },
  navRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: "auto",
  },
  navLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 12px",
    borderRadius: "4px",
    transition: "background 0.3s ease",
  },
  icon: {
    fontSize: "18px",
  },
  discordButton: {
    backgroundColor: "#5865F2",
    padding: "8px 12px",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
  menuButton: {
    fontSize: "24px",
    color: "#ffffff",
    background: "none",
    border: "none",
    cursor: "pointer",
    zIndex: 11,
    marginLeft: "auto",
  },
  mobileMenu: {
    position: "fixed",
    top: 0,
    left: "-70%",
    width: "70%",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.95)",
    display: "flex",
    flexDirection: "column",
    paddingTop: "60px",
    transition: "left 0.3s ease-in-out",
    zIndex: 9999,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginRight: "20px",
    fontSize: "30px",
    color: "#ffffff",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  mobileNavLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "15px 20px",
    borderBottom: "1px solid #444",
  },
  mobileDiscordButton: {
    backgroundColor: "#5865F2",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "15px 20px",
    textAlign: "center",
    marginTop: "auto",
  },
};

export default Navbar;