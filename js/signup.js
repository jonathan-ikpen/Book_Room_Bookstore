import "./index.js";
import { auth, db } from "./index.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

const errorMsg = document.querySelector(".error-msg");
// signing users up
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user created:", cred.user);
      signupForm.reset();
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
