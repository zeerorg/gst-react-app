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
                    sheets.push(cSheetHelper.toSheet(value.key, value.val()));
                });
                resolve(sheets);
            }).catch(err => {
                resolve({data: err});
            })
        });
    }
}

export let sheetsBackend = new SheetsBackend();
