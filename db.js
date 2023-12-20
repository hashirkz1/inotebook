const mongoose = require("mongoose")
const mongoURI = "mongodb://localhost:27017/mynotes"

const print = () =>{
    console.log("Connected to Mongo Successfully")
}
const connectToMongo = () =>{
    mongoose.connect(mongoURI , print())
    }

module.exports = connectToMongo