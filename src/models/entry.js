/* Model for an entry */

export default class Entry {

    constructor(id, sr_no, type, gst_no, inv_no, inv_date, inv_type, pos, inv_val, taxable_val, igst, cgst, sgst) {
        this.id = id;
        this.sr_no = sr_no;
        this.type = type;
        this.gst_no = gst_no;
        this.inv_no = inv_no;
        this.inv_date = inv_date;
        this.inv_type = inv_type;
        this.inv_val = inv_val;
        this.pos = pos;
        this.taxable_val = taxable_val;
        this.igst = igst;
        this.cgst = cgst;
        this.sgst = sgst;
    }

}