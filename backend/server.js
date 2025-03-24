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

// Middleware untuk verifikasi token (admin)
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: "Token tidak disediakan" });
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token tidak valid" });
        req.user = decoded;
        next();
    });
};

// ------------------- LOGIN ADMIN -------------------
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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password salah" });
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ message: "Login berhasil", token });
    });
});

// ------------------- USER ENDPOINTS -------------------

// GET: Ambil semua pengguna
app.get('/api/users', verifyToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Akses ditolak, hanya admin yang bisa mengakses!" });
    }
    db.query("SELECT id, name, email, role FROM users", (err, results) => {
        if (err) return res.status(500).json({ message: "Gagal mengambil data pengguna", error: err.message });
        res.json(results);
    });
});

// POST: Tambah pengguna baru
app.post('/api/users', verifyToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Akses ditolak, hanya admin yang bisa mengakses!" });
    }
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Semua field harus diisi" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(query, [name, email, hashedPassword, role], (err, result) => {
        if (err) return res.status(500).json({ message: "Gagal menambahkan pengguna", error: err.message });
        res.status(201).json({ id: result.insertId, name, email, role });
    });
});

// PUT: Update pengguna
app.put('/api/users/:id', verifyToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Akses ditolak, hanya admin yang bisa mengakses!" });
    }
    const { id } = req.params;
    const { name, email, role } = req.body;
    const query = "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?";
    db.query(query, [name, email, role, id], (err, result) => {
        if (err) return res.status(500).json({ message: "Gagal mengupdate pengguna", error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pengguna tidak ditemukan" });
        }
        res.json({ id: Number(id), name, email, role });
    });
});

// DELETE: Hapus pengguna
app.delete('/api/users/:id', verifyToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Akses ditolak, hanya admin yang bisa mengakses!" });
    }
    const { id } = req.params;
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Gagal menghapus pengguna", error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pengguna tidak ditemukan" });
        }
        res.status(204).send();
    });
});

// ------------------- ANNOUNCEMENT ENDPOINTS -------------------

// GET: Ambil semua pengumuman
app.get('/api/announcements', (req, res) => {
    const query = "SELECT * FROM announcements";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: "Gagal mengambil data pengumuman", error: err.message });
        res.json(results);
    });
});

// POST: Tambah pengumuman baru
app.post('/api/announcements', (req, res) => {
    const { title, content, image, created_by } = req.body;
    if (!title || !content || !created_by) {
        return res.status(400).json({ message: "Judul, isi, dan pembuat pengumuman harus diisi" });
    }
    const query = "INSERT INTO announcements (title, content, image, created_by) VALUES (?, ?, ?, ?)";
    db.query(query, [title, content, image || "", created_by], (err, result) => {
        if (err) return res.status(500).json({ message: "Gagal menambah pengumuman", error: err.message });
        const newAnnouncement = { id: result.insertId, title, content, image: image || "", created_by };
        res.status(201).json(newAnnouncement);
    });
});

// PUT: Update pengumuman
app.put('/api/announcements/:id', (req, res) => {
    const { id } = req.params;
    const { title, content, image, created_by } = req.body;
    const query = "UPDATE announcements SET title = ?, content = ?, image = ?, created_by = ? WHERE id = ?";
    db.query(query, [title, content, image || "", created_by, id], (err, result) => {
        if (err) return res.status(500).json({ message: "Gagal mengupdate pengumuman", error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pengumuman tidak ditemukan" });
        }
        res.json({ id: Number(id), title, content, image: image || "", created_by });
    });
});

// DELETE: Hapus pengumuman
app.delete('/api/announcements/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM announcements WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Gagal menghapus pengumuman", error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pengumuman tidak ditemukan" });
        }
        res.status(204).send();
    });
});

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});