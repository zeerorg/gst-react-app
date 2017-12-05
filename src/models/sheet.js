/** Model for a sheet. Contains a list of entries */
class Sheet {
    
    /**
     * Create a sheet
     * @param {string} id - Firebase ID of sheet
     * @param {string} title - Title of sheet
     * @param {string} details - Details of sheet
     * @param {Array<string>} entries - ID of entries in a sheet
     */
    constructor(id, title, details, entries) {
        this.id = id;
        this.title = title;
        this.details = details;
        this.entries = entries;
    }
}

export default Sheet;