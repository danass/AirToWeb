//this is the templacte for another website: Acte.life

const express = require("express");
const site = express();

var databases = require("../databases.js");

module.exports = function(site){

    const foldir = process.cwd() + "/public/actelife";

    site.set("view engine", "pug");
    site.use(express.static(foldir));

    site.get("/", function(req, res, next) {
        res.render("acte/index", {
          title: "Acte",
        });
        next();
      });

      res.end();
}