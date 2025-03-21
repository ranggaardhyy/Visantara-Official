import { useState, useEffect } from "react";

const SERVER_IP = "play.alwination.id"; // Ganti dengan IP server kamu

const ServerStatus = () => {
    const [players, setPlayers] = useState(null);
    const [status, setStatus] = useState("Checking...");

    useEffect(() => {
        const fetchServerStatus = async () => {
            try {
                const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
                const data = await response.json();

                if (data.online) {
                    setPlayers(`${data.players.online}/${data.players.max}`);
                    setStatus("Online ✅");
                } else {
                    setPlayers(null);
                    setStatus("Offline ❌");
                }
            } catch (error) {
                setStatus("Error ❌");
                setPlayers(null);
            }
        };

        fetchServerStatus();
        const interval = setInterval(fetchServerStatus, 5000); // Update setiap 5 detik

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="text-center py-10">
            <h3 className="text-2xl font-semibold">Server Status</h3>
            <p className="mt-2">Status: <span className="font-bold">{status}</span></p>
            <p>Online Players: <span className="text-green-400">{players || "N/A"}</span></p>
            <p>Server IP: <span className="font-mono bg-gray-700 px-2 py-1 rounded">{SERVER_IP}</span></p>
        </section>
    );
};

export default ServerStatus;