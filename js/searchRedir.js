const getBookSearch = location.search.substring(8);
console.log(getBookSearch);

const fetchData2 = async () => {
  const url = "../book.json";
  try {
    const response = await fetch(url);
    let res = response.json();
    res
      .then((data) => {
        let data2 = data.Books;
        searchRedir2(data2);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
fetchData2();

const searchRedir2 = (data) => {
  data
    .filter((datas) => {
      return (
        datas.title.toLowerCase().includes(getBookSearch) ||
        datas.author.toLowerCase().includes(getBookSearch)
      );
    })
    .forEach((res) => {
      console.log(res);
      const nairaPrice = res.price.replaceAll("£", "₦");
      res.price = nairaPrice;
      loader2.style.display = "none";
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
                <button class="book-cta-btn" onclick=viewBookInfo2(${res.id})>Buy Now</button>
              </div>
            </div>
          </div>
              `;
      bookPage.insertAdjacentHTML("afterbegin", html);
    });
};
