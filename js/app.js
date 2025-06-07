// Función para cargar productos en el grid
function loadProducts(containerSelector, products) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.discount ? `<div class="product-badge">${product.discount}% OFF</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-shipping">Envío gratis</div>
                <div class="product-rating">
                    <div class="stars">★★★★★</div>
                    <span>(${product.rating})</span>
                </div>
                <button class="add-to-cart-btn" data-id="${product.id}">Agregar al carrito</button>
            </div>
        </div>
    `).join('');
    
    // Agregar event listeners a los botones
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const product = productsDB.find(p => p.id === productId);
            if (product) {
                cart.addItem(product);
                updateCartCount();
                alert(`${product.name} añadido al carrito`);
            }
        });
    });
}

// Función para actualizar contador del carrito
function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(el => {
        el.textContent = cart.items.reduce((total, item) => total + item.quantity, 0);
    });
}

// Inicializar contador del carrito al cargar
document.addEventListener('DOMContentLoaded', () => {
    cart.loadFromLocalStorage();
    updateCartCount();

});

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

// Función para inicializar el carrusel
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!track) return;
    
    // Cargar productos en el carrusel (usaremos los mismos destacados)
    loadProducts('.carousel-track', [
        {id: 1, name: "Smartphone X5", price: 299.99, image: "assets/images/phone.jpg", discount: 15, rating: 4.5},
        {id: 2, name: "Zapatos Running", price: 49.99, image: "assets/images/shoes.jpg", discount: 30, rating: 4.2},
        {id: 3, name: "Laptop Pro", price: 899.99, image: "assets/images/laptop.jpg", rating: 4.8},
        {id: 4, name: "Camiseta Deportiva", price: 19.99, image: "assets/images/shirt.jpg", discount: 20, rating: 4.0},
        {id: 5, name: "Smart TV 55\"", price: 499.99, image: "assets/images/tv.jpg", discount: 10, rating: 4.6},
        {id: 6, name: "Auriculares Bluetooth", price: 79.99, image: "assets/images/headphones.jpg", rating: 4.3}
    ]);
    
    // Funcionalidad de navegación
    prevBtn.addEventListener('click', () => {
        track.scrollBy({left: -250, behavior: 'smooth'});
    });
    
    nextBtn.addEventListener('click', () => {
        track.scrollBy({left: 250, behavior: 'smooth'});
    });
}

// Inicializar carrusel en el home
if (document.querySelector('.products-carousel')) {
    document.addEventListener('DOMContentLoaded', initCarousel);
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