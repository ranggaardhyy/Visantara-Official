import React, { useState } from "react";
import {
  FaSignInAlt,
  FaUserShield,
  FaShoppingCart,
  FaFileContract,
  FaUsers,
  FaCookieBite,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleAdminClick = () => {
    setShowLogin(true);
  };

  const handleClosePopup = () => {
    setShowLogin(false);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        setPopupType("success");
        setPopupMessage("Login berhasil!");
        setTimeout(() => {
          setPopupMessage("");
          setShowLogin(false);
          navigate("/admin");
        }, 2000);
      } else {
        setPopupType("error");
        setPopupMessage(data.message || "Login gagal!");
      }
    } catch (error) {
      setPopupType("error");
      setPopupMessage("Terjadi kesalahan!");
    }

    setTimeout(() => setPopupMessage(""), 2000);
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Play Now Section */}
        <div style={styles.section}>
          <h3 style={styles.title}>
            Play Now <span style={styles.highlight}>-</span>
          </h3>
          <p style={styles.text}>
            Start your journey today! Join the server now to play the best bedwars, skywars, and more!
          </p>
          <motion.button style={styles.playButton} whileHover={{ scale: 1.05 }}>
            play.visantara.com<span style={styles.arrow}>»</span>
          </motion.button>
        </div>

        {/* Links Section */}
        <div style={styles.section}>
          <h3 style={styles.title}>
            Links <span style={styles.highlight}>-</span>
          </h3>
          <ul style={styles.list}>
            <motion.li style={styles.listItem} whileHover={{ scale: 1.05 }}>
              <FaFileContract style={styles.icon} />
              <Link to="/terms" style={styles.link}>
                Terms and Conditions
              </Link>
            </motion.li>
            <motion.li style={styles.listItem} whileHover={{ scale: 1.05 }}>
              <FaUserShield style={styles.icon} />
              <Link to="/privacy" style={styles.link}>
                Privacy Policy
              </Link>
            </motion.li>
            <motion.li style={styles.listItem} whileHover={{ scale: 1.05 }}>
              <FaUsers style={styles.icon} />
              <Link to="/members" style={styles.link}>
                Members
              </Link>
            </motion.li>
            <motion.li style={styles.listItem} whileHover={{ scale: 1.05 }}>
              <FaCookieBite style={styles.icon} />
              <Link to="/cookies" style={styles.link}>
                Cookie Notice
              </Link>
            </motion.li>
          </ul>
        </div>

        {/* Store Section */}
        <div style={styles.section}>
          <h3 style={styles.title}>
            Store <span style={styles.highlight}>-</span>
          </h3>
          <p style={styles.text}>
            Check out our store to purchase ranks, crate keys, and more!
          </p>
          <motion.button
            style={styles.shopButton}
            whileHover={{ scale: 1.05 }}
            onClick={() => window.open("https://store.alwination.id", "_blank")}
          >
            Shop Now <FaShoppingCart style={{ marginLeft: "5px" }} />
          </motion.button>
        </div>
      </div>

      {/* Admin Icon */}
      <div style={styles.iconContainer}>
        <FaUserShield
          size={24}
          style={styles.adminIcon}
          onClick={handleAdminClick}
          title="Admin Dashboard"
        />
      </div>

      {/* Login Popup */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            style={styles.popup}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <button style={styles.closePopupButton} onClick={handleClosePopup}>
              <FaTimes />
            </button>
            <h3 style={styles.popupTitle}>Login Admin</h3>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              style={styles.input}
            />
            <button onClick={handleLogin} style={styles.button}>
              Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pop-up Message */}
      {popupMessage && (
        <motion.div
          style={{
            ...styles.popupMessage,
            backgroundColor: popupType === "success" ? "#4CAF50" : "#FF5733",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {popupMessage}
        </motion.div>
      )}

      {/* Copyright */}
      <div style={styles.copyright}>
        <p>
          <strong>Visantara © 2025. All rights reserved.</strong>
        </p>
        <p style={styles.smallText}>Not affiliated with Mojang or Microsoft.</p>
      </div>
    </footer>
  );
};

/* ================== STYLING =================== */
const styles = {
  footer: {
    backgroundColor: "#111",
    color: "#ccc",
    padding: "50px 20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    position: "relative",
  },
  container: {
    display: "flex",
    flexDirection: "row", // Tiga kolom
    justifyContent: "space-between",
    alignItems: "flex-start",
    maxWidth: "1200px",
    margin: "0 auto",
    flexWrap: "wrap", // Agar responsif saat layar mengecil
  },
  section: {
    width: "30%", // Setiap kolom ~30%
    minWidth: "250px",
    marginBottom: "30px",
    textAlign: "left", // Rata kiri agar terlihat lebih rapi
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "10px",
  },
  highlight: {
    color: "#ADD8E6",
    textShadow: "0 0 8px rgba(0, 152, 172, 0.8)",
  },
  text: {
    fontSize: "14px",
    marginTop: "10px",
    color: "#aaa",
    lineHeight: "1.5",
  },
  playButton: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s",
  },
  arrow: {
    fontSize: "16px",
    marginLeft: "5px",
  },
  shopButton: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#00FFFF",
    color: "#111",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.3s ease",
  },
  list: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
  icon: {
    marginRight: "8px",
    color: "#00FFFF",
    fontSize: "18px",
  },
  link: {
    textDecoration: "none",
    color: "#ccc",
    fontSize: "14px",
    transition: "color 0.3s",
  },
  adminIcon: {
    cursor: "pointer",
    color: "#00FFFF",
    fontSize: "26px",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  },
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#222",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 8px 16px rgba(0,0,0,0.5)",
    textAlign: "center",
    zIndex: 9999,
    width: "90%",
    maxWidth: "400px",
    color: "#fff",
  },
  closePopupButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  popupTitle: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bold",
  },
  input: {
    display: "block",
    width: "100%",
    margin: "12px 0",
    padding: "10px",
    border: "1px solid #444",
    borderRadius: "5px",
    backgroundColor: "#333",
    color: "#fff",
  },
  button: {
    backgroundColor: "#ffcc00",
    color: "#111",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },
  popupMessage: {
    position: "fixed",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px",
    borderRadius: "5px",
    color: "#fff",
    textAlign: "center",
    zIndex: 1000,
  },
  copyright: {
    marginTop: "30px",
    paddingTop: "15px",
    borderTop: "1px solid #333",
    fontSize: "12px",
  },
  smallText: {
    color: "#777",
  },
};

export default Footer;