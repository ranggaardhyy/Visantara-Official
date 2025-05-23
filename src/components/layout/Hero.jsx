import { motion } from "framer-motion";
import ServerStatus from "../server/ServerStatus";
import HeroParticles from "../effects/HeroParticles";
import bgImage from "../../assets/images/visantara-bg.jpg";
import logo from "../../assets/images/logo.png";

const Hero = ({ children, blur = 6, overlayOpacity = 0.85, withParticles = true }) => {
  const styles = {
    heroSection: {
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    visantaraBg: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: 0,
    },
    heroParticles: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      zIndex: 3,
      pointerEvents: "none",
    },
    heroOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
      backdropFilter: `blur(${blur}px)`,
      WebkitBackdropFilter: `blur(${blur}px)`,
      zIndex: 2,
    },
    heroContent: {
      position: "relative",
      zIndex: 3,
      color: "#fff",
      maxWidth: "600px",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    heroLogo: {
      width: "230px",
      marginBottom: "20px",
    },
    serverStatusWrapper: {
      marginTop: "40px",
    },
  };

  return (
    <motion.section
      style={styles.heroSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div style={styles.visantaraBg} />

      {withParticles && (
        <div style={styles.heroParticles}>
          <HeroParticles />
        </div>
      )}

      <div style={styles.heroOverlay} />

      <motion.div
        style={styles.heroContent}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          src={logo}
          alt="Logo"
          style={styles.heroLogo}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div style={styles.serverStatusWrapper}>
          <ServerStatus />
        </div>
        {children}
      </motion.div>
    </motion.section>
  );
};

export default Hero;
