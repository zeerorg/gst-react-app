/* Model for a sheet. Contains a list of entries */

export default class Sheet {
    
    /* @entries: List<string> contains id of all entries */
    constructor(id, title, details, entries) {
        this.id = id;
        this.title = title;
        this.details = details;
        this.entries = entries;
    }

    createFromEntry(data) {
        return new Sheet(data);
    }
}