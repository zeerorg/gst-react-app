import BackendBase from './base';

export default class EntryBackend {

    constructor() {
        this.backend = new BackendBase();
        this.database = this.backend.database;
        this.instance = this;
    }

    /* returns Promise < List<Sheet> > */
    
}
