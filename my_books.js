const books = document.getElementById("books")

function getBooks() {
  books.replaceChildren()
  axios.post("/myBooks")
    .then(res => res.data)
    .then(data => {
      data.forEach(book => {
        addBook(book)
      })
    })
    .catch(err => console.error(err))
}

function addBook(book) {
  var card = document.createElement('div')
  card.className = "card m-3"
  var row = document.createElement('div')
  row.className = "row g-0"
  var col1 = document.createElement('div')
  col1.className = "col-md-4"
  var img = document.createElement('img')
  img.className = "img-fluid rounded-start"
  img.src = book.image
  img.alt = book.title
  var col2 = document.createElement('div')
  col2.className = "col-md-8"
  var body = document.createElement('div')
  body.className = "card-body"
  var title = document.createElement('h5')
  title.className = "card-title"
  title.innerHTML = book.title
  var author = document.createElement('small')
  author.className = "card-text text-muted"
  author.innerHTML = book.author
  var description = document.createElement('p')
  description.className = "card-text"
  description.innerHTML = book.description
  var button = document.createElement('button')
  button.className = "btn btn-danger"
  button.innerHTML = "Remove Book"
  button.onclick = () => removeBook(book.book_id)

  body.appendChild(title)
  body.appendChild(author)
  body.appendChild(description)
  body.appendChild(button)
  col2.appendChild(body)
  col1.appendChild(img)
  row.appendChild(col1)
  row.appendChild(col2)
  card.appendChild(row)
  books.appendChild(card)
}

// TODO: Remove book from DB
function removeBook(bookID) {
  axios.delete("/removeBook", { data: { id: bookID } })
    .then(res => getBooks())
}

getBooks()