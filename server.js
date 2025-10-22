const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Data sementara (dummy)
let users = [
  { id: 1, name: 'Andi Aryanto', email: 'andi@example.com' },
  { id: 2, name: 'Hakim', email: 'hakim@example.com' },
  { id: 3, name: 'Najmi', email: 'najmi@example.com' }
];

// GET – tampilkan semua user
app.get('/users', (req, res) => {
  res.json(users);
});

// POST – tambah user baru
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.json({ message: 'User berhasil ditambahkan!', user: newUser });
});

// PUT – update seluruh data user
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: 'User tidak ditemukan!' });

  user.name = req.body.name;
  user.email = req.body.email;
  res.json({ message: 'User berhasil diupdate!', user });
});

// PATCH – update sebagian data user
app.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: 'User tidak ditemukan!' });

  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;

  res.json({ message: 'User berhasil diupdate sebagian!', user });
});

// DELETE – hapus user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: 'User tidak ditemukan!' });

  users.splice(index, 1);
  res.json({ message: 'User berhasil dihapus!' });
});

app.listen(port, () => {
  console.log('Server running on http://localhost:${port}');
});