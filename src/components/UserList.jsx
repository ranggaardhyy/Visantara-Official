// UserList.jsx
import React from "react";
import { motion } from "framer-motion";

function UserList({ users, onEdit, onDelete }) {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Users</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {users.map((user) => (
                    <motion.li 
                        key={user.id} 
                        style={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            padding: "10px", 
                            marginBottom: "5px", 
                            background: "#f4f4f4", 
                            borderRadius: "5px" 
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span>{user.name} - {user.email} - {user.role}</span>
                        <div>
                            <button style={{ marginRight: "5px", padding: "5px 10px", cursor: "pointer" }} onClick={() => onEdit(user)}>Edit</button>
                            <button style={{ padding: "5px 10px", cursor: "pointer", background: "red", color: "white", border: "none", borderRadius: "3px" }} onClick={() => onDelete(user.id)}>Delete</button>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;