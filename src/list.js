//module working but dirty

const _ = require("lodash");
const fs = require("fs");

var databases = require("./databases.js"); //require('./databases')();
const data = databases.db.dcvm.data
const dechetdata = databases.db.dechetheque.data
const evaluation = databases.db.evaluation.data

// output for pug reading 
var outputpug = [] 
fpug=(o,s)=>!o|[o]==o||Object.keys(o).map(k=>fpug(o[k],k=s?s+['["'+k+'"]']:"["+k+"]",typeof(eval("evaluation" + k)) != "object"?   outputpug.push("data" + k +": " + eval("evaluation" + k)):"ok" ))
fpug(evaluation)

fs.writeFile('data/readDataPug.txt', outputpug.join("" + "\n"), function(err) {
    if(err) return console.error(err);
  });

//orignal function ref (stackexchange)
//f=(o,s)=>!o|[o]==o||Object.keys(o).map( k => f(o[k],k=s?s+['.'+k]:k,console.log(k)   ))
