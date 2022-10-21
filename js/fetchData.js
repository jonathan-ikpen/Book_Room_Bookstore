import { db, auth, colRef, getDocs } from "./index.js";

// Fetch all boook
// const fetchData3 = async () => {
//   const url = "../book.json";
//   try {
//     const response = await fetch(url);
//     let res = response.json();
//     res
//       .then((data) => {
//         let data2 = data.Books;
//         queryBook(data2);
//         // renderBooks(data2);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };
// fetchData3();

const fetchData3 = async () => {
  getDocs(colRef)
    .then((snapshot) => {
      let books = [];

      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });

      // console.log(books);
      queryBook(books);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
fetchData3();
