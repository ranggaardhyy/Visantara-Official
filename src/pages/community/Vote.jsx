// src/pages/Vote.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy } from "react-icons/fa";
import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/layout/Hero";

const Vote = () => {
  const voteLink = "https://minecraft-mp.com/server/336809/vote/";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(voteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const styles = {
    pageContainer: {
      backgroundColor: "#121212",
      minHeight: "100vh",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
    },
    voteContainerWrapper: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    },
    voteContainer: {
      backgroundColor: "#222",
      borderRadius: "8px",
      padding: "2rem",
      maxWidth: "500px",
      width: "90%",
      boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
      textAlign: "center",
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
    copiedText: {
      marginTop: "1rem",
      fontSize: "0.9rem",
      color: "#FFA500",
    },
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      <Hero />
      <motion.div
        style={styles.voteContainerWrapper}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          style={styles.voteContainer}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
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
      </motion.div>
    </div>
  );
};

export default Vote;