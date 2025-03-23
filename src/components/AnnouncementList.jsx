import React from "react";
import { motion } from "framer-motion";

function AnnouncementList({ announcements, onEdit, onDelete }) {
    return (
        <div>
            {announcements.map((announcement) => (
                <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "5px", marginBottom: "10px" }}
                >
                    <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>{announcement.title}</h3>
                    <p>{announcement.content}</p>
                    {announcement.image && <img src={announcement.image} alt="Announcement" style={{ width: "150px", marginTop: "10px" }} />}
                    <div style={{ marginTop: "10px" }}>
                        <button
                            onClick={() => onEdit(announcement)}
                            style={{ padding: "10px", backgroundColor: "#ffc107", color: "#000", border: "none", cursor: "pointer", marginRight: "5px" }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(announcement.id)}
                            style={{ padding: "10px", backgroundColor: "#dc3545", color: "#fff", border: "none", cursor: "pointer" }}
                        >
                            Hapus
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default AnnouncementList;