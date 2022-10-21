import { cartSystem } from "./cart.js";

// selectors
const bookcontent = document.querySelector(".contam");
bookcontent.innerHTML = "";
const bookTitle = document.querySelectorAll(".book-title");
const bookImg = document.querySelectorAll(".book-img > img");
const bookAuthor = document.querySelector(".book-author");
const bookSynopsis = document.querySelector(".summary-text");
const bookAmount = document.querySelector(".book-amount");
const loader = document.querySelector(".loader");

const getBookSearch = location.search.substring(10);
// console.log(getBookSearch);
// const getBookId = parseInt(getBookSearch);
// console.log(getBookId);

const buyLink2 =
  "https://api.whatsapp.com/send?phone=2348127964509&text=Hello%20BookRoom,%20I%20need%20the%20book%20with%20the%20title:%20";

let currentBookObj = {};

const queryBook = (books) => {
  books.map((book) => {
    const nairaPrice2 = book.price.replaceAll("£", "₦");
    book.price = nairaPrice2;
    // book.id === getBookSearch && console.log(book);

    if (book.id === getBookSearch) {
      const whatsappBook = book.title.replaceAll(" ", "%20");
      const newLink = buyLink2 + whatsappBook;
      loader.style.display = "none";
      bookcontent.innerHTML = `<div class="book-card opened-book">
      <div class="book-img">
        <img src="${book.imgUrl}" alt="" />
        <a href='${book.source}' class="book-cta-btn want-to-read">Want to read</a>
      </div>
      <div class="book-details">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <p class="book-author">review: ${book.review}</p>
        <div class="book-rating">
          <!-- <span class="material-symbols-outlined"> grade </span> -->
          <img src="/img/socials/star.svg" alt="" />
          <img src="/img/socials/star.svg" alt="" />
          <img src="/img/socials/star.svg" alt="" />
          <img src="/img/socials/star.svg" alt="" />
          <img src="/img/socials/star.svg" alt="" />
        </div>
        <div class="book-summary">
          <p class="summary-text">
            ${book.description}
          </p>
        </div>
        <div class="book-ctas">
          <button class="book-amount">${book.price}</button>
          <button
            class="book-cta-btn addToCart"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>`;
      currentBookObj = new bookObj(book);
    }
  });
  // console.log(currentBookObj);
  cartSystem(currentBookObj);
};

const bookObj = function ({ title, price, imgUrl, id }) {
  this.id = id;
  this.title = title;
  this.price = parseFloat(price.replace("₦", ""));
  this.imgUrl = imgUrl;
  this.quantity = 0;
  this.inCart = 0;
};

window.queryBook = queryBook;

{
  /* <a href="${newLink}" target="_blank" class="book-cta-btn addToCart">
  Add to cart
</a>; */
}
