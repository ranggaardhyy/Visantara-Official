// routes/announcements.js
const express = require('express');
const router = express.Router();

// GET: Ambil semua pengumuman (diurutkan berdasarkan created_at secara menurun)
router.get('/', (req, res) => {
  const query = "SELECT * FROM announcements ORDER BY created_at DESC";
  req.db.query(query, (err, results) => {
    if (err) {
      console.error("Error mengambil pengumuman:", err);
      return res.status(500).json({ message: "Gagal mengambil data pengumuman", error: err.message });
    }
    res.json(results);
  });
});

// POST: Tambah pengumuman baru
router.post('/', (req, res) => {
  const { title, content, image, created_by } = req.body;
  if (!title || !content || !created_by) {
    return res.status(400).json({ message: "Judul, isi, dan pembuat pengumuman harus diisi" });
  }
  const query = "INSERT INTO announcements (title, content, image, created_by) VALUES (?, ?, ?, ?)";
  req.db.query(query, [title, content, image || "", created_by], (err, result) => {
    if (err) {
      console.error("Error menambah pengumuman:", err);
      return res.status(500).json({ message: "Gagal menambah pengumuman", error: err.message });
    }
    const newAnnouncement = { id: result.insertId, title, content, image: image || "", created_by };
    res.status(201).json(newAnnouncement);
  });
});

// PUT: Update pengumuman (dengan JSON payload, tanpa multer)
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, image, created_by } = req.body;
  
  if (!title || !content || !created_by) {
    return res.status(400).json({ message: "Judul, isi, dan pembuat pengumuman harus diisi" });
  }
  
  const query = "UPDATE announcements SET title = ?, content = ?, image = ?, created_by = ? WHERE id = ?";
  req.db.query(query, [title, content, image || "", created_by, id], (err, result) => {
    if (err) {
      console.error("Error mengupdate pengumuman:", err);
      return res.status(500).json({ message: "Gagal mengupdate pengumuman", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pengumuman tidak ditemukan" });
    }
    res.json({ id: Number(id), title, content, image: image || "", created_by });
  });
});

// DELETE: Hapus pengumuman
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM announcements WHERE id = ?";
  req.db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error menghapus pengumuman:", err);
      return res.status(500).json({ message: "Gagal menghapus pengumuman", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pengumuman tidak ditemukan" });
    }
    res.status(204).send();
  });
});

module.exports = router;