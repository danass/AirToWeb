const fs = require("fs");

const data = JSON.parse(fs.readFileSync("data/data.json", "utf8")); //Parse Source JSON des datas
const dechetdata = JSON.parse(fs.readFileSync("data/dechetheque.json", "utf8")); //Parse Source JSON des datas
const evaluation = JSON.parse(fs.readFileSync("data/evaluation.json", "utf8")); //Parse Source JSON des datas

exports.databases = {
  data: data,
  dechetdata: dechetdata,
  evaluation: evaluation
};

module.exports = this.databases
//console.log(this)

const aws = process.platform != "win32"? true: false