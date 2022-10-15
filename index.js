//Google Api Search
function searchButton() {
  var search = document.getElementById("search").value;
  var results = document.getElementById("results");
  results.replaceChildren()

  axios.get("https://www.googleapis.com/books/v1/volumes?q=" + search)
    .then(res => res.data)
    .then(data => {
      for (i = 0; i < data.items.length; i++) {
        var info = data.items[i].volumeInfo

        // create title
        let title = document.createElement("h2")
        title.innerHTML = info.title

        // create background
        let card = document.createElement("div")
        card.className = "card m-3"

        // create card body
        let body = document.createElement("div")
        body.className = "card-body"

        let image = ""
        if (info.imageLinks != undefined) {
          image = info.imageLinks.smallThumbnail
        }

        let author = "anonymous"
        if (info.authors != undefined) {
          if (info.authors.length > 0) {
            author = info.authors[0]
          }
        }

        let description = ""
        if (info.description != undefined) {
          description = info.description
        }

        let book = {
          title: info.title,
          author: author,
          description: description,
          image: image
        }

        // create add button
        let button = document.createElement("button")
        button.onclick = () => addBook(book)
        button.className = "btn btn-success stretched-link"
        button.innerHTML = "Add Book"

        // add to html
        body.appendChild(title)
        body.appendChild(button)
        card.appendChild(body)
        results.appendChild(card)
      }
    })
    .catch(err => console.error(err))
}

// TODO: Create function to add book to DB
function addBook(book) {
  axios.post('/addBook', book)
    .then(res => console.log(res))
    .catch(err => console.error(err.response.data))
}

document
  .getElementById("button")
  .addEventListener("click", searchButton, false);

