import "./index.js";
import { auth, db, logoutFunc } from "./index.js";

console.log("script running...");

const buyLink = `https://api.whatsapp.com/send?phone=2348127964509text=Hello%20BookRoom%20I%20need%20the%20book%20with%20the%20title:%20sands%20of%20eppla`;

const buyLink2 =
  "https://api.whatsapp.com/send?phone=2348124192833&text=Hello%20BookRoom,%20I%20need%20the%20book%20with%20the%20title:%20...%20";

function buynow() {
  if (auth.currentUser) {
    console.log(auth);
    // location.href = "../pages/show_book.html";
    location.href = buyLink2;
  } else {
    window.location = "../pages/login.html";
  }
}

window.buynow = buynow;
