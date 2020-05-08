const fs = require("fs");
const AirJSON = require("air_json");
var config = require("./config.js");

//require("./databases.js") //require('./databases')();

function update(configname, tableID, maxRecords) {
  let airJSON = new AirJSON({
    apiKey: config[configname].auth_key,
    baseID: config[configname].base_name,
    tableID: tableID,
    //maxRecords: 32,
    maxRecords: maxRecords,
    view: "Grid view",
  });

  // list of complimentary Airtable filters:   Cf. https://airtabe.com/api
  //pageSize: 1,
  // filterByFormula: '({Role} = "Apprenant")',
  // fields, filterByFormula, maxRecords,
  // pageSize, sort, view, timeZoe, userLocale
  // fields: ["Apprenant"]
  // filterByFormula: "NOT({Title} = '')",
  // relationshipFields: ["Apprenant", "Personne"] 


  // this test if database has changed since last update and will replace with newer version
  try {
    airJSON.fetch().then(t =>
      fs.writeFile(
        "data/" + configname + ".temp.json",
        JSON.stringify(t.nested(2)),
        function callback(err) {
          const tempfile = JSON.parse(fs.readFileSync("data/" + configname + ".temp.json"))
          //console.log("tempfile", md5(tempfile))
          try {
            //console.log(db[configname].md5 )
            if (db[configname].md5 != md5(tempfile)) {
              fs.renameSync("data/" + configname + ".temp.json", "data/" + configname + ".json");
              console.log("temps file replace old " + configname + " version")
            } else {
              console.log("file: " + configname + " already up to date")
            }
          } catch (e) {
            if (e instanceof TypeError) {
              fs.renameSync("data/" + configname + ".temp.json", "data/" + configname + ".json");
              console.log("temp file " + configname + " moved to create new database")
            } else console.error(e);
          }

        }
      )
    );
  } catch (err) {
    console.error(err);
  }
}

// run databases updates:
//update(config.dechetheque.name, "1-Déchet")
//update(config.dcvm.name, "Personne", 32)