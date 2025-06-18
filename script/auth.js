document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'auth.html';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding form
            const tabName = this.getAttribute('data-tab');
            loginForm.style.display = tabName === 'login' ? 'block' : 'none';
            registerForm.style.display = tabName === 'register' ? 'block' : 'none';
        });
    });
    
    // Login form submission
    document.getElementById('login-form-data').addEventListener('submit', function(e) {
        e.preventDefault();
        loginUser();
    });
    
    // Register form submission
    document.getElementById('register-form-data').addEventListener('submit', function(e) {
        e.preventDefault();
        registerUser();
    });
    
    function loginUser() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const alertBox = document.getElementById('auth-message');
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('travelUsers')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Set current user
            localStorage.setItem('currentUser', JSON.stringify(user));
            alertBox.textContent = 'Login successful! Redirecting...';
            alertBox.className = 'alert alert-success';
            alertBox.style.display = 'block';
            
            // Redirect to homepage
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            alertBox.textContent = 'Invalid email or password';
            alertBox.className = 'alert alert-error';
            alertBox.style.display = 'block';
        }
    }
    
    function registerUser() {
        const firstName = document.getElementById('register-first-name').value;
        const lastName = document.getElementById('register-last-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        const alertBox = document.getElementById('auth-message');
        
        // Validate passwords
        if (password !== confirmPassword) {
            alertBox.textContent = 'Passwords do not match';
            alertBox.className = 'alert alert-error';
            alertBox.style.display = 'block';
            return;
        }
        
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('travelUsers')) || [];
        const userExists = users.some(u => u.email === email);
        
        if (userExists) {
            alertBox.textContent = 'User with this email already exists';
            alertBox.className = 'alert alert-error';
            alertBox.style.display = 'block';
            return;
        }
        
        // Create user object
        const newUser = {
            id: Date.now().toString(),
            firstName,
            lastName,
            email,
            password,
            joinDate: new Date().toLocaleDateString(),
            preferences: {
                budget: 'medium',
                interests: []
            },
            trips: []
        };
        
        // Save user
        users.push(newUser);
        localStorage.setItem('travelUsers', JSON.stringify(users));
        
        // Set current user
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        alertBox.textContent = 'Registration successful! Redirecting...';
        alertBox.className = 'alert alert-success';
        alertBox.style.display = 'block';
        
        // Redirect to homepage
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
});