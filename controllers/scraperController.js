const express = require("express");
const db = require("../models/index.js");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

router.get("/", (req, res) => {

    res.render("index");
        
});

router.get("/articles", (req, res) => {
    
    db.Article.find({})
        .then(dbArticle => {

            res.render("articles", {
                results: dbArticle
            });

        }).catch(err => res.json(err));
});

router.get("/scrape", (req, res) => {
    
    axios.get("https://www.nhl.com/").then(response => {
        const $ = cheerio.load(response.data);

        const results = [];

        $("h4.headline-link").each((i, element) => {

            const result = {};
            
            let headline = $(element).text();
            result.headline = headline;

            let summary = $(element).next().text();
            result.summary = summary;

            let link = $(element).parent().attr("href");
            result.link = link;

            results.push(result);

            db.Article.create(result)
                .then(dbArticle => console.log(dbArticle))
                .catch(err => console.log(err));

        });

        res.redirect("/articles");
    });  


});



module.exports = router;