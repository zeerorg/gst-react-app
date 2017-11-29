/* Model for a sheet. Contains a list of entries */

export default class Sheet {
    
    constructor(id, title, details, entries) {
        this.id = id;
        this.title = title;
        this.details = details;
        this.entries = entries;
    }

    createFromJSON(data) {
        return new Sheet(/*TODO: Fill in parameters */);
    }
}