import React from "react";
import { motion } from "framer-motion";
import { FaListOl } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Rules = () => {
  const styles = {
    container: {
      backgroundColor: "#121212",
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: 1,
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      textAlign: "center",
      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    },
    sectionTitle: {
      fontSize: "1.8rem",
      margin: "1.5rem 0 1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    paragraph: {
      fontSize: "1rem",
      lineHeight: "1.6",
      marginBottom: "1rem",
    },
    listContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.5)", // background gelap transparan agar sesuai dengan tema
        borderRadius: "8px",
        padding: "1rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        marginBottom: "1rem",
    },
    list: {
      marginLeft: "1.5rem",
      marginBottom: "1rem",
    },
    listItem: {
      marginBottom: "0.5rem",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <Hero />
      <motion.div
  style={styles.content}
  initial="hidden"
  animate="visible"
  variants={containerVariants}
>
  <motion.h1
    style={styles.title}
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    Aturan Server Alwination
  </motion.h1>
  <motion.p style={styles.paragraph}>
    Selamat datang di Alwination! Dokumen berikut merupakan pedoman lengkap yang
    harus dipatuhi oleh seluruh pemain untuk menjaga lingkungan permainan yang
    aman, adil, dan menyenangkan.
  </motion.p>
  <motion.div
    style={styles.sectionTitle}
    initial={{ x: -50 }}
    animate={{ x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <FaListOl size={24} />
    <span>Daftar Isi:</span>
        </motion.div>
        {/* Wrapper untuk background Daftar Isi */}
        <div style={styles.listContainer}>
            <motion.ul
            style={styles.list}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            >
            <li style={styles.listItem}>
                <strong>1. Aturan Umum</strong>
                <ul style={styles.list}>
                <li>Pasal 1: Etika dan Perilaku</li>
                <li>Pasal 2: Identitas, Nickname, dan Topik Pembicaraan</li>
                <li>Pasal 3: Konten yang Dilarang</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>2. Aturan Permainan Minecraft</strong>
                <ul style={styles.list}>
                <li>Pasal 4: Fair Play dan Anti-Cheat</li>
                <li>Pasal 5: Eksploitasi Bug</li>
                <li>Pasal 6: Multi-Accounting</li>
                <li>Pasal 7: Random Kill di Mode Non-PvP/Non-War</li>
                <li>Pasal 8: Larangan Penggunaan Trap</li>
                <li>Pasal 9: Interaksi dan Persaingan dalam Game</li>
                <li>Pasal 10: Pelecehan Seksual</li>
                <li>Pasal 11: Transaksi dan Perdagangan</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>3. Sanksi dan Prosedur Penegakan</strong>
                <ul style={styles.list}>
                <li>Pasal 12: Jenis Sanksi</li>
                <li>Pasal 13: Prosedur Penegakan</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>4. Ketentuan Tambahan</strong>
                <ul style={styles.list}>
                <li>Pasal 14: Perubahan Aturan</li>
                <li>Pasal 15: Kepatuhan dan Tanggung Jawab</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>5. Penutup</strong>
                <ul style={styles.list}>
                <li>Mari Menjaga Komunitas AlwiNation Dengan Baik Bersama-sama</li>
                </ul>
            </li>
            </motion.ul>
        </div>
        </motion.div>
      <Footer />
    </div>
  );
};

export default Rules;