// Base de datos simple de usuarios
const users = JSON.parse(localStorage.getItem('fashionUsers')) || [
    {
        email: 'admin@fashion.com',
        password: 'admin123',
        name: 'Administrador Fashion'
    }
];

// Mostrar/ocultar contraseña
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🔒';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// Mostrar notificación
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification ' + type;
    
    setTimeout(() => {
        notification.className = 'notification';
    }, 3000);
}

// Validar login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validar usuario
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        showNotification('¡Bienvenido a FashionStyle!', 'success');
        
        // Guardar sesión si "Recordarme" está marcado
        if (remember) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
        
        // Redirigir después de 1 segundo
        setTimeout(() => {
            window.location.href = 'Principal.html';
        }, 1000);
    } else {
        showNotification('Credenciales incorrectas. Intenta nuevamente.', 'error');
    }
});

// Función para registro (simplificado)
function showRegister() {
    const email = prompt('Ingresa tu email para registrarte:');
    const password = prompt('Crea una contraseña:');
    
    if (email && password) {
        const newUser = { email, password, name: email.split('@')[0] };
        users.push(newUser);
        localStorage.setItem('fashionUsers', JSON.stringify(users));
        showNotification('¡Cuenta creada! Ahora puedes iniciar sesión.', 'success');
    }
}

// Verificar si ya hay sesión activa
function checkSession() {
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    if (currentUser && window.location.pathname.includes('Login.html')) {
        window.location.href = 'Principal.html';
    }
}

// Inicializar
checkSession();