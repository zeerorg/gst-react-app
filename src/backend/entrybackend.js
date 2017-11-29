import BackendBase from './base';

export default class SheetsBackend {
    static instance;

    constructor() {
        if(this.instance) {
            return this.instance;
        }
        this.backend = new BackendBase();
        this.database = this.backend.database;
        this.instance = this;
    }

    /* returns Promise < List<Sheet> > */
    
}
