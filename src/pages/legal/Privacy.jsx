import React from "react";
import { FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div style={styles.container}>
      <motion.div
        style={styles.content}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={styles.title}>
          <FaUserShield style={styles.icon} />
          Privacy Policy
        </h1>
        <p style={styles.text}>
          Your privacy is important to us. This policy explains how we collect and use your data. 
          By using our platform, you agree to this policy.
        </p>
        <p style={styles.text}>
          1. Data Collection: We collect personal data only with your consent.
          <br />
          2. Data Usage: We use the collected data to improve our services.
          <br />
          3. Cookies: We use cookies to personalize your experience.
        </p>
        <p style={styles.text}>
          If you have any questions or concerns about our privacy practices, please contact us.
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

export default Privacy;