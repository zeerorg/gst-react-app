import Entry from '../entry_model';
import EntryHelper from '../entry_helper';
import { load as loadDb } from '../../global/test_backend';

class EntryBackend {

    constructor() {
        this.helper = new EntryHelper();

        this.getEntry = this.getEntry.bind(this);
    }

    /**
     * Get an entry from database
     * @param {string} entry_id - ID of the entry to retrieve
     * @returns {Promise<Entry>}
     */
    getEntry(entry_id) {
        return new Promise((resolve, reject) => {
                // load database
                loadDb().then(([sheets, entries]) => {
                  entries.findOne({ _id: entry_id }, (err, doc) => { 
                    resolve(doc);
                  })
                }).catch(reject)
            })
    }

    /**
     * Add a new entry to the database.
     * @param {Entry} entry - Entry object to be added
     * @returns {Promise<DocumentReference>}
     */
    addNewEntry(entry) {
        let obj = { ...entry.getObject(), _id: entry.id };
        return new Promise((resolve, reject) => {
            loadDb().then(([sheets, entries]) => { 
              entries.insert(obj, (err, doc) => {
                resolve(docRef);
              })
            })
        });
    }

    /**
     * Delete an entry
     * @param {string} entry_id - ID of entry to be deleted
     * @returns {Promise<void>}
     */
    deleteEntry(entry_id) {
        return new Promise((resolve, reject) => resolve)
    }

    /**
     * @param {Entry} entry
     */
    updateEntry(entry) {
        return new Promise((resolve, reject) => resolve);
    }
}

export let entryBackend = new EntryBackend();
