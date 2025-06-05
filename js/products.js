// Base de datos de productos (mock)
const productsDB = [
    {
        id: 1,
        name: "Smartphone X5",
        price: 299.99,
        category: "electronics",
        description: "Smartphone de última generación con cámara triple de 48MP y pantalla AMOLED de 6.5 pulgadas.",
        images: ["phone1.jpg", "phone2.jpg"]
    },
    {
        id: 2,
        name: "Zapatos Running Pro",
        price: 49.99,
        category: "sports",
        description: "Zapatillas deportivas para running con amortiguación de alta calidad y suela antideslizante.",
        images: ["shoes1.jpg", "shoes2.jpg"]
    },
    {
        id: 3,
        name: "Laptop UltraSlim",
        price: 899.99,
        category: "electronics",
        description: "Laptop ultradelgada con procesador de última generación y 8GB de RAM, perfecta para trabajo y estudio.",
        images: ["laptop1.jpg", "laptop2.jpg"]
    },
    {
        id: 4,
        name: "Camiseta Deportiva",
        price: 19.99,
        category: "clothing",
        description: "Camiseta transpirable para deportes, fabricada con materiales de alta calidad y secado rápido.",
        images: ["shirt1.jpg", "shirt2.jpg"]
    }
];

// Función para cargar detalles de producto
function loadProductDetail() {
    if (!window.location.pathname.includes('detalle-producto.html')) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = productsDB.find(p => p.id === productId);
    
    if (!product) return;
    
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.querySelector('.product-description').textContent = product.description;
    
    const gallery = document.querySelector('.product-gallery');
    gallery.innerHTML = product.images.map(img => `
        <img src="assets/images/${img}" alt="${product.name}">
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadProductDetail);