// Funciones del carrito
const cart = {
    items: [],
    
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToLocalStorage();
        this.updateCartUI();
    },
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToLocalStorage();
        this.updateCartUI();
    },
    
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveToLocalStorage();
                this.updateCartUI();
            }
        }
    },
    
    calculateTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    },
    
    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    },
    
    loadFromLocalStorage() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
    },
    
    updateCartUI() {
        if (!document.querySelector('.cart-items')) return;
        
        const cartItems = document.querySelector('.cart-items');
        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="assets/images/${item.images[0]}" alt="${item.name}">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <div class="price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="item-quantity">
                    <input type="number" min="1" value="${item.quantity}" 
                           data-id="${item.id}">
                </div>
                <div class="item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <button class="remove-item" data-id="${item.id}">Eliminar</button>
            </div>
        `).join('');
        
        document.getElementById('subtotal').textContent = 
            `$${this.calculateTotal().toFixed(2)}`;
        document.getElementById('total').textContent = 
            `$${this.calculateTotal().toFixed(2)}`;
        
        // Event listeners
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.removeItem(productId);
            });
        });
        
        document.querySelectorAll('.item-quantity input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = parseInt(e.target.dataset.id);
                const quantity = parseInt(e.target.value);
                this.updateQuantity(productId, quantity);
            });
        });
    }
};

// Inicializar carrito
document.addEventListener('DOMContentLoaded', () => {
    cart.loadFromLocalStorage();
    cart.updateCartUI();
    
    // Evento para botones "Agregar al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            // Obtener detalles del producto actual
            const productId = 1; // Esto debería venir de la página
            const product = productsDB.find(p => p.id === productId);
            if (product) {
                cart.addItem(product);
                alert(`${product.name} añadido al carrito`);
            }
        });
    });
});