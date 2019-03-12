const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = 8080;// Use morgan logger for logging requests

const app = express();

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

const routes = require("./controllers/scraperController.js");

app.use(routes);

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoheadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Start the server
app.listen(PORT, () => {
    console.log(`🌎 -> App running on port ${PORT}`);
});
