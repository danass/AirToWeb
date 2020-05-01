const fs = require("fs");
const AirJSON = require("air_json");
var config = require("./config.js");

require("./databases.js") //require('./databases')();

// console.log(db.dcvm.md5)
// console.log(config.dechetheque.name)

function update(configname, tableID, maxRecords) {
 let airJSON = new AirJSON({
    apiKey: config[configname].auth_key,
    baseID: config[configname].base_name,
    tableID: tableID,
    //maxRecords: 32,
    maxRecords: maxRecords,
    view: "Grid view",
 
  });

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
               if(db[configname].md5 != md5(tempfile)) 
                {
                fs.renameSync("data/" + configname + ".temp.json", "data/" + configname + ".json");
                console.log("temps file replace old "+configname+" version")
                }
                else {
                  console.log("file: "+configname+" already up to date")
                }
            } catch(e) {
              if (e instanceof TypeError) {
                fs.renameSync("data/" + configname + ".temp.json", "data/" + configname + ".json");
                console.log("temps file "+configname+" moved to create new database")
              }
              else console.error(e);
            }

          }
        )
      );
  } catch (err) {
    console.error(err);
  }
}

//update(config.dechetheque.name, "1-Déchet")
//update(config.dcvm.name, "Personne", 32)


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