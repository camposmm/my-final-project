document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'auth.html';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in and update navigation
    updateNavigation();
    
    // Logout functionality
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            updateNavigation();
            window.location.href = 'index.html';
        });
    }
    
    function updateNavigation() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const profileLinks = document.querySelectorAll('#profile-link');
        const authLinks = document.querySelectorAll('#auth-link');
        const logoutLinks = document.querySelectorAll('#logout-link');
        
        if (currentUser) {
            profileLinks.forEach(link => link.style.display = 'inline-block');
            authLinks.forEach(link => link.style.display = 'none');
            logoutLinks.forEach(link => link.style.display = 'inline-block');
        } else {
            profileLinks.forEach(link => link.style.display = 'none');
            authLinks.forEach(link => link.style.display = 'inline-block');
            logoutLinks.forEach(link => link.style.display = 'none');
        }
    }
    
    // Show alert message
    window.showAlert = function(message, type = 'success') {
        const alertBox = document.createElement('div');
        alertBox.className = `alert alert-${type}`;
        alertBox.textContent = message;
        document.body.appendChild(alertBox);

        setTimeout(() => alertBox.remove(), 3000);
    };
});

// Add this to main.js
document.addEventListener('DOMContentLoaded', function() {
    function updateNavigation() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const profileLinks = document.querySelectorAll('#profile-link');
        const authLinks = document.querySelectorAll('#auth-link');
        const logoutLinks = document.querySelectorAll('#logout-link');
        
        if (currentUser) {
            profileLinks.forEach(link => link.style.display = 'inline-block');
            authLinks.forEach(link => link.style.display = 'none');
            logoutLinks.forEach(link => link.style.display = 'inline-block');
        } else {
            profileLinks.forEach(link => link.style.display = 'none');
            authLinks.forEach(link => link.style.display = 'inline-block');
            logoutLinks.forEach(link => link.style.display = 'none');
        }
    }
    
    // Initialize navigation
    updateNavigation();
    
    // Logout functionality
    const logoutLinks = document.querySelectorAll('#logout-link');
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            updateNavigation();
            window.location.href = 'index.html';
        });
    });
});