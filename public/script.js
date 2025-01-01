// Mendapatkan elemen-elemen yang diperlukan
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

// Fungsi untuk mengambil produk dari API
async function fetchProducts() {
    try {
        const response = await fetch('/api/get-products');
        if (!response.ok) {
            throw new Error('Gagal mengambil data produk');
        }
        const products = await response.json(); // Parsing response JSON

        // Menampilkan produk dalam bentuk daftar
        productList.innerHTML = ''; // Bersihkan daftar sebelumnya
        products.forEach(product => {
            const productItem = document.createElement('li');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>Harga: Rp ${product.price}</p>
            `;
            productList.appendChild(productItem); // Menambahkan produk ke daftar
        });
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
        alert('Gagal mengambil produk, coba lagi nanti.');
    }
}

// Memanggil fetchProducts saat halaman pertama kali dimuat
fetchProducts();

// Fungsi untuk menambahkan produk
productForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Menghindari refresh halaman

    const imageUrl = document.getElementById('imageUrl').value;
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;

    // Validasi input
    if (!imageUrl || !name || !price) {
        alert('Semua kolom harus diisi!');
        return;
    }

    const product = {
        imageUrl,
        name,
        price: parseInt(price, 10) // Mengubah harga menjadi integer
    };

    try {
        // Mengirim data produk ke backend
        const response = await fetch('/api/add-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error('Gagal menambahkan produk');
        }

        const result = await response.json();
        alert(result.message); // Menampilkan pesan sukses

        // Menyegarkan daftar produk
        fetchProducts(); // Ambil kembali produk dari backend dan tampilkan

        // Mengosongkan form
        productForm.reset();

    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        alert('Terjadi kesalahan, coba lagi.');
    }
});