// Fungsi untuk mengambil produk dari server
async function fetchProducts() {
    try {
        const response = await fetch('/api/get-products');
        const data = await response.json();
        displayProducts(data); // Menampilkan produk yang diambil
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
    }
}

// Fungsi untuk menampilkan produk di halaman
function displayProducts(products) {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = ''; // Kosongkan kontainer produk

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Harga: ${product.price}</p>
        `;
        productContainer.appendChild(productElement);
    });
}

// Fungsi untuk menambah produk baru
async function addProduct(event) {
    event.preventDefault();

    const imageUrl = document.getElementById('imageUrl').value;
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;

    const productData = { imageUrl, name, price };

    try {
        const response = await fetch('/api/add-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        const result = await response.json();
        if (result.message) {
            alert(result.message);
            fetchProducts(); // Ambil data produk setelah ditambahkan
        }
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        alert('Gagal menambahkan produk');
    }
}

// Menjalankan fetchProducts saat halaman dimuat
window.onload = fetchProducts;