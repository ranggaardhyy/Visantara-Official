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

    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Form Login */}
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan Username Minecraft"
                    className="px-4 py-2 border rounded w-full"
                    required
                />

                <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="px-4 py-2 border rounded w-full"
                >
                    <option value="java">Java Edition</option>
                    <option value="bedrock">Bedrock Edition</option>
                </select>

                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded"
                >
                    Login
                </button>
            </form>

            {/* Tampilkan Info Player */}
            {playerInfo && (
                <div className="mt-6 p-4 bg-gray-800 text-white rounded">
                    <h2 className="text-xl font-semibold">Info Player</h2>
                    <p>Username: {playerInfo.username}</p>
                    <p>Platform: {playerInfo.platform}</p>
                    <p>Level: {playerInfo.level}</p>
                    <p>Balance: {playerInfo.balance}</p>
                </div>
            )}

            {/* Tampilkan Error Jika Ada */}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default Dashboard;