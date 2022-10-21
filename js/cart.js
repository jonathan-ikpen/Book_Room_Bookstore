const cartSystem = function (currentBookObj) {
  let cart = document.querySelector(".addToCart");
  cart.addEventListener("click", () => {
    console.log("clicked");
    cartNumbers(currentBookObj);
    totalCost(currentBookObj);
  });
};

function totalCost(currentBookObj, action) {
  let cartCost = localStorage.getItem("totalCost");

  if (action) {
    cartCost = parseFloat(cartCost);

    localStorage.setItem("totalCost", cartCost - currentBookObj.price);
  } else if (cartCost != null) {
    cartCost = parseFloat(cartCost);
    localStorage.setItem("totalCost", cartCost + currentBookObj.price);
  } else {
    localStorage.setItem("totalCost", currentBookObj.price);
  }
}

function cartNumbers(currentBookObj, action) {
  let bookNumbers = localStorage.getItem("cartNumbers");
  bookNumbers = parseInt(bookNumbers);

  let cartItems = localStorage.getItem("booksInCart");
  cartItems = JSON.parse(cartItems);

  if (action) {
    localStorage.setItem("cartNumbers", bookNumbers - 1);
    document.querySelector(".cart-num").textContent = bookNumbers - 1;
    console.log("action running");
  } else if (bookNumbers) {
    localStorage.setItem("cartNumbers", bookNumbers + 1);
    document.querySelector(".cart-num").textContent = bookNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart-num").textContent = 1;
  }
  setItems(currentBookObj);
}

function setItems(currentBookObj) {
  let cartItems = localStorage.getItem("bookInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    let currentBook = currentBookObj.id;

    if (cartItems[currentBook] == undefined) {
      cartItems = {
        ...cartItems,
        [currentBook]: currentBookObj,
      };
    }
    cartItems[currentBook].inCart += 1;
  } else {
    currentBookObj.inCart = 1;
    cartItems = {
      [currentBookObj.id]: currentBookObj,
    };
  }

  localStorage.setItem("bookInCart", JSON.stringify(cartItems));
}

function onLoadCartNumbers() {
  let bookNumbers = localStorage.getItem("cartNumbers");
  if (bookNumbers) {
    document.querySelector(".cart-num").textContent = bookNumbers;
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("bookInCart");
  cartItems = JSON.parse(cartItems);

  let cartCost = localStorage.getItem("totalCost");
  cartCost = parseFloat(cartCost);

  let productContainer = document.querySelector(".products");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item, index) => {
      productContainer.innerHTML += `<div class="product"><ion-icon name="close-circle" id="${
        item.id
      }" ></ion-icon><img src="${item.imgUrl}" />
                <span class="sm-hide">${item.title.substring(0, 8)}</span>
            </div>
            <div class="price sm-hide">₦${item.price.toFixed(2)}</div>
            <div class="quantity">
                <ion-icon class="decrease " name="arrow-dropleft-circle" id="${
                  item.id
                }" ></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle" id="${
                  item.id
                }" ></ion-icon>   
            </div>
            <div class="total">₦${(item.inCart * item.price).toFixed(2)}</div>`;
    });

    productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">₦${cartCost.toFixed(2)}</h4>
            </div>`;

    productContainer.innerHTML += `
          <button onclick=whatsappLink() class="pay">
          <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512" height="20px" ><title>Wallet</title><rect x="48" y="144" width="416" height="288" rx="48" ry="48" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path d="M411.36 144v-30A50 50 0 00352 64.9L88.64 109.85A50 50 0 0048 159v49" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path d="M368 320a32 32 0 1132-32 32 32 0 01-32 32z"/></svg>
              <span>Pay on Delivery</span>
          </button>;
    `;

    deleteButtons();
    manageQuantity();
  }
}

function manageQuantity() {
  let decreaseButtons = document.querySelectorAll(".decrease");
  let increaseButtons = document.querySelectorAll(".increase");
  let currentQuantity = 0;
  let currentProduct = "";
  let cartItems = localStorage.getItem("bookInCart");
  cartItems = JSON.parse(cartItems);

  for (let i = 0; i < increaseButtons.length; i++) {
    decreaseButtons[i].addEventListener("click", () => {
      console.log(cartItems);
      currentQuantity =
        decreaseButtons[i].parentElement.querySelector("span").textContent;
      console.log(currentQuantity);

      currentProduct = decreaseButtons[i].id;
      console.log(currentProduct);

      if (cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart -= 1;
        cartNumbers(cartItems[currentProduct], "decrease");
        totalCost(cartItems[currentProduct], "decrease");
        localStorage.setItem("bookInCart", JSON.stringify(cartItems));
        displayCart();
      }
    });

    increaseButtons[i].addEventListener("click", () => {
      console.log(cartItems);
      currentQuantity =
        increaseButtons[i].parentElement.querySelector("span").textContent;
      console.log(currentQuantity);

      currentProduct = increaseButtons[i].id;
      console.log(currentProduct);

      cartItems[currentProduct].inCart += 1;
      cartNumbers(cartItems[currentProduct]);
      totalCost(cartItems[currentProduct]);
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      displayCart();
    });
  }
}

function deleteButtons() {
  let deleteButtons = document.querySelectorAll(".product ion-icon");
  let bookNumbers = localStorage.getItem("cartNumbers");
  let cartCost = localStorage.getItem("totalCost");
  let cartItems = localStorage.getItem("bookInCart");
  cartItems = JSON.parse(cartItems);
  let productId;
  console.log(cartItems);

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      productId = deleteButtons[i].id;

      localStorage.setItem(
        "cartNumbers",
        bookNumbers - cartItems[productId].inCart
      );
      localStorage.setItem(
        "totalCost",
        cartCost - cartItems[productId].price * cartItems[productId].inCart
      );

      delete cartItems[productId];
      localStorage.setItem("bookInCart", JSON.stringify(cartItems));

      displayCart();
      onLoadCartNumbers();
    });
  }
}

function whatsappLink(currentBookObj) {
  let allBooks = localStorage.getItem("bookInCart");
  allBooks = JSON.parse(allBooks);

  let totalCost = localStorage.getItem("totalCost");
  totalCost = parseFloat(totalCost).toFixed(2);

  let booksTitle = [];
  Object.values(allBooks).forEach(({ title }) => {
    booksTitle.push(title);
  });

  booksTitle = booksTitle.join("%20and%20").replaceAll(" ", "%20");

  let bookCost = `%20(Total:%20₦${totalCost})`;

  const buyLink2 =
    "https://api.whatsapp.com/send?phone=2348127964509&text=Hello%20BookRoom,%20I%20need%20the%20book(s)%20with%20the%20title(s):%20";

  const whatsappUrl = buyLink2 + booksTitle + bookCost;
  console.log(whatsappUrl);
  location.href = whatsappUrl;
}

onLoadCartNumbers();
displayCart();

export { cartSystem };

window.whatsappLink = whatsappLink;
