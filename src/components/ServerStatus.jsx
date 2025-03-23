import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SERVER_IP = "play.alwination.id";

const ServerStatus = () => {
    const [players, setPlayers] = useState(null);
    const [status, setStatus] = useState("Checking...");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchServerStatus = async () => {
            try {
                const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
                const data = await response.json();

                if (data.online) {
                    setPlayers(`${data.players.online} PLAYERS ONLINE`);
                    setStatus("Online ✅");
                } else {
                    setPlayers("0 PLAYERS ONLINE");
                    setStatus("Offline ❌");
                }
            } catch (error) {
                setPlayers("N/A PLAYERS ONLINE");
                setStatus("Error ❌");
            }
        };

        fetchServerStatus();
        const interval = setInterval(fetchServerStatus, 5000);
        return () => clearInterval(interval);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(SERVER_IP);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Pop-up menghilang setelah 2 detik
    };

    const styles = {
        container: {
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(255, 204, 0, 0.2)", // Warna kuning transparan
            padding: "12px 20px",
            borderRadius: "8px",
            color: "#FFCC00",
            fontWeight: "bold",
            fontSize: "14px",
            textTransform: "uppercase",
            cursor: "pointer",
        },
        ipText: {
            display: "block",
            fontSize: "12px",
            fontWeight: "600",
            color: "#FFFFFF",
            marginTop: "2px",
        },
        playButton: {
            width: "32px",
            height: "32px",
            background: "#FFCC00",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        },
        playIcon: {
            color: "#1f1f1f",
            fontSize: "14px",
        },
    };

    return (
        <>
            {/* Server Status Display */}
            <div style={styles.container} onClick={copyToClipboard}>
                <div>
                    <div>{players}</div>
                    <span style={styles.ipText}>{SERVER_IP}</span>
                </div>
                <div style={styles.playButton}>
                    <FaPlay style={styles.playIcon} />
                </div>
            </div>

            {/* Pop-up Notifikasi */}
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "absolute",
                            bottom: "70px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "#000",
                            color: "#FFCC00",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "bold",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                        }}
                    >
                        ✅ IP Copied!
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ServerStatus;