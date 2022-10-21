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
export const db = getFirestore();
export const auth = getAuth();
// console.log(auth);
// console.log(db);

// collection Ref
export const colRef = collection(db, "books");

// queries + order
const search = document.querySelector(".search-bar");
search.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    console.log(e.target.value);
    const word = e.target.value.toLowerCase();
    searchResult.innerHTML = "";
    preloader.style.display = "block";
    // const docRef = doc(db, "books", id);
    // const q = query(colRef, where("author", "==", "word"));
    // const q = query(colRef, where("author", "==", "e.target.value"),
    // orderBy("createdAt"));

    getDocs(colRef).then((snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      console.log(results);

      renderAllHtml(
        results.filter((datas) => {
          return (
            datas.title.toLowerCase().includes(word) ||
            datas.author.toLowerCase().includes(word)
          );
        })
      );
    });

    // getDocs(docRef).then((doc) => {
    //   console.log(doc.data(), doc.id);
    // });

    // getDocs(colRef)
    //   .then((snapshot) => {
    //     let results = [];
    //     snapshot.docs.forEach((doc) => {
    //       results.push({ ...doc.data(), id: doc.id });
    //     });
    //     console.log(results);
    //     results
    //       .filter((datas) => {
    //         return (
    //           datas.title.toLowerCase().includes(word) ||
    //           datas.author.toLowerCase().includes(word)
    //         );
    //       })
    //       .forEach((e) => {
    //         console.log(e);
    //       });
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }
});

// get collection data
const onSnapshotGet = function () {
  onSnapshot(colRef, (snapshot) => {
    let books = [];

    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });

    console.log(books);
    books.map((book, i) => {
      let price = book.price.replace("£", "");
      const html = `
        <div class="products-row show-modal">
            <button class="cell-more-button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-more-vertical"
                >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                </svg>
            </button>
            <div class="product-cell image">
                <img
                    src="${book.imgUrl}"
                    alt="product"
                />
                <span title=${book.title}>${book.title.substring(0, 8)}</span>
            </div>
            <div class="product-cell category" title=${book.author} >
                <span class="cell-label">Author:</span>${
                  book.author.substring(0, 5) + "..."
                }
            </div>
            <div class="product-cell status-cell">
                <span class="cell-label">Status:</span>
                <span class="status active">Available</span>
            </div>
            <div class="product-cell sales">
                <span class="cell-label">Sales:</span>${
                  book.sales ? book.sales : 0
                }
            </div>
            <div class="product-cell stock">
                <span class="cell-label">Stock:</span>${
                  book.stock ? book.stock : 1
                }
            </div>
            <div class="product-cell price">
                <span class="cell-label">Price:</span>${price}
            </div>
        </div>
        `;

      const modalHtml = `
      <button class="close-modal">&times;</button>
      <div class="modal-grid">
            <div class="product-cell image">
                <img
                    src="${book.imgUrl}"
                    alt="product"
                    style="width: 52px"
                />
            </div>
            <div class="modal-grid__2" >
                <div class="modal-grid__2--1">
                    <div class="product-cell">
                        <span class="tag">Title: </span>
                        <input type="text" placeholder="${book.title}" value="${
        book.title
      }" id="title"/>
                    </div>
                    <div class="product-cell">
                        <span class="tag">Author: </span>
                        <input type="text" placeholder="${
                          book.author
                        }" value="${book.author}" id="author"/>
                    </div>
                    <div class="product-cell">
                        <span class="tag">Review: </span>
                        <input type="text" placeholder="${
                          book.review
                        }" value="${book.review}" id="review"/>
                    </div>
                    <div class="product-cell">
                        <span class="tag">Price: </span>
                        <input type="text" placeholder="${book.price}" value="${
        book.price
      }" id="price"/>
                    </div>
                </div>
                <div class="modal-grid__2--2" >
                    <div class="product-cell Sales">
                        <span class="cell-label">Sales:</span>
                        <input type="number" placeholder="${
                          book.sales
                        }" value="${book.sales ? book.sales : 0}" id="sales" />
                    </div>
                    <div class="product-cell Stocks">
                        <span class="cell-label">Stocks:</span>
                        <input type="number" placeholder="${
                          book.stock
                        }" value="${book.stock ? book.stock : 1}" id="stock" />
                    </div>
                </div>

            </div>
            <div class="product-cell synopsis">
               <span class="tag">Synopsis:</span>
               <p>${book.description.substring(0, 700) + "...(Read more)"}</p>
            </div>
            <div class="product-cell price buttons">
                <button class="app-content-headerButton update" id=${
                  book.id
                } style="background-color:  #2ba972" >Update</button>
                <button class="app-content-headerButton remove" id=${
                  book.id
                } style="background-color: #e60000" >Remove</button>
            </div>
      </div>
        
      `;

      preloader.style.display = "none";
      //   bookContainer.insertAdjacentHTML("beforeend", html);
      searchResult.insertAdjacentHTML("beforeend", html);
      modal.innerHTML = modalHtml;
    });

    document.querySelectorAll(".show-modal").forEach((book) => {
      book.addEventListener("click", function (e) {
        e.preventDefault();
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
      });
    });

    const btnCloseModal = document.querySelector(".close-modal");
    btnCloseModal.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    document.querySelectorAll(".modal-grid > .buttons").forEach((book) => {
      book.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(e.target);
        if (e.target.classList.contains("remove")) {
          e.target.onClick = deleteBook.call(e.target);
        }
        if (e.target.classList.contains("update")) {
          e.target.onClick = updateBook.call(e.target);
          modal.classList.add("hidden");
          overlay.classList.add("hidden");
        }
      });
    });
  });
};

