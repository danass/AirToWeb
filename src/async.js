const fs = require("fs");
var MD5 = require("crypto-js/md5");

const rootdir = process.cwd()

//get unique id for data file (for comparison)
function md5(json) {
  const jsonstr = JSON.stringify(json)
  return MD5(jsonstr).toString()
}

//asyncronous data fetching // this method should be transformed to async (unsecured)
var files = fs.readdirSync(rootdir + "/data")

const reload = async (db) => {
  
  database = {}
  console.time("dbsave");
  files.forEach(filename => {
    
    let name = filename.split('.').slice(0, -1).join('.')

    let jsontype = filename.split('.').pop() === "json" ? true : false
    if(jsontype && db == name) {
      database[name] = {} 
      database[name].name = "data/" + filename
      database[name].data = JSON.parse(fs.readFileSync("data/" + filename, "utf8"));
      database[name].md5 = md5(database[name].data)
    }
  });
 console.timeEnd("dbsave")
 return database
}

    // const db = reload()
    exports.async = {
        //md5:md5,
        reload:reload
      };
      
       module.exports = this.async
      // global.asyncdb = db
      //global.md5 = asyncmd5

      

