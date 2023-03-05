const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log("Connection Failed", err)
        }
        else {
            console.log("Connection Success");
        }
    }
)

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: String,
    password: String,
})

const User = new mongoose.model("user_Data", userSchema);

app.listen(5010, () => {
    console.log("Listening to MongoDB on port 5010")
})

module.exports = User;