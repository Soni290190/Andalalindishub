// auth.js
import { auth } from "./firebase-init.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = "admin-dashboard.html";
        })
        .catch((error) => {
            errorMessage.innerText = "Login failed: " + error.message;
        });
});
