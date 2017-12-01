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

    toEntryfromMinimal(sheet_id, sr_no, gst_no, inv_no, pos, inv_val, inv_date) {
        let taxable_val = (inv_val * 118) / 100;
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