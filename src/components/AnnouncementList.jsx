import React from "react";
import { motion } from "framer-motion";
import AnnouncementItem from "./AnnouncementItem";

const AnnouncementList = ({ announcements, onEdit, onDelete }) => {
  return (
    <div style={styles.container}>
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnnouncementItem
              announcement={announcement}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))
      ) : (
        <p style={styles.emptyText}>Tidak ada pengumuman untuk ditampilkan.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    margin: "20px",
  },
  emptyText: {
    fontStyle: "italic",
    color: "#aaa",
    textAlign: "center",
  },
};

export default AnnouncementList;