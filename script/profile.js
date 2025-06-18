document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'auth.html';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const alertBox = document.getElementById('alert');
    
    if (!currentUser) {
        window.location.href = 'auth.html';
        return;
    }
    
    // Display user info
    displayUserInfo(currentUser);
    
    // Set up form
    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        updateProfile(currentUser);
    });
    
    // Logout functionality
    document.getElementById('logout-link').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
    
    function displayUserInfo(user) {
        document.getElementById('user-name').textContent = user.firstName;
        document.getElementById('user-initial').textContent = user.firstName.charAt(0);
        document.getElementById('user-full-name').textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById('join-date').textContent = user.joinDate;
        document.getElementById('profile-first-name').value = user.firstName;
        document.getElementById('profile-last-name').value = user.lastName;
        document.getElementById('profile-email').value = user.email;
        document.getElementById('budget').value = user.preferences.budget;
        
        // Reset all checkboxes
        document.querySelectorAll('input[name="interests"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Set interests
        user.preferences.interests.forEach(interest => {
            document.getElementById(interest).checked = true;
        });
    }
    
    function updateProfile(user) {
        // Get updated values
        const firstName = document.getElementById('profile-first-name').value;
        const lastName = document.getElementById('profile-last-name').value;
        const email = document.getElementById('profile-email').value;
        const budget = document.getElementById('budget').value;
        
        // Get selected interests
    const checkboxes = document.querySelectorAll('input[name="interests"]');
        checkboxes.forEach(checkbox => {
        checkbox.checked = user.preferences.interests.includes(checkbox.value);
    });
}
        
        // Update user object
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.preferences.budget = budget;
        user.preferences.interests = interests;
        
        // Update localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Update all users
        const users = JSON.parse(localStorage.getItem('travelUsers')) || [];
        const userIndex = users.findIndex(u => u.id === user.id);
        
        if (userIndex !== -1) {
            users[userIndex] = user;
            localStorage.setItem('travelUsers', JSON.stringify(users));
        }
        
        // Update displayed info
        displayUserInfo(user);
        
        // Show success message
        alertBox.textContent = 'Profile updated successfully!';
        alertBox.className = 'alert alert-success';
        alertBox.style.display = 'block';
        
        // Hide after 3 seconds
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 3000);
    }
);