const fs = require("fs");
const AirJSON = require("air_json");
var config = require("./config.js");

const dechetkAir = new AirJSON({
  apiKey: config.dechetheque.auth_key,
  baseID: config.dechetheque.base_name,
  tableID: "1-Déchet",
  //  maxRecords: 9,
  //pageSize: 1,
  // filterByFormula: '({Role} = "Apprenant")',
  // fields, filterByFormula, maxRecords,
  // pageSize, sort, view, timeZoe, userLocale
  // Cf. https://airtabe.com/api
  // fields: ["Apprenant"]
  view: "Grid view"
  //filterByFormula: "NOT({Title} = '')",
  // When set, will nly fetch related records on
  // fields named here. Otherwise will return an array
  // of "rec123456789" identifiers (Airtable API default).
  // When not set, all linked records are fetched.
  // Optional. Defaults to undefined.
  // relationshipFields: ["Apprenant", "Personne"]
});

try {
  if (fs.existsSync("data/dechetheque.json")) {
    console.log("The file exists. (dechetheque.json)");
  } else {
    dechetkAir.fetch().then(t =>
      fs.writeFile(
        "data/dechetheque.json",
        JSON.stringify(t.nested(2)),

        function callback(err) {
          console.log("dechetk updated", err); //sasa
        }
      )
    );
  }
} catch (err) {
  console.error(err);
}


const mainAir = new AirJSON({
  apiKey: config.main.auth_key,
  baseID: config.main.base_name,
  tableID: "Personne",
   maxRecords: 32,
  //pageSize: 1,
  // filterByFormula: '({Role} = "Apprenant")',
  // fields, filterByFormula, maxRecords,
  // pageSize, sort, view, timeZoe, userLocale
  // Cf. https://airtabe.com/api
  // fields: ["Apprenant"]
  view: "Grid view"
  //filterByFormula: "NOT({Title} = '')",
  // When set, will nly fetch related records on
  // fields named here. Otherwise will return an array
  // of "rec123456789" identifiers (Airtable API default).
  // When not set, all linked records are fetched.
  // Optional. Defaults to undefined.
  // relationshipFields: ["Apprenant", "Personne"]
});

try {
  if (fs.existsSync("data/newdata.json")) {
    console.log("The file exists. (data.json)");
  } else {
    mainAir.fetch().then(t =>
      fs.writeFile(
        "data/newdata.json",
        JSON.stringify(t.nested(2)),

        function callback(err) {
          console.log("data updated", err); //sasa
        }
      )
    );
  }
} catch (err) {
  console.error(err);
}
