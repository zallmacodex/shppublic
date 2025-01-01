document.getElementById('productForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const imageUrl = document.getElementById('imageUrl').value;
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;

    const product = {
        imageUrl,
        name: productName,
        price: productPrice
    };

    // Kirim data ke backend untuk disimpan
    const response = await fetch('/api/add-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    const result = await response.json();
    alert(result.message);

    // Update tampilan produk
    fetchProducts();
});

async function fetchProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();

    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" style="width: 100px; height: 100px;">
            <h3>${product.name}</h3>
            <p>Harga: Rp ${product.price}</p>
        `;
        productList.appendChild(productElement);
    });
}

// Load produk saat halaman pertama kali dimuat
window.onload = fetchProducts;