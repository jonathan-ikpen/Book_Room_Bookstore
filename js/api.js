const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "465399d0b4msh47d5764b9710604p15caf1jsnd803f5fa622f",
    "X-RapidAPI-Host": "bookshelves.p.rapidapi.com",
  },
};

const bookPage = document.querySelector(".searched_books_list");
if (bookPage) {
  bookPage.innerHTML = "";

  const [...all_books_title] = document.querySelectorAll(".book-title");
  const [...all_books_img] = document.querySelectorAll(".book-img > img");
  const prices = Math.trunc(Math.random() * 100);

  const retrieve = false;
  if (retrieve) {
    fetch("https://bookshelves.p.rapidapi.com/books", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        // const [key, [ikey, res]] of Object.entries(response)

        Object.values(response).forEach((res) => {
          //   console.log(res);
          Object.values(res).forEach((r) => {
            console.log(r);
            const html = `
        <div class="book-card">
        <div class="book-img">
          <img src="${r.imgUrl}" alt="" />
        </div>
        <div class="book-details">
          <h3 class="book-title">${r.title}</h3>
          <p class="book-author">By ${r.author}</p>
          <p class="book-author">Rating: ${r.review}</p>
          <div class="book-rating">
            <img src="/img/socials/star.svg" alt="" />
            <img src="/img/socials/star.svg" alt="" />
            <img src="/img/socials/star.svg" alt="" />
            <img src="/img/socials/star.svg" alt="" />
            <img src="/img/socials/star.svg" alt="" />
          </div>
          <div class="book-ctas">
            <button class="book-amount">${r.price}</button>
            <button class="book-cta-btn">Buy Now</button>
          </div>
        </div>
      </div>
          `;

            bookPage.insertAdjacentHTML("afterbegin", html);
          });
        });
      })
      .catch((err) => console.error(err));
  } else {
    //   bookPage.style.height = "60rem";
    bookPage.style.display = "flex";
    bookPage.style.justifyContent = "center";
    bookPage.style.textAlign = "center";
    bookPage.innerHTML = `
  <img src="/img/loading.gif" style="width: 15%; text-align: center" alt="" />
    `;
  }
}
