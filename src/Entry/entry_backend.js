import { firebaseBase } from '../global/base_backend';
// eslint-disable-next-line
import Entry from './entry_model';
import EntryHelper from './entry_helper';

class EntryBackend {

    constructor() {
        this.backend = firebaseBase;
        this.database = this.backend.database;
        this.instance = this;
        this.helper = new EntryHelper();
    }

    /**
     * Get an entry from database
     * @param {string} entry_id - ID of the entry to retrieve
     * @returns {Promise<Entry>}
     */
    getEntry(entry_id) {
        return new Promise((resolve, reject) => {
            this.database.collection("entry").doc(entry_id).get().then((docSnapshot) => {
                let entry = this.helper.toEntry(entry_id, docSnapshot.data()["sheet_id"], docSnapshot.data());
                resolve(entry);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    /**
     * Add a new entry to the database.
     * @param {Entry} entry - Entry object to be added
     * @returns {Promise<DocumentReference>}
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
            this.database.collection("entry").add(data).then((docRef) => {
                resolve(docRef);
            }).catch((err) => {
                reject(err);
            })
        });
    }

    /**
     * Delete an entry
     * @param {string} entry_id - ID of entry to be deleted
     * @returns {Promise<void>}
     */
    deleteEntry(entry_id) {
        return this.database.collection("entry").doc(entry_id).delete();
    }

    /**
     * @param {Entry} entry
     */
    updateEntry(entry) {
        return this.database.collection("entry").doc(entry.id).set(entry.getObject());
    }
}

export let entryBackend = new EntryBackend();
