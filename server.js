const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const db = process.env.MONGODB_URI || "monogodb://localhost/monogoHeadlines";

// Middleware
app.use(express.urlencoded({ extended: false, useNewUrlParser: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/htmlRoutes")(app);


//connect mongo 
mongoose.connect(db, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("mango connected");
    }
});

// listen on port 
app.listen(PORT, function () {
    console.log(`listening on port : ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
});