// routes/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Middleware untuk validasi input
const validateUserInput = [
  body('name').trim().isLength({ min: 3 }).withMessage('Nama minimal 3 karakter'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
  body('role').isIn(['admin', 'user']).withMessage('Role hanya boleh admin atau user')
];

// ✅ GET: Ambil semua pengguna (Hanya Admin)
router.get('/', (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Akses ditolak, hanya admin yang dapat melihat data pengguna." });
  }

  const query = "SELECT id, name, email, role FROM users";
  req.db.query(query, (err, results) => {
    if (err) {
      console.error("Error mengambil data pengguna:", err);
      return res.status(500).json({ message: "Gagal mengambil data pengguna", error: err.message });
    }
    res.json(results);
  });
});

// ✅ POST: Tambah Pengguna Baru (Hanya Admin)
router.post('/', validateUserInput, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Akses ditolak, hanya admin yang dapat menambah pengguna." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Gunakan prepared statement
    const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    req.db.query(query, [name, email, hashedPassword, role], (err, result) => {
      if (err) {
        console.error("Error menambahkan pengguna:", err);
        return res.status(500).json({ message: "Gagal menambahkan pengguna", error: err.message });
      }
      res.status(201).json({ id: result.insertId, name, email, role });
    });

  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat hashing password." });
  }
});

// ✅ PUT: Update Data Pengguna (Hanya Admin)
router.put('/:id', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Akses ditolak, hanya admin yang dapat mengupdate data pengguna." });
  }

  const { id } = req.params;
  const { name, email, role } = req.body;

  const query = "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?";
  req.db.query(query, [name, email, role, id], (err, result) => {
    if (err) {
      console.error("Error mengupdate pengguna:", err);
      return res.status(500).json({ message: "Gagal mengupdate pengguna", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
    res.json({ id: Number(id), name, email, role });
  });
});

// ✅ DELETE: Hapus Pengguna (Hanya Admin)
router.delete('/:id', (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Akses ditolak, hanya admin yang dapat menghapus pengguna." });
  }

  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  req.db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error menghapus pengguna:", err);
      return res.status(500).json({ message: "Gagal menghapus pengguna", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
    res.status(204).send();
  });
});

module.exports = router;