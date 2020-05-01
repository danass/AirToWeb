//this page is the routing for DCVM website, an instance of an airtable based website structuring interaction in  a classroom and the follow up of the students
//Most of the structuring is made within Pug

const express = require("express");
const site = express();
var databases = require("../databases.js");

// local names for databases (for easyness)
const data = databases.db.dcvm.data
const dechetdata = databases.db.dechetheque.data
const evaluation = databases.db.evaluation.data


module.exports = function(site){

    const foldir = process.cwd() + "/public";

    site.set("view engine", "pug");
    site.use(express.static(foldir));
    

site.get("/", function(req, res, next) {
    res.render("vm/apprenants", {
      title: "Formation Design Circulaire",
      persons: data
    });
    next();
  });
  
  site.get("/competences", function(req, res, next) {
    res.render("vm/competences", {
      title: "Compétences déclarées - Formation Design Circulaire",
      persons: data
    });
  
    next();
  });
  
  site.get("/cours", function(req, res, next) {
    res.render("vm/cours", {
      title: "Liste des cours - Formation Design Circulaire",
    });
  
    next();
  });
  
  site.get("/evaluation", function(req, res, next) {
    res.render("vm/evaluation", {
      title: "Evaluation Retours Formation - Formation Design Circulaire",
      evaluation: evaluation
    });
  
    next();
  });
  
  site.get("/softskills", function(req, res, next) {
    res.render("vm/softskills", {
      title: "Softskills - Formation Design Circulaire"
    });
  
    next();
  });

  site.get("/retours", function(req, res, next) {
    res.render("vm/retours", {
      title: "Retours evaluation - Formation Design Circulaire"
    });
  
    next();
  });
  
  
  site.get("/pads", function(req, res, next) {
    res.render("vm/pads", {
      title: "Pads Discussions - Formation Design Circulaire",
      persons: data
    });
  
    next();
  });
  
  
  site.get("/:dechetk", function(req, res, next) {
    if (req.params.dechetk == "dechetk") {
      res.render("vm/dechetk", {
        title: "Déchéthèque - Formation Design Circulaire",
        dechets: dechetdata
      });
    }
    next();
  });
  
  site.get("/dechetk/:dechet", function(req, res, next) {
    for (let dechet of dechetdata) {
      if (req.params.dechet === dechet._id) {
        res.render("vm/dechet", {
          title: "Dechet " + dechet.Nom + " - Formation Design Circulaire",
          dechet: dechet
        });
      }
    }
    next();
  });
  
  site.get("/:apprenants", function(req, res, next) {
    if (req.params.apprenants == "apprenants") {
      res.render("vm/apprenants", {
        title: "Trombi - Formation Design Circulaire",
        persons: data
      });
    }
    next();
  });
  
  site.get("/apprenants/:user", function(req, res, next) {
    for (let person of data) {
      if (req.params.user === person.Prenom) {
        res.render("vm/ficheindividuelle", {
          title: "Fiche de " + person.Prenom + " - Formation Design Circulaire",
          persons: person
        });
      }
    }
    next();
  });
  
  
  site.get("/:enseignants", function(req, res, next) {
    if (req.params.enseignants == "enseignants") {
      res.render("vm/enseignants", {
        title: "Trombi Enseignants - Formation Design Circulaire",
        persons: data
      });
    }
    next();
  });
  
  site.get("/enseignants/:user", function(req, res, next) {
    for (let person of data) {
      if (req.params.user === person.Prenom) {
        res.render("vm/ficheindividuelle", {
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
        res.render("vm/journal", {
          title: "Journal de " + person.Prenom + " - Formation Design Circulaire",
          persons: person
        });
      }
    }
    res.end();
  });
 
 
  
}

