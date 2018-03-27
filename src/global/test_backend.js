// this will create a nedb in memory store loaded from json
// exports actual database which will be directly used
// doesn't write back to disk, for test consistency reason

var Datastore = require('nedb')
  , entries = new Datastore()
  , sheets = new Datastore()
const path = require('path')

let loaded = false;

const load = async function() {
  if (!loaded) {
    let json_path = path.join(__dirname, '../dummy-data.json')
    let data = require(json_path)
    await new Promise((resolve, reject) => {
      entries.insert(Object.keys(data['entries']).map(key => {
        return { _id: key, ...data['entries'][key] }
      }), (err, doc) => {
        if(!err) resolve(doc);  
      });
    })
    await new Promise((resolve, reject) => {
      sheets.insert(Object.keys(data['entries']).map(key => {
        return { _id: key, ...data['entries'][key] }
      }), (err, doc) => {
        if(!err) resolve(doc);
      });
    })
    loaded = true;
  }
  return { entries, sheets };
}

module.exports.load = load
