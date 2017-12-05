/* Model for an entry */

export default class Entry {
    
    constructor(id, sheet_id, sr_no, type, gst_no, inv_no, inv_date, inv_type, pos, inv_val, taxable_val, rate, igst, cgst, sgst) {
        this.id = id;
        this.sheet_id = sheet_id;
        this.sr_no = sr_no;
        this.type = type;
        this.gst_no = gst_no;
        this.inv_no = inv_no;
        this.inv_date = new Date(inv_date);
        this.inv_type = inv_type;
        this.inv_val = inv_val;
        this.pos = pos;
        this.taxable_val = taxable_val;
        this.rate = rate
        this.igst = igst;
        this.cgst = cgst;
        this.sgst = sgst;

        this.getDate = this.getDate.bind(this);
    }

    getDate() {
        var dd = this.inv_date.getDate();
        var mm = this.inv_date.getMonth()+1; //January is 0!
        
        var yyyy = this.inv_date.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        }
        return dd+'/'+mm+'/'+yyyy;
    }

}