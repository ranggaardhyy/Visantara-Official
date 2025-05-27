import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SERVER_IP = "play.visantara.com";

const ServerStatus = () => {
  const [players, setPlayers] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        const data = await response.json();

        if (data.online) {
          setPlayers(`${data.players.online} PLAYERS ONLINE`);
        } else {
          setPlayers("0 PLAYERS ONLINE");
        }
      } catch (error) {
        setPlayers("N/A PLAYERS ONLINE");
      }
    };

    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      background: "rgba(4, 93, 105, 0.2)", 
      padding: "10px 16px",
      borderRadius: "8px",
      color: "#ADD8E6", // teks orange
      fontWeight: "bold",
      fontSize: "14px",
      textTransform: "uppercase",
      cursor: "pointer",
      marginTop: "20px", // jarak antar elemen dalam konten hero
    },
    ipText: {
      fontSize: "12px",
      fontWeight: "600",
      color: "#FFFFFF",
    },
    playButton: {
      width: "32px",
      height: "32px",
      background: "#ADD8E6",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    },
    playIcon: {
      color: "#000000",
      fontSize: "14px",
    },
  };

  return (
    <>
      <motion.div
        style={styles.container}
        onClick={copyToClipboard}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <div>
          <div>{players}</div>
          <span style={styles.ipText}>{SERVER_IP}</span>
        </div>
        <div style={styles.playButton}>
          <FaPlay style={styles.playIcon} />
        </div>
      </motion.div>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: "10px",
              background: "rgba(108, 189, 255, 0.53)",              
              color: "#ffffff",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(60, 122, 255, 0.3)",
            }}
          >
            ✅IP COPIED!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServerStatus;