//this page is the routing for DCVM website, an instance of an airtable based website structuring interaction in  a classroom and the follow up of the students
//Most of the structuring is made within Pug

const express = require("express");
const site = express();
let db = require("../async.js");


  module.exports = async function (site) {

  async function dcvm() {return await db.reload("dcvm").then(function (e) { return e.dcvm.data})}
  async function dechetheque() {return await db.reload("dechetheque").then(function (e) { return e.dechetheque.data})}
  async function evaluation() {return await db.reload("evaluation").then(function (e) { return e.evaluation.data})}
  //  let dcvm = await db.reload("dcvm").then(function (e) { return e.dcvm.data})

    const foldir = process.cwd() + "/public";

    site.set("view engine", "pug");
    site.use(express.static(foldir));
  
    console.log()
      site.get("/", async function (req, res, next) {
      
       res.render("vm/apprenants", {
        title: "Formation Design Circulaire",
        persons: await dcvm()

      });
      next();
    });
  
    site.get("/competences", async function (req, res, next) {

      res.render("vm/competences", {
        title: "Compétences déclarées - Formation Design Circulaire",
        persons: await dcvm()
      });
      next();
    });
  
    site.get("/cours", async function (req, res, next) {

      res.render("vm/cours", {
        title: "Liste des cours - Formation Design Circulaire",
      });
      next();
    });
  
    site.get("/evaluation", async function (req, res, next) {

      res.render("vm/evaluation", {
        title: "Evaluation Retours Formation - Formation Design Circulaire",
        evaluation: await evaluation()
      });
  
      next();
    });
  
    site.get("/softskills", async function (req, res, next) {

      res.render("vm/softskills", {
        title: "Softskills - Formation Design Circulaire"
      });
  
      next();
    });
  
    site.get("/retours", async function (req, res, next) {
      res.render("vm/retours", {
        title: "Retours evaluation - Formation Design Circulaire"
      });
  
      next();
    });
  
  
    site.get("/pads", async function (req, res, next) {

      res.render("vm/pads", {
        title: "Pads Discussions - Formation Design Circulaire",
        persons: await dcvm()
      });
  
      next();
    });
  
  
    site.get("/:dechetk", async function (req, res, next) {

      if (req.params.dechetk == "dechetk") {
        res.render("vm/dechetk", {
          title: "Déchéthèque - Formation Design Circulaire",
          dechets: await dechetheque()
        });
      }
      next();
    });
  
    site.get("/dechetk/:dechet", async function (req, res, next) {

      for (let dechet of await dechetheque()) {
        if (req.params.dechet === dechet._id) {
          res.render("vm/dechet", {
            title: "Dechet " + dechet.Nom + " - Formation Design Circulaire",
            dechet: dechet
          });
        }
      }
      next();
    });
  
    site.get("/:apprenants", async function (req, res, next) {

      if (req.params.apprenants == "apprenants") {
        res.render("vm/apprenants", {
          title: "Trombi - Formation Design Circulaire",
          persons: await dcvm()
        });
      }
      next();
    });
  
    site.get("/apprenants/:user", async function (req, res, next) {

      for (let person of await dcvm()) {
        if (req.params.user === person.Prenom) {
          res.render("vm/ficheindividuelle", {
            title: "Fiche de " + person.Prenom + " - Formation Design Circulaire",
            persons: person
          });
        }
      }
      next();
    });
  
  
    site.get("/:enseignants", async function (req, res, next) {

      if (req.params.enseignants == "enseignants") {
        res.render("vm/enseignants", {
          title: "Trombi Enseignants - Formation Design Circulaire",
          persons: await dcvm()
        });
      }
      next();
    });
  
    site.get("/enseignants/:user", async function (req, res, next) {

      for (let person of await dcvm()) {
        if (req.params.user === person.Prenom) {
          res.render("vm/ficheindividuelle", {
            title: "Fiche de " + person.Prenom + " - Formation Design Circulaire",
            persons: person
          });
        }
      }
      next();
    });
  
  
  
    site.get("/journal/:user", async function (req, res, next) {
 
      for (let person of await dcvm()) {
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


