import React from "react";
import { FaFileContract } from "react-icons/fa";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div style={styles.container}>
      <motion.div
        style={styles.content}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={styles.title}>
          <FaFileContract style={styles.icon} />
          Terms and Conditions
        </h1>
        <p style={styles.text}>
          Welcome to our website. By accessing our services, you agree to the following terms. 
          Please read them carefully before using our platform.
        </p>
        <p style={styles.text}>
          1. Usage: You may not use this service for illegal purposes.
          <br />
          2. Liability: We do not take responsibility for any user-generated content.
          <br />
          3. Changes: We reserve the right to modify these terms at any time.
        </p>
        <p style={styles.text}>
          If you have any questions, feel free to contact us. Thank you for understanding!
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

export default Terms;