import React, { useState, useEffect } from "react";
import axios from "axios";

function PlayerInfo({ username }) {
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/player/${username}`)
            .then(response => {
                setPlayer(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.response ? error.response.data.message : "Error fetching data");
                setLoading(false);
            });
    }, [username]);

    if (loading) return <p>Loading player info...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="bg-gray-800 p-5 rounded-lg text-center shadow-md">
            <h3 className="text-xl font-semibold text-white">{player.username}</h3>
            <p className="text-green-400">Rank: {player.rank}</p>
            <p className="text-yellow-400">Balance: {player.balance} Coins</p>
        </div>
    );
}

export default PlayerInfo;