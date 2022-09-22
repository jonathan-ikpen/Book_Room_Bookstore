import "./index.js";
import { auth, db, logoutFunc } from "./index.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

const errorMsg = document.querySelector(".error-msg");
const heading = document.querySelector(".welcome-heading");

const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user logged in:", cred.user);
      window.location = "../index.html";
    })
    .catch((err) => {
      console.log(err.message);
      errorMsg.textContent = err.message
        .replaceAll("Firebase", "")
        .replaceAll("Error", "")
        .replaceAll(":", "")
        .replaceAll("auth", "")
        .replaceAll("-", " ")
        .replaceAll("/", "\n")
        .replaceAll("(", "")
        .replaceAll(")", "");
    });
});

if (auth.currentUser) {
  console.log(auth);
  heading.textContent = "You're already logged in! 😊";
} else {
  heading.textContent = "LOGIN HERE";
}
