import { firebaseBase } from '../global/base_backend';
import SheetHelper from "./sheet_helper";

const cSheetHelper = new SheetHelper();

class SheetsBackend {
    constructor() {
        this.backend = firebaseBase;
        this.database = this.backend.database;
    }

    /**
     * Fetches list of all sheets
     * @returns {Promise<Sheet>} 
     */
    getAllSheets() {
        return new Promise((resolve, reject) => {
            this.database.collection("sheet").get().then((querySnapshot) => {
                let sheets = []
                querySnapshot.forEach((docSnapshot) => {
                    sheets.push(cSheetHelper.toSheetWithoutEntries(docSnapshot.id, docSnapshot.data()));
                })
                resolve(sheets);
            }).catch((err) => {
                reject(err);
            })
        });
    }

    /** 
     * Add a new sheet
     * @param {string} title - title of sheet
     * @param {string} details - details of sheet
     * @returns {Promise} after the write is done
     */
    addNewSheet(title, details) {
        // return this.database.ref("sheet-data").push({
        //     "details": details,
        //     "title": title
        // });
        return this.database.collection("sheet").add({
            "title": title,
            "details": details
        });
    }

    /**
     * Fetches details of a sheet from it's id
     * @param {string} id - Sheet ID to be retrieved
     * @returns {Promise<Sheet>} - with all entries id
     */
    getSheetDetail(id) {
        return new Promise((resolve, reject) => {
            let sheet;
            this.database.collection("sheet").doc(id).get().then((docSnapshot) => {
                sheet = cSheetHelper.toSheetWithoutEntries(id, docSnapshot.data());
                return this.database.collection("entry").where("sheet_id", "==", id).get();
            }).then((querySnapshot) => {
                if(!querySnapshot.empty) {
                    let entries = [];
                    querySnapshot.forEach((docSnapshot) => {
                        entries.push(docSnapshot.id);
                    });
                    sheet.entries = entries;
                }
                resolve(sheet);
            }).catch((err)=>{
                reject(err);
            });
        });
    }
    /**
     * Deletes sheet
     * @param {string} sheet_id - Sheet ID to be deleted
     * @param {Array<string>} entries - List of Entries to be deleted
     * @returns {Promise}
     */
    deleteSheet(sheet_id, entries) {
        this.database.collection("sheet").doc(sheet_id).delete();
        entries.forEach((entry_id) => {
            this.database.collection("entry").doc(entry_id).delete();
        });
    }
}

export let sheetsBackend = new SheetsBackend();
