const fetchData = async () => {
  const url = "../book.json";
  try {
    const response = await fetch(url);
    let res = response.json();
    res
      .then((data) => {
        let data2 = data.Books;
        if (bookPage) {
          searchFunc(data2);
        }
        if (foundBookContainer) {
          homeSearchFunc(data2);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
fetchData();

const datas = [];
const search = document.querySelector(".search");
const searchInp = document.querySelector(".search-input");
// const searchBtn = document.querySelector(".search-btn");

const setLoading = (event) => {
  event === true ? console.log("loading.....") : console.log("loaded");
};

// Home Search Function
const foundBookContainer = document.querySelector(
  "[data-found-books-container]"
);
const foundBookTemplate = document.querySelector("[data-book-template]");
if (foundBookContainer) {
  searchInp.addEventListener("keyup", () => {
    if (searchInp.value == 0) {
      foundBookContainer.style.visibility = "hidden";
      foundBookContainer.style.opacity = 0;
    } else {
      foundBookContainer.style.visibility = "visible";
      foundBookContainer.style.opacity = 1;
    }
  });
}

const homeSearchFunc = (data) => {
  searchInp.addEventListener("input", (e) => {
    const inputData = search.searchInp.value.toLowerCase();
    console.log(inputData);
    if (e.target.value.length > 3) {
      data
        .filter((datas) => {
          return (
            datas.title.toLowerCase().includes(inputData) ||
            datas.author.toLowerCase().includes(inputData)
          );
        })
        .forEach((e) => {
          console.log(e);
          const foundBook =
            foundBookTemplate.content.cloneNode(true).children[0];
          const foundBookImg = foundBook.querySelector("[data-img]");
          const foundBookTitle = foundBook.querySelector("[data-title]");
          const foundBookAuthor = foundBook.querySelector("[data-author]");
          // const redirect = `./show_book.html?boook_id=${id}`;

          foundBook.href = `/pages/show_book.html?boook_id=${e.id}`;
          console.log(foundBook.href);
          foundBookImg.src = e.imgUrl;
          foundBookTitle.textContent = e.title;
          foundBookAuthor.textContent = e.author;

          foundBookContainer.append(foundBook);
        });
    }
  });
};

// Search page
const bookPage = document.querySelector(".searched_books_list");
const loader = document.querySelector(".loader");
if (bookPage) {
  // bookPage.innerHTML = "";
  //   datas.forEach((res) => {
  //     console.log(res);
  //     const html = `
  //       <div class="book-card">
  //       <div class="book-img">
  //         <img src="${res.imgUrl}" alt="" />
  //       </div>
  //       <div class="book-details">
  //         <h3 class="book-title">${res.title}</h3>
  //         <p class="book-author">By ${res.author}</p>
  //         <p class="book-author">Rating: ${res.review}</p>
  //         <div class="book-rating">
  //           <img src="/img/socials/star.svg" alt="" />
  //           <img src="/img/socials/star.svg" alt="" />
  //           <img src="/img/socials/star.svg" alt="" />
  //           <img src="/img/socials/star.svg" alt="" />
  //           <img src="/img/socials/star.svg" alt="" />
  //         </div>
  //         <div class="book-ctas">
  //           <button class="book-amount">${res.price}</button>
  //           <button class="book-cta-btn">Buy Now</button>
  //         </div>
  //       </div>
  //     </div>
  //         `;
  //     bookPage.insertAdjacentHTML("afterbegin", html);
  //   });
}

const searchFunc = (data) => {
  search.addEventListener("submit", (e) => {
    e.preventDefault();
    loader.style.display = "none";
    bookPage.innerHTML = "";
    setLoading(true);
    const inputData = search.searchInp.value.toLowerCase();
    console.log(inputData);
    data
      .filter((datas) => {
        return (
          datas.title.toLowerCase().includes(inputData) ||
          datas.author.toLowerCase().includes(inputData)
        );
      })
      .forEach((e) => {
        // console.log(e);
        datas.push(e);
      });
    setLoading(false);

    console.log(datas);

    datas.forEach((res) => {
      const html = `
          <div class="book-card">
          <div class="book-img">
            <img src="${res.imgUrl}" alt="" />
          </div>
          <div class="book-details">
            <h3 class="book-title">${res.title}</h3>
            <p class="book-author">By ${res.author}</p>
            <p class="book-author">Rating: ${res.review}</p>
            <div class="book-rating">
              <img src="/img/socials/star.svg" alt="" />
              <img src="/img/socials/star.svg" alt="" />
              <img src="/img/socials/star.svg" alt="" />
              <img src="/img/socials/star.svg" alt="" />
              <img src="/img/socials/star.svg" alt="" />
            </div>
            <div class="book-ctas">
              <button class="book-amount">${res.price}</button>
              <button class="book-cta-btn">Buy Now</button>
            </div>
          </div>
        </div>
            `;
      bookPage.insertAdjacentHTML("afterbegin", html);
    });
  });
};
