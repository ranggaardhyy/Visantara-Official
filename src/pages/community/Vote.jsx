import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaChevronDown } from "react-icons/fa";
import Hero from "../../components/layout/Hero";

const Vote = () => {
  const voteLink = "https://minecraft-mp.com/server/336809/vote/";
  const [copied, setCopied] = useState(false);
  const [showArrow, setShowArrow] = useState(true);
  const contentRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(voteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowArrow(!entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

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
    arrowContainer: {
      textAlign: "center",
      marginTop: "-40px",
      position: "relative",
      zIndex: 9999,
    },
    arrowButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#3498db",
      fontSize: "2.5rem",
      animation: "bounce 2s infinite",
      padding: "0.5rem",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },
    tutorialContainer: {
      backgroundColor: "#222",
      color: "#eee",
      padding: "2rem",
      maxWidth: "600px",
      margin: "2rem auto 8px",
      borderRadius: "8px",
      lineHeight: "1.8",
      whiteSpace: "normal",
      textAlign: "left",
      fontSize: "1rem",
    },
  };

  return (
    <div style={styles.pageContainer}>
      <Hero />

      {showArrow && (
        <div style={styles.arrowContainer}>
          <button
            style={styles.arrowButton}
            onClick={scrollToContent}
            aria-label="Scroll to tutorial"
            title="Scroll ke tutorial"
          >
            <FaChevronDown />
          </button>
        </div>
      )}

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
        <div ref={contentRef} style={styles.tutorialContainer}>
          <h3 style={{ marginBottom: "1rem", fontWeight: "bold" }}>
            IKUTI PANDUAN VOTE INI UNTUK VOTE SERVER VISANTARA!
          </h3>
          <ul style={{ paddingLeft: "1.2rem", marginBottom: "1rem" }}>
            <li>Buka Minecraft, lalu masuk ke server Visantara</li>
            <li>Ketik perintah <strong>/vote</strong> di chat</li>
            <li>Klik link yang muncul di chat/gui</li>
            <li>Masukkan username Minecraft Anda di kolom yang tersedia</li>
            <li>Klik tombol "Vote" untuk mengirimkan vote Anda</li>
            <li>Setelah vote berhasil, Anda akan menerima reward di dalam game</li>
          </ul>

          <p>
            <strong>Contoh Cara Vote:</strong><br />
            <code>Boenyy</code> &mdash; untuk Java<br />
            <code>.Boenyy</code> &mdash; untuk Bedrock
          </p>

          <p style={{ fontStyle: "italic", marginTop: "1rem" }}>
            Note: Jika Anda sudah mengikuti panduan di atas namun tidak mendapatkan reward vote, silakan hubungi admin di server/Discord!
          </p>
        </div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};

export default Vote;
