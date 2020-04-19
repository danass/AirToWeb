#!/usr/bin/env node

const express = require("express");
const site = express();
const _ = require("lodash");

var UpdateData = require("./updateData.js");
require('./villettemakerz')(site);

const rootdir = process.cwd()
console.log("rot", rootdir)





// const fields = ["Prenom", "Nom", "Moto"];

// const mapfield = _.map(fields, field => {

//   return data.map(d => d[field] && console.log(field));
// });

