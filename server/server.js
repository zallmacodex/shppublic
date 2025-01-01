const express = require('express');
const app = express();

app.use(express.json()); // Untuk parsing JSON

// Penyimpanan produk di memori
let products = [];

// Mengambil data produk
app.get('/api/get-products', (req, res) => {
    res.json(products); // Mengirim produk sebagai response JSON
});

// Menambahkan produk baru
app.post('/api/add-product', (req, res) => {
    const { imageUrl, name, price } = req.body;

    // Validasi input
    if (!imageUrl || !name || !price) {
        return res.status(400).json({ message: 'Semua kolom harus diisi!' });
    }

    const newProduct = { imageUrl, name, price };
    products.push(newProduct); // Menyimpan produk baru dalam memori

    res.json({ message: 'Produk berhasil ditambahkan!' });
});

// Menjalankan server pada port 3000
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});