require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());

// Tambahkan limit payload 50MB
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Buat koneksi database
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

// Tambahkan middleware untuk menyisipkan objek db ke req
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Secret key JWT
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Middleware untuk verifikasi token (admin)
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token)
    return res.status(403).json({ message: "Token tidak disediakan" });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Token tidak valid" });
    }
    req.user = decoded;
    next();
  });
};

// ------------------- AUTH ENDPOINT -------------------
// LOGIN ADMIN
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password harus diisi" });
  }
  const query = "SELECT * FROM users WHERE username = ? AND role = 'admin'";
  req.db.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Error saat login admin:", err);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Akun tidak ditemukan" });
    }
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Akun Tidak Ditemukan" });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ message: "Login berhasil", token });
  });
});

// ------------------- ROUTES -------------------
// Import router untuk pengguna dan pengumuman
const userRoutes = require('./routes/users');
const announcementRoutes = require('./routes/announcements');

// Gunakan router dengan middleware verifikasi token untuk endpoint yang memerlukan hak admin
app.use('/api/users', verifyToken, userRoutes);
app.use('/api/announcements', announcementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});