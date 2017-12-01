import Sheet from "../models/sheet";

export default class SheetHelper {

    static instance;
    
    constructor() {
        if(this.instance) {
            return this.instance;
        }
        this.instance = this;
    }

    /*  check if a given object is Sheet or not
        Return boolean */
    checkSheet(sheet) {
        return (sheet.id && sheet.title && sheet.details && sheet.entries);
    }

    /* returns Sheet object */
    toSheetWithoutEntries(key, data) {
        return new Sheet(key, data.title, data.details, [])
    }    
}