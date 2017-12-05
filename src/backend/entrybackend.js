import { firebaseBase } from './base';
// eslint-disable-next-line
import Entry from '../models/entry';
import EntryHelper from '../helper/entryhelper';
// eslint-disable-next-line
import Sheet from '../models/sheet';

class EntryBackend {

    constructor() {
        this.backend = firebaseBase;
        this.database = this.backend.database;
        this.instance = this;
        this.helper = new EntryHelper();
    }

    /**
     * @param {string} sheet_id - Firebase ID of sheet 
     * @returns {Promise<Array<Entry>>} 
     */
    getAllEntries(sheet_id) {
        return new Promise((resolve, reject) => {
            resolve(null);
        });
    }

    /**
     * Get an entry from database
     * @param {string} entry_id - ID of the entry to retrieve
     * @param {string} sheet_id - ID of the sheet which contains that entry
     * @returns {Entry}
     */
    getEntry(entry_id, sheet_id) {
        return new Promise((resolve, reject) => {
            this.database.collection("entry").doc(entry_id).get().then((docSnapshot) => {
                let entry = this.helper.toEntry(entry_id, sheet_id, docSnapshot.data());
                resolve(entry);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    /**
     * Add a new entry to the database.
     * @param {Entry} entry - Entry object to be added
     * @returns {Promise}
     */
    addNewEntry(entry) {
        return new Promise((resolve, reject) => {
            let data = {
                sr_no: entry.sr_no,
                type: entry.type,
                gst_no: entry.gst_no,
                inv_type: entry.inv_type,
                inv_no: entry.inv_no,
                inv_date: entry.inv_date.toString(),
                inv_val: entry.inv_val,
                pos: entry.pos,
                taxable_val: entry.taxable_val,
                rate: entry.rate,
                igst: entry.igst,
                cgst: entry.cgst,
                sgst: entry.sgst,
                sheet_id: entry.sheet_id
            };
            //this.database.ref("sheet-entries").child(entry.sheet_id).child(key).set(true);
            this.database.collection("entry").add(data).then((docRef) => {
                resolve(docRef);
            }).catch((err) => {
                reject(err);
            })
        });
    }
}

export let entryBackend = new EntryBackend();
