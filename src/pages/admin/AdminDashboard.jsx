import React, { useState, useEffect } from "react";
import AnnouncementList from "../../components/AnnouncementList";
import AnnouncementForm from "../../components/AnnouncementForm";

function AdminDashboard() {
    const [announcements, setAnnouncements] = useState([]);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/announcements")
            .then((res) => res.json())
            .then((data) => setAnnouncements(data))
            .catch((err) => console.error("Error:", err));
    }, []);

    const addAnnouncement = async (announcement) => {
        const response = await fetch("http://localhost:5000/announcements", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(announcement),
        });

        if (response.ok) {
            const newAnnouncement = await response.json();
            setAnnouncements([...announcements, newAnnouncement]);
        }
    };

    const updateAnnouncement = async (announcement) => {
        const response = await fetch(`http://localhost:5000/announcements/${announcement.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(announcement),
        });

        if (response.ok) {
            setAnnouncements(announcements.map((a) => (a.id === announcement.id ? announcement : a)));
            setEditingAnnouncement(null);
        }
    };

    const deleteAnnouncement = async (id) => {
        const response = await fetch(`http://localhost:5000/announcements/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setAnnouncements(announcements.filter((a) => a.id !== id));
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>Admin Dashboard</h2>

            <AnnouncementForm
                onSubmit={editingAnnouncement ? updateAnnouncement : addAnnouncement}
                editingAnnouncement={editingAnnouncement}
                setEditingAnnouncement={setEditingAnnouncement}
            />

            <AnnouncementList
                announcements={announcements}
                onEdit={(announcement) => setEditingAnnouncement(announcement)}
                onDelete={deleteAnnouncement}
            />
        </div>
    );
}

export default AdminDashboard;