const { Sequelize } = require('sequelize')
const fs = require("fs")

const sequelize = new Sequelize(process.env.HEROKU_URI, {
    dialect: "postgres",
    dialectOptions: {
        ssl:  {
            rejectUnauthorized: false
        }
    }
})

var db = {
    instance: sequelize,
    connect: () => {
        // client.connect()
        //     .then(() => { console.log("Connected to DB") })
        //     .catch(err => { console.error(err.stack) })
    },
    disconnect: () => {
        sequelize.close()
            .then(() => console.log("Disconnected from DB"))
            .catch(err => { console.error(err.stack) })
    },
    test: () => {
        sequelize.authenticate()
            .then(() => console.log("Connected to DB"))
            .catch(err => console.error(err))
        // client.query("SELECT NOW()")
        //     .then((data) => { console.log(data.rows[0].now) })
        //     .catch(err => { console.error(err) })
    },
    seed: (req, res) => {
        const createBuffer = fs.readFileSync(__dirname + "/scripts/create_db.sql")
        const create = createBuffer.toString()
        sequelize.query(create)
            .then(() => { res.send("Successful Seeding") })
            .catch(err => {
                res.send("Failed to seed DB")
                console.error(err)
            })
    },
    addBook: (req, res) => {
        let { author, title, description, image } = req.body
        if (author == undefined ||
            title == undefined ||
            description == undefined ||
            image == undefined) {
            res.status(400).send("Invalid Book Request")
            console.error(req.body)
            return
        }

        let queryString = `INSERT INTO books (title, description, image, author)
        VALUES (
          '${title.replace("'", '')}',
          '${description.replace("'", '')}',
          '${image}',
          '${author.replace("'", '')}'
        );`

        // Add book
        sequelize.query(queryString)
            .then(() => { res.send(`${title} Added`) })
            .catch(err => {
                res.status(400).send(`Failed to add ${title}`)
                console.error(err)
            })
    },
    /**
     * [
     *  {
     *    title: string,
     *    author: string,
     *    image: string,
     *    description: string,
     *    book_id: int
     *  },
     *  {
     *    title: string,
     *    author: string,
     *    image: string,
     *    description: string,
     *    book_id: int
     *  }
     * ]
     */
    getBooks: (req, res) => { 
        // query all books SQL
        var queryForAllBooks = `SELECT * FROM books`
        sequelize.query(queryForAllBooks)
            .then(data => data[0])
            .then(data => res.status(200).send(data))
            .catch(err => {
                console.error(err)
                res.status(500).send(err)
            })
    },
    removeBook: (req, res) => { 
        const { id } = req.body
        const deleteBookQuery = `DELETE FROM books WHERE book_id = ${id};`
        sequelize.query(deleteBookQuery)
            .then(() => res.status(200).send("Removed Book"))
            .catch(err => {
                console.error(err)
                res.status(500).send(`Failed to remove book with id: ${id}`)
            })
    }
}

module.exports = db