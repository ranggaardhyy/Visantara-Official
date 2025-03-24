import React, { useState, useEffect } from "react";
import AnnouncementList from "../../components/AnnouncementList";
import AnnouncementForm from "../../components/AnnouncementForm";
import UserList from "../../components/UserList";
import UserForm from "../../components/UserForm";

function AdminDashboard() {
    const [announcements, setAnnouncements] = useState([]);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/announcements")
            .then((res) => res.json())
            .then((data) => setAnnouncements(data))
            .catch((err) => console.error("Error:", err));

        fetch("http://localhost:5000/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
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

    const addUser = async (user) => {
        const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const newUser = await response.json();
            setUsers([...users, newUser]);
        }
    };

    const updateUser = async (user) => {
        const response = await fetch(`http://localhost:5000/users/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            setUsers(users.map((u) => (u.id === user.id ? user : u)));
            setEditingUser(null);
        }
    };

    const deleteUser = async (id) => {
        const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setUsers(users.filter((u) => u.id !== id));
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

            <UserForm
                onSubmit={editingUser ? updateUser : addUser}
                editingUser={editingUser}
                setEditingUser={setEditingUser}
            />

            <UserList
                users={users}
                onEdit={(user) => setEditingUser(user)}
                onDelete={deleteUser}
            />
        </div>
    );
}

export default AdminDashboard;