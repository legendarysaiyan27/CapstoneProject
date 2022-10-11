require("dotenv").config();
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser"); // SEND POSTS
const db = require('../database/database')

const app = express();
const port = process.env.PORT;
db.connect()

/**
 * USE
 */
// app.use(bodyParser.urlencoded({ extended: false })); // Convert json to body
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname + '/../public')))
/**
 * POSTS
 */
// db add setup
app.post("/seed", db.seed)
app.post("/addBook", db.addBook)
app.post("/myBooks", db.getBooks)

/**
 * GETS
 */
// files
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../public/index.html"))
})
app.get("/myBooks", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../public/my_books.html"))
})

/**
 * DELETE
 */
app.delete("/removeBook", db.removeBook)

//SERVER
app.listen(port, (req, res) => {
  db.test()
  console.log(`listening on port ${port}`);
});
