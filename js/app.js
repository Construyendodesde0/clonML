// Función para cargar productos en el grid
function loadProducts(containerSelector, products) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">$${product.price.toFixed(2)}</div>
                <a href="detalle-producto.html?id=${product.id}">Ver detalle</a>
            </div>
        </div>
    `).join('');
}

// Función para cargar categorías
function loadCategories() {
    const categoryGrid = document.querySelector('.category-grid');
    const categoryFilter = document.getElementById('category-filter');
    
    if (!categoryGrid && !categoryFilter) return;
    
    const categories = [
        {id: 'electronics', name: 'Electrónica'},
        {id: 'clothing', name: 'Ropa'},
        {id: 'home', name: 'Hogar'},
        {id: 'sports', name: 'Deportes'}
    ];
    
    if (categoryGrid) {
        categoryGrid.innerHTML = categories.map(cat => `
            <div class="category-card">
                <h3>${cat.name}</h3>
            </div>
        `).join('');
    }
    
    if (categoryFilter) {
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            categoryFilter.appendChild(option);
        });
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Cargar productos destacados en el home
    if (document.querySelector('.featured-products .product-grid')) {
        loadProducts('.featured-products .product-grid', [
            {id: 1, name: "Smartphone X5", price: 299.99, image: "assets/images/phone.jpg"},
            {id: 2, name: "Zapatos Running", price: 49.99, image: "assets/images/shoes.jpg"},
            {id: 3, name: "Laptop Pro", price: 899.99, image: "assets/images/laptop.jpg"},
            {id: 4, name: "Camiseta Deportiva", price: 19.99, image: "assets/images/shirt.jpg"}
        ]);
    }
    
    // Cargar categorías
    loadCategories();
});