const fs = require("fs");
var MD5 = require("crypto-js/md5");

//declare all your data

const rootdir = process.cwd()

//get unique id for data file (for comparison)
function md5(json) {
  const jsonstr = JSON.stringify(json)
  return MD5(jsonstr).toString()
}

//syncronous data reading
var files = fs.readdirSync(rootdir + "/data")
  database = {}
  files.forEach(filename => {
    let name = filename.split('.').slice(0, -1).join('.')
    let jsontype = filename.split('.').pop() === "json" ? true : false
    if(jsontype) {
    database[name] = {} 
    database[name].name = "data/" + filename
    database[name].data = JSON.parse(fs.readFileSync("data/" + filename, "utf8"));
    database[name].md5 = md5(database[name].data)
    }
  });

exports.databases = {
  db:database
};

module.exports = this.databases

//show local export object
//console.log(this.databases)