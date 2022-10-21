import { auth } from "/js/index.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location = "/admin/login.html";
  } else {
    document.querySelector("body").style.display = "";
  }
});
