#!/usr/bin/env node

const express = require("express");
const site = express();
const _ = require("lodash");
const fs = require("fs");
var UpdateData = require("./updateData.js");

const rootdir = process.cwd()
console.log("rot", rootdir)

const data = JSON.parse(fs.readFileSync("data/data.json", "utf8")); //Parse Source JSON des datas
const dechetdata = JSON.parse(fs.readFileSync("data/dechetheque.json", "utf8")); //Parse Source JSON des datas

// const fields = ["Prenom", "Nom", "Moto"];

// const mapfield = _.map(fields, field => {
//   return data.map(d => d[field]);
// });

const foldir = process.cwd() + "/public";

site.set("view engine", "pug");
site.use(express.static(foldir));

site.get("/", function(req, res, next) {
  res.render("index", {
    title: "Formation Design Circulaire"
  });
  next();
});

site.get("/competences", function(req, res, next) {
  res.render("competences", {
    title: "Compétences déclarées - Formation Design Circulaire",
    persons: data
  });

  next();
});

site.get("/:dechetk", function(req, res, next) {
  if (req.params.dechetk == "dechetk") {
    res.render("dechetk", {
      title: "Déchéthèque - Formation Design Circulaire",
      dechets: dechetdata
    });
  }
  next();
});

site.get("/dechetk/:dechet", function(req, res, next) {
  for (let dechet of dechetdata) {
    if (req.params.dechet === dechet._id) {
      res.render("dechet", {
        title: "Dechet " + dechet.Nom + " - Formation Design Circulaire",
        dechet: dechet
      });
    }
  }
  next();
});

site.get("/:apprenants", function(req, res, next) {
  if (req.params.apprenants == "apprenants") {
    res.render("apprenants", {
      title: "Trombi - Formation Design Circulaire",
      persons: data
    });
  }
  next();
});

site.get("/apprenants/:user", function(req, res, next) {
  for (let person of data) {
    if (req.params.user === person.Prenom) {
      res.render("ficheindividuelle", {
        title: "Fiche de " + person.Prenom + " - Formation Design Circulaire",
        persons: person
      });
    }
  }
  next();
});


site.get("/:enseignants", function(req, res, next) {
  if (req.params.enseignants == "enseignants") {
    res.render("enseignants", {
      title: "Trombi Enseignants - Formation Design Circulaire",
      persons: data
    });
  }
  next();
});

site.get("/enseignants/:user", function(req, res, next) {
  for (let person of data) {
    if (req.params.user === person.Prenom) {
      res.render("ficheindividuelle", {
        title: "Fiche de " + person.Prenom + " - Formation Design Circulaire",
        persons: person
      });
    }
  }
  next();
});


site.get("/journal/:user", function(req, res, next) {
  for (let person of data) {
    if (req.params.user === person.Prenom) {
      res.render("journal", {
        title: "Journal de " + person.Prenom + " - Formation Design Circulaire",
        persons: person
      });
    }
  }
  res.end();
});

site.listen(8080);
