import { firebaseBase } from './base';
import SheetHelper from "../helper/sheethelper";

const cSheetHelper = new SheetHelper();

class SheetsBackend {

    constructor() {
        this.backend = firebaseBase;
        this.database = this.backend.database;
    }

    /* returns Promise < List<Sheet> > */
    getAllSheets() {
        let sheets = [];
        return new Promise((resolve, reject) => {
            this.database.ref("sheet-data").once('value').then((snapshot) => {
                snapshot.forEach(value => {
                    sheets.push(cSheetHelper.toSheetWithoutEntries(value.key, value.val()));
                });
                resolve(sheets);
            }).catch(err => {
                resolve({data: err});
            })
        });
    }

    /* @returns: Promise<>, after the write is done */
    addNewSheet(title, details) {
        return this.database.ref("sheet-data").push({
            "details": details,
            "title": title
        });
    }

    /* returns Promise<Sheet> with all entries id */
    getSheetDetail(id) {
        return new Promise((resolve, reject) => {
            let sheet;
            this.database.ref("sheet-data").child(id).once("value").then((snapshot) => {
                sheet = cSheetHelper.toSheetWithoutEntries(id, snapshot.val());
                return this.database.ref("sheet-entries").child(id).once("value");
            }).then((snapshot) => {
                let entries = Object.keys(snapshot.val());
                if(entries){
                    sheet.entries = entries;
                }
                resolve(sheet);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

export let sheetsBackend = new SheetsBackend();
