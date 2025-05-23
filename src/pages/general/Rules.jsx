import React from "react";
import { motion } from "framer-motion";
import { FaListOl } from "react-icons/fa";
import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/layout/Hero";

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
    Visantara Server Rules
  </motion.h1>
  <motion.p style={styles.paragraph}>
    Welcome to Visantara Server! Please read and follow the rules to ensure a safe
    and enjoyable experience for everyone. By playing on this server, you agree to
    abide by these rules.
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
                <strong>1. Respect Others</strong>
                <ul style={styles.list}>
                <li>Selalu hormati sesama pemain dan staff.</li>
                <li>Dilarang melakukan pelecehan verbal ataupun non-verbal.</li>
                <li>Dilarang melakukan perilaku toxic.</li>
                <li>Dilarang mendiskusikan sesuatu yang tidak pantas.</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>2. Advertising</strong>
                <ul style={styles.list}>
                <li>Dilarang mempromosikan situs Web, Discord, Channel Youtube atau media sosial
                  lainnya yang tidak berhubungan dengan server ini.</li>
                <li>Dilarang mempromosikan server lain.</li>
                <li>Dilarang mempromosikan produk atau layanan yang tidak berhubungan dengan server ini.</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>3. Maintain Politeness</strong>
                <ul style={styles.list}>
                <li>Dilarang menggunakan kata kata kasar, ofensif atau tidak pantas, baik di Chat maupun
                  di Voice Channel.</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>4. No Real Money Trading (RMT)</strong>
                <ul style={styles.list}>
                <li>Dilarang keras memperjualbelikan item atau layanan game dengan uang asli.</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>5. Zero Tolerance for Discrimination</strong>
                <ul style={styles.list}>
                <li>Perlakukan semua orang dengan adil tanpa memandang usia, ras, gender, agama atau latar belakang lainnya</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>6. No Cheating or Exploiting</strong>
                <ul style={styles.list}>
                <li>Dilarang menggunakan cheat, bug, atau eksploitasi untuk keuntungan pribadi.</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>7. Avoid Drama</strong>
                <ul style={styles.list}>
                <li>Jaga suasana tetap positif dan santai.</li>
                <li>Hindari konflik, debat panas dan perilaku pasif agresif</li>
                <li>Jika ada masalah, laporkan ke staff.</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>8. No Spamming or Flooding</strong>
                <ul style={styles.list}>
                <li>Jangan mengirim pesan, huruf, simbol atau emoji secara berlebihan.</li>
                <li>Jangan membuat nama item yang berlebihan.</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>9. No Scamming</strong>
                <ul style={styles.list}>
                <li>Segala bentuk penipuan atau pencurian akan di hukum dengan tegas.</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>10. No Griefing</strong>
                <ul style={styles.list}>
                <li>Jangan merusak atau mengganggu bangunan pemain lain tanpa izin.</li>
                <li>Jangan mengganggu aktivitas pemain lain.</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>11. Keep It Clean</strong>
                <ul style={styles.list}>
                <li>Dilarang menggunakan konten NSFW pada username, avatar, nama item dan lainnya.</li>
                </ul>
            </li>
            <li style={styles.listItem}>
                <strong>12. Use Common Sense</strong>
                <ul style={styles.list}>
                <li>Jika sesuatu terasa salah, kemungkinan besar memang tidak diperbolehkan.</li>
                <li>Bermainlah dengan jujur dan hormat</li>
                </ul>
            </li>
            <motion.p style={styles.paragraph}>
                Note : Semua Keputusan Staff Visantara bersifat final.
            </motion.p>
            <motion.p style={styles.paragraph}>
              Kami akan menindak dengan tegas jika terdapat player yang melanggar Rules yang sudah kami tetapkan.
              Jika anda merasa ada player yang melanggar Rules, silahkan laporkan kepada Staff kami.
              Terima kasih telah bermain di Visantara Server!
            </motion.p>
            </motion.ul>
        </div>
        </motion.div>
    </div>
  );
};

export default Rules;