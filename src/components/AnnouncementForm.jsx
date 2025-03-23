import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function AnnouncementForm({ onSubmit, editingAnnouncement, setEditingAnnouncement }) {
    const [announcement, setAnnouncement] = useState({ title: "", content: "", image: "" });

    useEffect(() => {
        if (editingAnnouncement) {
            setAnnouncement(editingAnnouncement);
        }
    }, [editingAnnouncement]);

    const handleChange = (e) => {
        setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(announcement);
        setAnnouncement({ title: "", content: "", image: "" });
        setEditingAnnouncement(null);
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "5px", marginBottom: "20px" }}
        >
            <input
                type="text"
                name="title"
                placeholder="Judul"
                value={announcement.title}
                onChange={handleChange}
                style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <textarea
                name="content"
                placeholder="Isi Pengumuman"
                value={announcement.content}
                onChange={handleChange}
                style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <input
                type="text"
                name="image"
                placeholder="URL Gambar"
                value={announcement.image}
                onChange={handleChange}
                style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
                {editingAnnouncement ? "Update" : "Tambah"}
            </button>
            {editingAnnouncement && (
                <button
                    type="button"
                    style={{ padding: "10px 15px", backgroundColor: "#6c757d", color: "#fff", border: "none", marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => setEditingAnnouncement(null)}
                >
                    Batal
                </button>
            )}
        </motion.form>
    );
}

export default AnnouncementForm;