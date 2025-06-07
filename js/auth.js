// Funciones de autenticación
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validación básica
            if (!email || !password) {
                alert('Por favor completa todos los campos');
                return;
            }
            
            // Simular inicio de sesión exitoso
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            alert('¡Inicio de sesión exitoso!');
            window.location.href = 'index.html';
        });
    }
    
    // Mostrar estado de sesión en el header
    const userActions = document.querySelector('.user-actions');
    if (userActions) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (isLoggedIn) {
            const userEmail = localStorage.getItem('userEmail');
            userActions.innerHTML = `
                <div class="user-dropdown">
                    <button class="user-link">
                        <i>👤</i>
                        <span>${userEmail.split('@')[0]}</span>
                    </button>
                    <div class="dropdown-menu">
                        <a href="#">Mi cuenta</a>
                        <a href="#">Mis compras</a>
                        <a href="#" id="logout">Cerrar sesión</a>
                    </div>
                </div>
                <a href="carrito.html" class="nav-link cart-link">
                    <i>🛒</i>
                    <span>Carrito</span>
                    <span class="cart-count">0</span>
                </a>
            `;
            
            // Logout
            document.getElementById('logout')?.addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                location.reload();
            });
        }
    }
});