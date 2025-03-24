// routes/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// GET: Ambil semua pengguna
router.get('/', (req, res) => {
  // Hanya admin yang boleh mengakses, verifikasi sudah dilakukan di middleware di server.js
  req.db.query("SELECT id, name, email, role FROM users", (err, results) => {
    if (err) {
      console.error("Error mengambil data pengguna:", err);
      return res.status(500).json({ message: "Gagal mengambil data pengguna", error: err.message });
    }
    res.json(results);
  });
});

// POST: Tambah pengguna baru
router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  req.db.query(query, [name, email, hashedPassword, role], (err, result) => {
    if (err) {
      console.error("Error menambahkan pengguna:", err);
      return res.status(500).json({ message: "Gagal menambahkan pengguna", error: err.message });
    }
    res.status(201).json({ id: result.insertId, name, email, role });
  });
});

// PUT: Update pengguna
router.put('/:id', async (req, res) => {
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

// DELETE: Hapus pengguna
router.delete('/:id', (req, res) => {
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