const express = require('express')
const app = express()
require('dotenv').config()
const body = require('body-parser')
const connectDB = require('./config/db')
connectDB();
const {graphqlHTTP} = require('express-graphql')
const schema = require("./schema/schema")
const Author = require("./models/Author")
const Book = require("./models/Books")
app.use(body.json())
app.use(body.urlencoded({extended: false}))
app.post('/addA', async(req,res) =>{
    try{
        const {name,age} = req.body;
    var newAuthor = new Author({
      name: name,
      age: age
    })

    await newAuthor.save()
    return res.send({
        success: true
    })
}
catch(err){
    console.log(err)
}
})



app.post('/addB', async(req,res) =>{
    const {name,author,genre,authorID} = req.body;
    var newBook = new Book({
        name: name,
        author: author,
        genre: genre,
        authorID: authorID
    }) 

    await newBook.save();
    return res.send({
        success: true
    })
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


const PORT = process.env.PORT || 5050;
app.listen(PORT, () =>{
    console.log(`Server on PORT ${PORT}`);
})