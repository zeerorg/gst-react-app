import Entry from "../models/entry";

export default class EntryHelper {

    static instance;
    
    constructor() {
        if(this.instance) {
            return this.instance;
        }
        this.instance = this;
    }

    /* returns Entry object */
    toEntry(id, sheet_id, data) {
        return new Entry(id, sheet_id, data.sr_no, data.type, data.gst_no, data.inv_no, data.inv_date, data.inv_type, data.pos, data.inv_val, data.taxable_val, data.rate, data.igst, data.cgst, data.sgst);
    }
}