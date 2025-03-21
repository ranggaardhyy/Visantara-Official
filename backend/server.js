require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Tambahan route untuk root
app.get("/", (req, res) => {
    res.send("API Server berjalan!");
});

// Endpoint untuk login
app.post('/login', (req, res) => {
    const { username, platform } = req.body;

    if (!username || !platform) {
        return res.status(400).json({ message: "Username dan platform harus diisi" });
    }

    const query = "SELECT * FROM players WHERE username = ? AND platform = ?";
    db.query(query, [username, platform], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            res.json({ message: "Login berhasil", player: results[0] });
        } else {
            res.status(401).json({ message: "Player tidak ditemukan" });
        }
    });
});

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});