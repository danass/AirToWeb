const fs = require("fs");
const AirJSON = require("air_json");
var config = require("./config.js");

const path = "data/data.json"
const getFileUpdatedDate = (path) => {
  const stats = fs.statSync(path)
  console.log(stats)
  return stats.mtime
}
var databases = require("./databases.js"); //require('./databases')();
const data = databases.data

var MD5 = require("crypto-js/md5");
console.log(MD5(data).toString());

console.log("487f7b22f68312d2c1bbc93b1aea445b")



// const dechetkAir = new AirJSON({
//   apiKey: config.dechetheque.auth_key,
//   baseID: config.dechetheque.base_name,
//   tableID: "1-Déchet",
//   view: "Grid view",
// });

// try {
//   if (fs.existsSync("data/dechetheque.json")) {
//     console.log("The file exists. (dechetheque.json)");
//   } else {
//     dechetkAir.fetch().then(t =>
//       fs.writeFile(
//         "data/dechetheque.json",
//         JSON.stringify(t.nested(2)),

//         function callback(err) {
//           console.log("dechetk updated", err); //sasa
//         }
//       )
//     );
//   }
// } catch (err) {
//   console.error(err);
// }

//get data from airtable
// const mainAir = new AirJSON({
//   apiKey: config.main.auth_key,
//   baseID: config.main.base_name,
//   tableID: "Personne",
//    maxRecords: 32,
//   view: "Grid view",
// });



// try {
//   if (fs.existsSync("data/data.json")) {
//     console.log("The file exists. (data.json)");
//   } else {
//     mainAir.fetch().then(t =>
//       fs.writeFile(
//         "data/data.json",
//         JSON.stringify(t.nested(2)),

//         function callback(err) {
//           console.log("data updated", err); //sasa
//         }
//       )
//     );
//   }
// } catch (err) {
//   console.error(err);
// }


  //  maxRecords: 9,
  //pageSize: 1,
  // filterByFormula: '({Role} = "Apprenant")',
  // fields, filterByFormula, maxRecords,
  // pageSize, sort, view, timeZoe, userLocale
  // Cf. https://airtabe.com/api
  // fields: ["Apprenant"]
    //filterByFormula: "NOT({Title} = '')",
  // When set, will nly fetch related records on
  // fields named here. Otherwise will return an array
  // of "rec123456789" identifiers (Airtable API default).
  // When not set, all linked records are fetched.
  // Optional. Defaults to undefined.
  // relationshipFields: ["Apprenant", "Personne"]