document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === 'admin') {
            window.location.href = 'adminindex.html';  
        } else {
            alert('Invalid username or password');
        }
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        alert('Registration successful!');
        showLoginForm();
    });
});

function showRegisterForm() {
    document.getElementById('login-form').parentElement.style.display = 'none';
   
}

function showLoginForm() {

    document.getElementById('login-form').parentElement.style.display = 'none';
}
