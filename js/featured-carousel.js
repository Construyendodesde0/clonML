class FeaturedCarousel {
    constructor() {
        this.track = document.querySelector('.featured-track');
        if (!this.track) return;
        
        this.prevBtn = document.querySelector('.featured-prev');
        this.nextBtn = document.querySelector('.featured-next');
        this.products = [];
        
        this.init();
    }
    
    async init() {
        await this.fetchProducts();
        this.renderProducts();
        this.setupEventListeners();
    }
    
    async fetchProducts() {
        // Simular fetch de productos
        this.products = [
            {id: 1, name: "Smartwatch Pro", price: 149.99, image: "assets/images/product1.jpg", discount: 25},
            // Más productos...
        ];
    }
    
    renderProducts() {
        this.track.innerHTML = this.products.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.discount ? `<div class="product-badge">${product.discount}% OFF</div>` : ''}
                </div>
                <div class="product-info">
                    <div class="product-title">${product.name}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn">Agregar</button>
                </div>
            </div>
        `).join('');
    }
    
    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => {
            this.track.scrollBy({left: -250, behavior: 'smooth'});
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.track.scrollBy({left: 250, behavior: 'smooth'});
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FeaturedCarousel();
});