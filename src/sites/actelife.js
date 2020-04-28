const express = require("express");
const site = express();

var databases = require("../databases.js");
const data = databases.data

module.exports = function(site){

    const foldir = process.cwd() + "/public";

    site.set("view engine", "pug");
    site.use(express.static(foldir));

    site.get("/", function(req, res, next) {
        res.render("acte/index", {
          title: "Formation Design Circulaire",
          persons: data
        });
        next();
      });

      res.end();
}