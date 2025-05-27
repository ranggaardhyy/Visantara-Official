import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaListOl, FaChevronDown } from "react-icons/fa";
import Hero from "../../components/layout/Hero";

const Rules = () => {
  const [showArrow, setShowArrow] = useState(true);
  const listRef = useRef(null);

  const scrollToContent = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowArrow(!entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    if (listRef.current) {
      observer.observe(listRef.current);
    }

    return () => {
      if (listRef.current) {
        observer.unobserve(listRef.current);
      }
    };
  }, []);

  const styles = {
    container: {
      backgroundColor: "#121212",
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      position: "relative",
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
      backgroundColor: "rgba(0, 0, 0, 0.5)",
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

  return (
    <div style={styles.container}>
      <Hero />

      {showArrow && (
        <div style={styles.arrowContainer}>
          <button
            style={styles.arrowButton}
            onClick={scrollToContent}
            aria-label="Scroll to rules"
            title="Scroll ke rules"
          >
            <FaChevronDown />
          </button>
        </div>
      )}

      <motion.div
        style={styles.content}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8 } },
        }}
      >
        {/* Pengantar */}
        <motion.h1
          style={styles.title}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Visantara Server Rules
        </motion.h1>
        <motion.p style={styles.paragraph}>
          <i>
            Welcome to Visantara! Please read and follow the rules to ensure a safe and enjoyable experience for everyone.
          </i>
        </motion.p>
        <motion.p style={styles.paragraph}>
          Dengan bergabung ke server ini, kami menganggap bahwa anda setuju dengan <b>Rules</b> yang ada.
        </motion.p>

        {/* Daftar Isi */}
        <motion.div
          style={styles.sectionTitle}
          ref={listRef}
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaListOl size={24} />
          <span>Daftar Isi:</span>
        </motion.div>

        <div style={styles.listContainer}>
          <motion.ul
            style={styles.list}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Gabungan rules, tanpa duplikasi */}
            <li style={styles.listItem}>
              <strong>Respect Others</strong>
              <ul style={styles.list}>
                <li>Selalu hormati sesama pemain dan staf.</li>
                <li>Dilarang melakukan pelecehan, perilaku toksik, atau diskusi yang tidak pantas.</li>
                <li>Dilarang melakukan pelecehan verbal ataupun non-verbal.</li>
                <li>Dilarang melakukan perilaku toxic.</li>
                <li>Dilarang mendiskusikan sesuatu yang tidak pantas.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>No Unauthorized Advertising / No Advertising</strong>
              <ul style={styles.list}>
                <li>Dilarang mempromosikan situs web, Discord, channel YouTube, atau media sosial yang tidak terkait dengan server.</li>
                <li>Hanya konten resmi yang berhubungan dengan Visantara yang diperbolehkan.</li>
                <li>Jangan mempromosikan server lain, produk, atau layanan tanpa izin.</li>
                <li>Hindari menyebarkan link yang tidak relevan.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>Maintain Politeness / Language and Content</strong>
              <ul style={styles.list}>
                <li>Hindari penggunaan bahasa kasar, ofensif, atau tidak pantas, baik di chat maupun voice channel.</li>
                <li>Gunakan bahasa yang sopan dan tidak mengandung unsur SARA.</li>
                <li>Hindari konten yang berbau pornografi, kekerasan, atau diskriminasi.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>No Real Money Trading (RMT)</strong>
              <ul style={styles.list}>
                <li>Dilarang keras memperjualbelikan item atau layanan dalam game dengan uang asli.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>Zero Tolerance for Discrimination</strong>
              <ul style={styles.list}>
                <li>Perlakukan semua orang dengan adil tanpa memandang usia, ras, gender, agama, atau latar belakang lainnya.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>Avoid Drama</strong>
              <ul style={styles.list}>
                <li>Jaga suasana tetap positif dan santai.</li>
                <li>Hindari konflik, debat panas, atau perilaku pasif-agresif. Jika ada masalah, laporkan ke staf.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>No Spamming or Flooding / No Spamming</strong>
              <ul style={styles.list}>
                <li>Jangan mengirim pesan, huruf, simbol, atau emoji secara berlebihan (Berlaku Untuk Nama Item).</li>
                <li>Hindari mengirim pesan berulang-ulang dalam waktu singkat.</li>
                <li>Jangan mengganggu chat dengan spam atau iklan.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>No Cheating / No Hacks, Cheats, or Illegal Clients</strong>
              <ul style={styles.list}>
                <li>Penggunaan cheat, hack, atau modifikasi yang merugikan pemain lain dilarang keras.</li>
                <li>Penggunaan bug atau glitch untuk keuntungan pribadi juga dilarang.</li>
                <li>Menggunakan hack, cheat, atau client ilegal akan berujung pada ban permanen.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>No Scamming</strong>
              <ul style={styles.list}>
                <li>Segala bentuk penipuan atau pencurian akan dihukum dengan tegas.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>No Griefing / Respect Server Resources</strong>
              <ul style={styles.list}>
                <li>Jangan merusak, mencuri, atau mengganggu bangunan maupun barang milik pemain lain.</li>
                <li>Jangan merusak atau mengganggu bangunan milik pemain lain tanpa izin.</li>
                <li>Hindari penggunaan sumber daya server secara berlebihan.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>Keep It Clean / Use Appropriate Names</strong>
              <ul style={styles.list}>
                <li>Dilarang menggunakan konten NSFW pada username, avatar, nama item, dan lainnya.</li>
                <li>Nama pengguna harus sopan dan tidak mengandung kata-kata kasar.</li>
                <li>Hindari penggunaan nama yang menyinggung atau merendahkan orang lain.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>Respect Privacy</strong>
              <ul style={styles.list}>
                <li>Jangan membagikan informasi pribadi pemain lain tanpa izin.</li>
                <li>Hindari meminta informasi pribadi dari pemain lain.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>Follow Staff Instructions</strong>
              <ul style={styles.list}>
                <li>Ikuti instruksi dari staff server.</li>
                <li>Jika ada masalah, laporkan kepada staff dengan sopan.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>Report Issues</strong>
              <ul style={styles.list}>
                <li>Jika menemukan masalah atau pelanggaran, laporkan kepada staff.</li>
                <li>Gunakan fitur report yang tersedia di server.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>Be Responsible</strong>
              <ul style={styles.list}>
                <li>Setiap tindakan memiliki konsekuensi. Bertanggung jawablah atas tindakanmu.</li>
                <li>Jika melanggar aturan, siap menerima sanksi yang diberikan oleh staff.</li>
              </ul>
            </li>
            <li style={styles.listItem}>
              <strong>Use Common Sense</strong>
              <ul style={styles.list}>
                <li>Jika sesuatu terasa salah, kemungkinan besar memang tidak diperbolehkan.</li>
                <li>Bermainlah dengan jujur dan hormat.</li>
              </ul>
            </li>
          </motion.ul>
        </div>

        {/* Penutup */}
        <motion.p style={styles.paragraph}>
          <b>Note:</b> Semua keputusan Staff Visantara bersifat final/mutlak.
        </motion.p>
        <motion.p style={styles.paragraph}>
          Kami akan menindak dengan tegas jika terdapat player yang melanggar <b>Rules</b> yang sudah di tetapkan. Jika anda merasa keberatan terhadap sanksi yang diberikan, silahkan menuju ke <a href="https://discord.com/channels/1224326418461102133/1369539254752903259" target="_blank" rel="noopener noreferrer" style={{ color: "#90caf9" }}>Discord Visantara</a> untuk melakukan aju banding.
        </motion.p>
        <motion.p style={{ ...styles.paragraph, textAlign: "center", color: "#aaa" }}>
          © Visantara 2025<br />
          <span style={{ fontStyle: "italic" }}>Selamat bermain dan bersenang-senang di dunia Visantara!</span>
        </motion.p>
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

export default Rules;
