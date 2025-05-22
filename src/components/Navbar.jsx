import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaBook,
  FaShoppingCart,
  FaPoll,
  FaDiscord,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItemVariants = {
    hover: { scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" },
  };

  return (
    <nav style={styles.navbar}>
      {!isMobile && (
        <div style={styles.navCenter}>
          <motion.div variants={navItemVariants} whileHover="hover">
            <Link to="/" style={styles.navLink}>
              <FaHome style={styles.icon} /> Home
            </Link>
          </motion.div>
          <motion.div variants={navItemVariants} whileHover="hover">
            <Link to="/rules" style={styles.navLink}>
              <FaBook style={styles.icon} /> Rules
            </Link>
          </motion.div>
          <motion.div variants={navItemVariants} whileHover="hover">
            <a
              href="https://discord.visantara.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.discordButton}
            >
              <FaDiscord style={styles.icon} /> Discord
            </a>
          </motion.div>
          <motion.div variants={navItemVariants} whileHover="hover">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              style={styles.navLink}
            >
              <FaShoppingCart style={styles.icon} /> Store
              <sup style={styles.comingSoon}>Coming Soon</sup>
            </a>
          </motion.div>
          <motion.div variants={navItemVariants} whileHover="hover">
            <Link to="/vote" style={styles.navLink}>
              <FaPoll style={styles.icon} /> Vote
            </Link>
          </motion.div>
        </div>
      )}

      {isMobile && (
        <>
          <button style={styles.menuButton} onClick={toggleMenu}>
            <FaBars />
          </button>

          <div
            style={{
              ...styles.mobileMenu,
              right: menuOpen ? "0" : "-70%",
            }}
          >
            <button style={styles.closeButton} onClick={toggleMenu}>
              <FaTimes />
            </button>
            <motion.div variants={navItemVariants} whileHover="hover">
              <Link to="/" style={styles.mobileNavLink} onClick={toggleMenu}>
                <FaHome style={styles.icon} /> Home
              </Link>
            </motion.div>
            <motion.div variants={navItemVariants} whileHover="hover">
              <Link to="/rules" style={styles.mobileNavLink} onClick={toggleMenu}>
                <FaBook style={styles.icon} /> Rules
              </Link>
            </motion.div>
            <motion.div variants={navItemVariants} whileHover="hover">
              <a
                href="https://discord.visantara.com"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.mobileDiscordButton}
                onClick={toggleMenu}
              >
                <FaDiscord style={styles.icon} /> Discord
              </a>
            </motion.div>
            <motion.div variants={navItemVariants} whileHover="hover">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                style={styles.mobileNavLink}
                onClick={toggleMenu}
              >
                <FaShoppingCart style={styles.icon} /> Store
                <sup style={styles.comingSoon}>Coming Soon</sup>
              </a>
            </motion.div>
            <motion.div variants={navItemVariants} whileHover="hover">
              <Link to="/vote" style={styles.mobileNavLink} onClick={toggleMenu}>
                <FaPoll style={styles.icon} /> Vote
              </Link>
            </motion.div>
          </div>
        </>
      )}
    </nav>
  );
}

const styles = {
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
    background: "transparent",
  },
  navCenter: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
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
    right: "-70%",
    width: "70%",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.95)",
    display: "flex",
    flexDirection: "column",
    paddingTop: "60px",
    transition: "right 0.3s ease-in-out",
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
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  mobileDiscordButton: {
    backgroundColor: "#5865F2",
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "15px 20px",
    textAlign: "left",
    textDecoration: "none",
    borderBottom: "1px solid #444",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  comingSoon: {
    fontSize: "10px",
    color: "#ffcc00",
    marginLeft: "4px",
  },
};

export default Navbar;
