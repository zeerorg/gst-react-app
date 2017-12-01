import { firebaseBase } from './base';
import EntryHelper from '../helper/entryhelper';

class EntryBackend {

    constructor() {
        this.backend = firebaseBase;
        this.database = this.backend.database;
        this.instance = this;
        this.helper = new EntryHelper();
    }

    /* returns Promise < List<Entry> > */
    getAllEntries(sheet_id) {
        return new Promise((resolve, reject) => {
            resolve(null);
        })
    }

    /* returns Entry */
    getEntry(entry_id, sheet_id) {
        return new Promise((resolve, reject) => {
            this.database.ref("entry-data").child(entry_id).once("value").then((snapshot) => {
              let entry = this.helper.toEntry(entry_id, sheet_id, snapshot.val());
              resolve(entry);
            }).catch((err) => {
              reject(err);
            })
        })
    }

    addNewEntry(entry) {
        return new Promise((resolve, reject) => {
            let key = this.database.ref("entry-data").push({
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
                sgst: entry.sgst
            }).key;
            this.database.ref("sheet-entries").child(entry.sheet_id).child(key).set(true);
        })
    }
}

export let entryBackend = new EntryBackend();
