// auth.js

// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Register User
function registerUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            document.getElementById('auth-message').textContent = "✅ Registration successful!";
        })
        .catch(error => {
            document.getElementById('auth-message').textContent = "❌ " + error.message;
        });
}

// Login User
function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            document.getElementById('auth-message').textContent = "✅ Login successful!";
        })
        .catch(error => {
            document.getElementById('auth-message').textContent = "❌ " + error.message;
        });
}