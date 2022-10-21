import {
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { colRef } from "./firebaseConfig.js";

document.querySelector(".book-nav").classList.remove("active");
document.querySelector(".add-nav").classList.add("active");

const addBook = function () {
  const addBookForm = document.querySelector(".add");
  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addDoc(colRef, {
      title: addBookForm.title.value,
      author: addBookForm.author.value,
      description: addBookForm.description.value,
      imgUrl: addBookForm.imgUrl.value,
      price: "₦" + addBookForm.price.value,
      review: addBookForm.review.value,
      stock: addBookForm.stock.value,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        addBookForm.reset();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
};

addBook();
