import { useRef, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Hero from "../../components/layout/Hero";
import Announcement from "../../components/layout/Announcement";

const Home = () => {
  const announcementRef = useRef(null);
  const [showArrow, setShowArrow] = useState(true);

  const scrollToAnnouncement = () => {
    announcementRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowArrow(!entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (announcementRef.current) observer.observe(announcementRef.current);

    return () => {
      if (announcementRef.current) observer.unobserve(announcementRef.current);
    };
  }, []);

  return (
    <>
      <Hero withParticles={true} />

      {showArrow && (
        <div style={styles.arrowContainer}>
          <button
            style={styles.arrowButton}
            onClick={scrollToAnnouncement}
            aria-label="Scroll to announcement"
            title="Scroll ke pengumuman"
          >
            <FaChevronDown />
          </button>
        </div>
      )}

      <div ref={announcementRef}>
        <Announcement />
      </div>

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
    </>
  );
};

const styles = {
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
};

export default Home;