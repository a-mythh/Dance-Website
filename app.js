const express = require("express");
const path = require("path");
// const fs = require("fs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/contactDance", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
const port = 3000;

// Define Mongoose Schema
var contactSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    email: String,
    desc: String,
});

// Contact model
var Contact = mongoose.model("Contact", contactSchema);

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug");
app.set("views", "./views");

// ENDPOINTS
app.get("/", (request, response) => {
    const val = {};
    response.status(200).render("home", val);
});

app.get("/contact", (request, response) => {
    const val = {};
    response.status(200).render("contact", val);
});

app.post("/contact", (request, response) => {
    var myData = new Contact(request.body);
    myData
        .save()
        .then(() => {
            // res.send("This item has been saved to the database");
        })
        .catch(() => {
            // res.status(400).send("Item was not saved to database");
        });

    response.status(200).render("contact");

    /*
    const form = request.body;
    let userInfo = `Name: ${form.name}\nMobile No.: ${form.mobile}\nEmail: ${form.email}\nConcern: ${form.desc}\n\n`;
    fs.appendFileSync("userDetails.txt", userInfo);
    */
});

// START THE SERVER
app.listen(port, () => {
    console.log(`Application started on port ${port}`);
});
