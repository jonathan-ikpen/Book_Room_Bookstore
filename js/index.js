// FIREBASE CONFIGURATION
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAEXxlZkAdvOgaogQYMiY51Y0070AmGa4M",
  authDomain: "bookroom-app.firebaseapp.com",
  projectId: "bookroom-app",
  storageBucket: "bookroom-app.appspot.com",
  messagingSenderId: "377677252871",
  appId: "1:377677252871:web:9ad429866bd3fa65245da2",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();
// console.log(auth);
// console.log(db);

// collection Ref
const colRef = collection(db, "books");

// END FIREBASE CONFIGURATION

let loginBtn = document.querySelector(".login");
const logoutBtn = document.querySelector(".logout");
const bookPrice = document.querySelectorAll(".book-amount");
const bookPrice2 = document.querySelectorAll(".book-price");
if (bookPrice) {
  bookPrice.forEach((book) => {
    const newPrice =
      book.innerText.replaceAll("$", "₦") ||
      book.innerText.replaceAll("£", "₦");
    book.innerText = newPrice;
  });
}
if (bookPrice2) {
  bookPrice2.forEach((book) => {
    const newPrice = book.innerText.replaceAll("$", "₦");
    book.innerText = newPrice;
  });
}
// const registerBtn = document.querySelector(".signup-nav-btn");

const heading = document.querySelector(".welcome-heading");
const registerBtn2 = document.querySelector(".register-btn");
const dashBtn = document.querySelector(".dashBtn");

// subscribing to auth changes
onAuthStateChanged(auth, (user) => {
  // console.log("user status changed:", user);
  if (user) {
    // loginBtn.style.display = "none";
    if (heading) {
      heading.textContent = "You're logged in! 😊";
      registerBtn2.style.display = "none";
      dashBtn.style.display = "";
    }
    if (logoutBtn) {
      logoutBtn.style.display = "block";
    }
    // console.log(user.email);
  }
});

// logging in and out
export const logoutFunc = () => {
  const logoutButton = document.querySelector(".logout");
  logoutButton.addEventListener("click", () => {
    console.log("user is about to log out");
    signOut(auth)
      .then(() => {
        console.log("the user signed out");
        logoutBtn.style.display = "none";
        loginBtn.style.display = "block";
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
};

window.logoutFunc = logoutFunc;

export { db, auth, colRef, getDocs, signOut };
