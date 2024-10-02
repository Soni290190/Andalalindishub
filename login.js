// login.js
import { auth } from "./firebase-init.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm["email"].value;
  const password = loginForm["password"].value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Login berhasil
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Error saat login:", error);
    });
});
