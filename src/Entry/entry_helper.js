import Entry from "./entry_model";

export default class EntryHelper {

    static instance;
    
    constructor() {
        if(this.instance) {
            return this.instance;
        }
        this.instance = this;
    }

    /** 
     * Convert object to entry
     * @param {string} id
     * @param {string} sheet_id
     * @param {Object} data - This represents the object to be converted to Entry object
     * @returns {Entry} 
     */
    toEntry(id, sheet_id, data) {
        return new Entry(id, sheet_id, data.sr_no, data.type, data.gst_no, data.inv_no, data.inv_date, data.inv_type, data.pos, data.inv_val, data.taxable_val, data.rate, data.igst, data.cgst, data.sgst);
    }

    /**
     * 
     * @param {string} sheet_id 
     * @param {string} sr_no 
     * @param {string} gst_no 
     * @param {string} inv_no 
     * @param {string} pos 
     * @param {number} inv_val 
     * @param {Date} inv_date 
     */
    toEntryfromMinimal(sheet_id, sr_no, gst_no, inv_no, pos, inv_val, inv_date) {
        let taxable_val = (inv_val * 100) / 118;
        let cgst, igst, sgst;
        if(pos.toLowerCase() === 'delhi'){
            cgst = taxable_val * 0.09;
            sgst = taxable_val * 0.09;
            igst = 0;
        } else {
            cgst = 0;
            sgst = 0;
            igst = taxable_val * 0.18;
        }
        return new Entry(null, sheet_id, sr_no, 'B2B', gst_no, inv_val, inv_date, 'Regular B2B', pos, inv_val, taxable_val, 18, igst, cgst, sgst);
    }
}