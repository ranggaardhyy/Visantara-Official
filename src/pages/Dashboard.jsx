import React, { useState } from "react";

const Dashboard = () => {
    const [username, setUsername] = useState("");
    const [platform, setPlatform] = useState("java");
    const [playerInfo, setPlayerInfo] = useState(null);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setPlayerInfo(null);

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, platform }),
            });

            const data = await response.json();

            if (response.ok) {
                setPlayerInfo(data.player);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Terjadi kesalahan. Coba lagi.");
        }
    };

    // Style Object untuk inline styling
    const containerStyle = {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "16px",
        textAlign: "center",
        color: "#333",
    };

    const headingStyle = {
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "24px",
    };

    const formStyle = {
        marginBottom: "24px",
    };

    const inputStyle = {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "100%",
        marginBottom: "8px",
    };

    const selectStyle = {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "100%",
        marginBottom: "8px",
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "1rem",
    };

    const playerInfoStyle = {
        marginTop: "24px",
        padding: "16px",
        backgroundColor: "#f0f0f0",
        color: "#000",
        borderRadius: "4px",
    };

    const errorStyle = {
        color: "red",
        marginTop: "16px",
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Dashboard</h1>
            {/* Form Login */}
            <form onSubmit={handleLogin} style={formStyle}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan Username Minecraft"
                    style={inputStyle}
                    required
                />
                <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    style={selectStyle}
                >
                    <option value="java">Java Edition</option>
                    <option value="bedrock">Bedrock Edition</option>
                </select>
                <button type="submit" style={buttonStyle}>
                    Login
                </button>
            </form>

            {/* Tampilkan Info Player */}
            {playerInfo && (
                <div style={playerInfoStyle}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Info Player</h2>
                    <p>Username: {playerInfo.username}</p>
                    <p>Platform: {playerInfo.platform}</p>
                    <p>Level: {playerInfo.level}</p>
                    <p>Balance: {playerInfo.balance}</p>
                </div>
            )}

            {/* Tampilkan Error Jika Ada */}
            {error && <p style={errorStyle}>{error}</p>}
        </div>
    );
};

export default Dashboard;