const manualGet = function () {
  getDocs(colRef)
    .then((snapshot) => {
      let books = [];

      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });

      // console.log(books);
      renderAllHtml(books);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

manualGet();

// END FIREBASE CONFIGURATION
const bookContainer = document.querySelector(".products-area-wrapper");
const searchResult = document.querySelector(".search-result");
const preloader = document.querySelector(".preloader");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const logOutBtn = document.querySelector(".logout");
const userName = document.querySelector(".account-info-name");

// subscribing to auth changes
onAuthStateChanged(auth, (user) => {
  // console.log("user status changed:", user);
  if (user) {
    userName.innerHTML = auth.currentUser.email;
    // console.log(user.email);
  }
});

document.querySelector(".book-nav").classList.add("active");
document.querySelector(".add-nav").classList.remove("active");

function deleteBook() {
  console.log(this.id);
  const docRef = doc(db, "books", this.id);
  if (confirm("Are you sure you want to delete this book? ")) {
    deleteDoc(docRef).then(() => {
      console.log("Deleted");
      window.location.href = window.location.href;
    });
    // function eraseCache() {
    //   window.location = window.location.href + "?eraseCache=true";
    // }
    // setTimeout(eraseCache, 3000);
  }
}

function updateBook() {
  console.log(this.id);
  console.log("Running update");
  const docRef = doc(db, "books", this.id);
  updateDoc(docRef, {
    title: document.querySelector("#title").value,
    author: document.querySelector("#author").value,
    review: document.querySelector("#review").value,
    price: document.querySelector("#price").value,
    sales: document.querySelector("#sales").value,
    stock: document.querySelector("#stock").value,
  }).then(() => {
    console.log("Updated");
    window.location.href = window.location.href;
  });
}

const renderAllHtml = function (books) {
  books.map((book, i) => {
    let price = book.price.replace("£", "");
    let stock = Number(book.stock);
    let sales = Number(book.sales);
    const html = `
    <div class="products-row show-modal">
        <button class="cell-more-button">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-more-vertical"
            >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
            </svg>
        </button>
        <div class="product-cell image">
            <img
                src="${book.imgUrl}"
                alt="product"
            />
            <span title=${book.title}>${book.title.substring(0, 8)}</span>
        </div>
        <div class="product-cell category" title=${book.author} >
            <span class="cell-label">Author:</span>${
              book.author.substring(0, 5) + "..."
            }
        </div>
        <div class="product-cell status-cell">
            <span class="cell-label">Status:</span>
            <span class="status ${stock == 0 ? "disabled" : "active"}">${
      stock == 0 ? "Unavailable" : "Available"
    }</span>
        </div>
        <div class="product-cell sales">
            <span class="cell-label">Sales:</span>${sales ? sales : 0}
        </div>
        <div class="product-cell stock">
            <span class="cell-label">Stock:</span>${stock ? stock : 0}
        </div>
        <div class="product-cell price">
            <span class="cell-label">Price:</span>${price}
        </div>

        <div class="modal hidden">
            <button class="close-modal">&times;</button>
            <div class="modal-grid">
                <div class="">
                    <img
                        src="${book.imgUrl}"
                        alt="product"
                        style="width: 52px"
                    />
                </div>
                <div class="modal-grid__2" >
                    <div class="modal-grid__2--1">
                        <div class="product-cell">
                            <span class="tag">Title: </span>
                            <input type="text" placeholder="${
                              book.title
                            }" value="${book.title}" id="title"/>
                        </div>
                        <div class="product-cell">
                            <span class="tag">Author: </span>
                            <input type="text" placeholder="${
                              book.author
                            }" value="${book.author}" id="author"/>
                        </div>
                        <div class="product-cell">
                            <span class="tag">Review: </span>
                            <input type="text" placeholder="${
                              book.review
                            }" value="${book.review}" id="review"/>
                        </div>
                        <div class="product-cell">
                            <span class="tag">Price: </span>
                            <input type="text" placeholder="${
                              book.price
                            }" value="${book.price}" id="price"/>
                        </div>
                    </div>
                    <div class="modal-grid__2--2" >
                        <div class="product-cell Sales">
                            <span class="tag">Sales:</span>
                            <input type="number" placeholder="${sales}" value="${
      sales ? sales : 0
    }" id="sales" />
                        </div>
                        <div class="product-cell Stocks">
                            <span class="tag">Stocks:</span>
                            <input type="number" placeholder="${stock}" value="${
      stock ? stock : 0
    }" id="stock" />
                        </div>
                    </div>

            </div>
            <div class="synopsis">
                <span class="tag" style="font-size: 14px; font-weight: 600;" >Synopsis:</span>
                <p>${book.description.substring(0, 700) + "...(Read more)"}</p>
            </div>
            <div class="product-cell price buttons">
                <button class="app-content-headerButton update" id=${
                  book.id
                } style="background-color:  #2ba972" >Update</button>
                <button class="app-content-headerButton remove" id=${
                  book.id
                } style="background-color: #e60000" >Remove</button>
            </div>
            </div>
    
        </div>
    </div>  
    `;

    preloader.style.display = "none";
    // bookContainer.insertAdjacentHTML("beforeend", html);
    searchResult.insertAdjacentHTML("beforeend", html);
  });

  const showModal = document.querySelectorAll(".show-modal");
  showModal.forEach((book) => {
    const modal = book.querySelector(".modal");
    book.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    });

    const btnCloseModal = modal.querySelector(".close-modal");
    btnCloseModal.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(e.target);
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
      console.log(e.target.parentElement.classList == modal.classList);
    });

    overlay.addEventListener("click", function (e) {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
      }
    });

    const ctaBtns = modal.querySelector(".modal-grid > .buttons");
    ctaBtns.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(e.target);
      if (e.target.classList.contains("remove")) {
        e.target.onClick = deleteBook.call(e.target);
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
      }
      if (e.target.classList.contains("update")) {
        e.target.onClick = updateBook.call(e.target);
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
      }
    });
  });
};

const logOut = function () {
  console.log("loggin out");
  signOut(auth)
    .then(() => {
      window.location = "/admin/login.html";
      console.log("signed out");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

window.logOut = logOut;
