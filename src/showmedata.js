
const _ = require("lodash");
const fs = require("fs");

var databases = require("./databases.js"); //require('./databases')();
const data = databases.data
const dechetdata = databases.dechetdata
const evaluation = databases.evaluation

// output for pug reading 
var outputpug = [] 
fpug=(o,s)=>!o|[o]==o||Object.keys(o).map(k=>fpug(o[k],k=s?s+['["'+k+'"]']:"["+k+"]",typeof(eval("evaluation" + k)) != "object"?   outputpug.push("data" + k +": " + eval("evaluation" + k)):"ok" ))
fpug(evaluation)

fs.writeFile('datapug.txt', outputpug.join("" + "\n"), function(err) {
    // If an error occurred, show it and return
    if(err) return console.error(err);
    // Successfully wrote to the file!
  });

f=(o,s)=>!o|[o]==o||Object.keys(o).map( k => f(o[k],k=s?s+['.'+k]:k,console.log(k)   ))


// function filtrate(json, reason) {
      
//     return _.reject(_.map(json, reason), function(val){ return _.isUndefined(val) || _.isNull(val) }) // || _.isEmpty(val)
// }

// const captiontext = filtrate(index.varz.data, 'node.edge_media_preview_comment.edges')