import React from "react";
import { FaCookieBite } from "react-icons/fa";
import { motion } from "framer-motion";

const Cookies = () => {
  return (
    <div style={styles.container}>
      <motion.div
        style={styles.content}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={styles.title}>
          <FaCookieBite style={styles.icon} />
          Cookie Notice
        </h1>
        <p style={styles.text}>
          We use cookies to enhance your experience on our platform. By continuing to use our services, you agree to our use of cookies.
        </p>
        <p style={styles.text}>
          1. What are Cookies: Cookies are small text files stored on your device to help us remember your preferences.
          <br />
          2. Types of Cookies: We use session cookies and persistent cookies for authentication and analytics.
        </p>
        <p style={styles.text}>
          You can disable cookies in your browser settings, but some features of our platform may not function properly without them.
        </p>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#111",
    minHeight: "100vh",
    padding: "50px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  content: {
    maxWidth: "800px",
    color: "#ccc",
    textAlign: "left",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    color: "#ffcc00",
    marginRight: "10px",
    fontSize: "30px",
  },
  text: {
    fontSize: "14px",
    lineHeight: "1.6",
    marginBottom: "15px",
  },
};

export default Cookies;