// Fetch all boook
const fetchData = async () => {
  const url = "../book.json";
  try {
    const response = await fetch(url);
    let res = response.json();
    res
      .then((data) => {
        let data2 = data.Books;
        queryBook(data2);
        // renderBooks(data2);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
fetchData();
