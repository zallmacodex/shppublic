const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware untuk meng-handle JSON request body
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Fungsi untuk membaca produk dari file JSON
const getProducts = () => {
    const data = fs.readFileSync(path.join(__dirname, 'produk.json'), 'utf8');
    return JSON.parse(data);
};

// Fungsi untuk menyimpan produk ke file JSON
const saveProducts = (products) => {
    fs.writeFileSync(path.join(__dirname, 'produk.json'), JSON.stringify(products, null, 2));
};

// API untuk mendapatkan produk
app.get('/api/products', (req, res) => {
    const products = getProducts();
    res.json(products);
});

// API untuk menambah produk
app.post('/api/add-product', (req, res) => {
    const { imageUrl, name, price } = req.body;

    if (!imageUrl || !name || !price) {
        return res.status(400).json({ message: 'Semua kolom harus diisi!' });
    }

    const newProduct = { imageUrl, name, price };
    const products = getProducts();
    products.push(newProduct);
    saveProducts(products);

    res.json({ message: 'Produk berhasil ditambahkan!' });
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});