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
     * @param {string} uid - User ID of ssheet owner
     * @returns {Promise<Array<Sheet>>}
     */
    getAllSheets(uid) {
        return new Promise((resolve, reject) => {
            this.database.collection("sheet").where("uid", "==", uid).get().then((querySnapshot) => {
                let sheets = []
                querySnapshot.forEach((docSnapshot) => {
                    sheets.push(cSheetHelper.toSheetWithoutEntries(docSnapshot.id, docSnapshot.data()));
                })
                resolve(sheets);
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        });
    }

    /** 
     * Add a new sheet
     * @param {string} title - title of sheet
     * @param {string} details - details of sheet
     * @param {string} uid - User ID of sheet owner
     * @returns {Promise<void>} after the write is done
     */
    addNewSheet(title, details, uid) {
        return this.database.collection("sheet").add({
            "title": title,
            "details": details,
            "uid": uid
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
            this.database.collection("sheet").doc(id).get().then(docSnapshot => {
                sheet = cSheetHelper.toSheetWithoutEntries(id, docSnapshot.data());
                return this.database.collection("entry").where("sheet_id", "==", id).get();
            }).then(querySnapshot => {
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
     * @returns {Promise<void>}
     */
    deleteSheet(sheet_id, entries) {
        let batch = this.database.batch();
        batch.delete(this.database.collection("sheet").doc(sheet_id));
        for (let entry_id in entries) {
            batch.delete(this.database.collection("entry").doc(entry_id))
        }
        return batch.commit();
    }

    /** 
     * Update a sheet with new data
     * @param {string} sheet_id - Id of the sheet to be editted
     * @param {string} title - title of the sheet
     * @param {string} details - details of sheet
     * @returns {Promise<DocumentReference>} after the write is done
     */
    editSheet(sheet_id, title, details) {
        let obj = { "title": title, "details": details }
        return this.database.collection("sheet").doc(sheet_id).set(obj, { "merge": true })
    }
}

export let sheetsBackend = new SheetsBackend();
