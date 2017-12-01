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
}

export let entryBackend = new EntryBackend();
