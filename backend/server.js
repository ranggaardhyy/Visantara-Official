require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

// Secret key JWT
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// 🔹 LOGIN ADMIN
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username dan password harus diisi" });
    }

    const query = "SELECT * FROM users WHERE username = ? AND role = 'admin'";
    db.query(query, [username], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(401).json({ message: "Akun admin tidak ditemukan" });
        }

        const user = results[0];

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password salah" });
        }

        // Buat token JWT untuk sesi login
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Login berhasil", token });
    });
});

// 🔹 Middleware untuk Admin
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: "Token tidak disediakan" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token tidak valid" });
        }
        req.user = decoded;
        next();
    });
};

// 🔹 Halaman Admin (Hanya Bisa diakses oleh Admin)
app.get('/admin', verifyToken, (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Akses ditolak, hanya admin yang bisa mengakses!" });
    }
    res.json({ message: "Selamat datang di panel admin!", user: req.user });
});

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
