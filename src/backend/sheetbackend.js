import BackendBase from './base';
import SheetHelper from "../helper/sheethelper";

const cSheetHelper = new SheetHelper();

/* Singleton */
export default class SheetsBackend {
    static instance;

    constructor() {
        if(this.instance) {
            return this.instance;
        }
        this.backend = new BackendBase();
        this.database = this.backend.database;
        this.instance = this;
    }

    /* returns Promise < List<Sheet> > */
    getAllSheets() {
        let sheets = [];
        return new Promise((resolve, reject) => {
            this.database.ref("sheet-data").once('value').then((snapshot) => {
                snapshot.forEach(value => {
                    sheets.push(cSheetHelper.toSheet(value.key, value.val()));
                });
                resolve(sheets[0]);
                console.log(sheets);
            }).catch(err => {
                resolve({data: err});
            })
        });
    }
}
