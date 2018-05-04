import default as Sheet from '../sheet_model';

export let sheets_backend = {
  
  getAllSheets = function(uid) {
    return Promise.resolve([new Sheet("id", "title", "Test sheet", ["entry1"])]);
  }
  
  addNewSheet = function(title, details, sheet) {
    return Promise.resolve(null)
  }

  getSheetDetail = function(id) {
    return Promise.resolve(new Sheet("id", "title", "Test sheet", ["entry1"]));
  }

  deleteSheet = function(sheet_id, entries) {
    return Promise.resolve(null);
  }
}
