import Entry from "./entry_model";
import moment from "moment";

export default class EntryHelper {

    /** 
     * Convert object to entry
     * @param {string} id
     * @param {string} sheet_id
     * @param {Object} data - This represents the object to be converted to Entry object
     * @returns {Entry} 
     */
    toEntry(id, sheet_id, data) {
        return new Entry(id, sheet_id, data.sr_no, data.type, data.gst_no, data.inv_no, moment(data.inv_date), data.inv_type, data.pos, data.inv_val, data.taxable_val, data.rate, data.igst, data.cgst, data.sgst);
    }

    /**
     * Create an entry from minimal amount of data
     * @param {string} sheet_id 
     * @param {string} sr_no 
     * @param {string} gst_no 
     * @param {string} inv_no 
     * @param {string} pos 
     * @param {number} inv_val 
     * @param {Date} inv_date 
     */
    toEntryfromMinimal(sheet_id, sr_no, gst_no, inv_no, pos, tax_val, inv_date) {
        let cgst, igst, sgst;
        if(pos.toLowerCase() === 'delhi'){
            cgst = tax_val * 0.09;
            sgst = tax_val * 0.09;
            igst = 0;
        } else {
            cgst = 0;
            sgst = 0;
            igst = tax_val * 0.18;
        }
        cgst = this.roundNum(cgst);
        igst = this.roundNum(igst);
        sgst = this.roundNum(sgst);
        let inv_val = Number(tax_val) + Number(cgst) + Number(igst) + Number(sgst);
        return new Entry(null, sheet_id, sr_no, 'B2B', gst_no, inv_no, inv_date, 'Regular B2B', pos, inv_val, tax_val, 18, igst, cgst, sgst);
    }

    /**
     * Round a number to closest value
     * @private
     * @param {number} num - Number to be rounded
     */
    roundNum(num) {
        let round = Math.round(num);
        if(round-num === 0.5) {
            round -= 1;
        }
        return round;
    }
}