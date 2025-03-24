// src/pages/Vote.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Vote = () => {
  const voteLink = "https://minecraft-mp.com/server/339723/vote/";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(voteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const styles = {
    container: {
      backgroundColor: "#121212",
      minHeight: "100vh",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      zIndex: 100,
    },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#222",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
      zIndex: 101,
      textAlign: "center",
      width: "90%",
      maxWidth: "500px",
    },
    voteLink: {
      backgroundColor: "#333",
      color: "#FFA500",
      padding: "0.75rem 1rem",
      borderRadius: "4px",
      fontSize: "1.2rem",
      wordBreak: "break-all",
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      cursor: "pointer",
    },
    instruction: {
      fontSize: "1rem",
      color: "#ccc",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      color: "#fff",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    copiedText: {
      marginTop: "1rem",
      fontSize: "0.9rem",
      color: "#FFA500",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <AnimatePresence>
          <motion.div
            style={styles.modalOverlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
          <motion.div
            style={styles.modal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              style={styles.closeButton}
              onClick={() => window.history.back()}
            >
              &times;
            </button>
            <div style={styles.voteLink} onClick={handleCopy}>
              {voteLink}
              <FaCopy />
            </div>
            <div style={styles.instruction}>
              Salin link di atas lalu tempelkan ke browser
            </div>
            <AnimatePresence>
              {copied && (
                <motion.div
                  style={styles.copiedText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Link berhasil disalin!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default Vote;