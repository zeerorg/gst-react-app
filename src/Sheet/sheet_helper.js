import Sheet from "../models/sheet";

export default class SheetHelper {

    /**
     * check if a given object is Sheet or not
     * @param {Sheet} sheet - A sheet object
     * @return {boolean}
     */
    checkSheet(sheet) {
        return (sheet.id && sheet.title && sheet.details && sheet.entries);
    }

    /** 
     * Create a sheet with empty entries
     * @returns {Sheet} 
     */
    toSheetWithoutEntries(key, data) {
        return new Sheet(key, data.title, data.details, [])
    }
}