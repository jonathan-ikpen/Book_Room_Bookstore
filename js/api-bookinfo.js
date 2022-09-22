const booksWrapper = document.querySelector(".book_cards_wrapper");
const loader3 = document.querySelector(".loader");

const fetchData2 = async () => {
  const url = "../book.json";
  try {
    const response = await fetch(url);
    let res = response.json();
    res
      .then((data) => {
        let data2 = data.Books;
        renderBooks(data2);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
fetchData2();

// Render all books
const renderBooks = (books) => {
  const maxLength = 37;

  books.forEach((book) => {
    const nairaPrice = book.price.replaceAll("£", "₦");
    book.price = nairaPrice;
    if (book.title.length > maxLength) {
      const newTitle = book.title.substring(0, maxLength);
      let removedStr = book.title.substring(maxLength, book.title.length);
      removedStr = "...";
      const bookname = newTitle + removedStr;
      book.title = bookname;
    }

    const html = `<div class="book_card">
    <picture>
      <img src=${book.imgUrl} alt="Book Image" />
    </picture>
    <div class="card_rating">
      <img src="/img/socials/star.svg" alt="" />
      <img src="/img/socials/star.svg" alt="" />
      <img src="/img/socials/star.svg" alt="" />
      <img src="/img/socials/star.svg" alt="" />
      <img src="/img/socials/star.svg" alt="" />
    </div>
    <h4>${book.title}</h4>
    <p>${book.author}</p>
    <span>${book.price}</span>
    <a class="book-cta-btn" onclick=viewBookInfo(${book.id}) >
        Click here to pay
    </a>
  </div>`;

    loader3.style.display = "none";
    booksWrapper.insertAdjacentHTML("afterbegin", html);
  });
};

// View book info
const viewBookInfo = (id) => {
  const redirect = `./show_book.html?boook_id=${id}`;
  location.href = redirect;
};
