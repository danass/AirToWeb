const fs = require("fs");

const data = JSON.parse(fs.readFileSync("data/data.json", "utf8")); //Parse Source JSON des datas
const dechetdata = JSON.parse(fs.readFileSync("data/dechetheque.json", "utf8")); //Parse Source JSON des datas


exports.databases = {
  data: data,
  dechetdata: dechetdata
};

module.exports = this.databases
//console.log(this)