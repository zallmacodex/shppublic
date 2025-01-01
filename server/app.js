const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json()); // Untuk parsing JSON

const PRODUCTS_FILE = path.join(__dirname, 'produk.json');

// Mengambil data produk
app.get('/api/get-products', (req, res) => {
    fs.readFile(PRODUCTS_FILE, 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Gagal mengambil produk' });
        res.json(JSON.parse(data)); // Mengirim produk sebagai response JSON
    });
});

// Menambahkan produk baru
app.post('/api/add-product', (req, res) => {
    const { imageUrl, name, price } = req.body;

    if (!imageUrl || !name || !price) {
        return res.status(400).json({ message: 'Semua kolom harus diisi!' });
    }

    const newProduct = { imageUrl, name, price };
    fs.readFile(PRODUCTS_FILE, 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Gagal membaca file produk' });

        const products = JSON.parse(data);
        products.push(newProduct);

        fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8', (err) => {
            if (err) return res.status(500).json({ message: 'Gagal menyimpan produk' });
            res.json({ message: 'Produk berhasil ditambahkan!' });
        });
    });
});

app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));