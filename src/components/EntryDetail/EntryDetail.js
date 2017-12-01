import React, { Component } from 'react';
import { entryBackend } from '../../backend/entrybackend';

export default class EntryDetail extends Component {

    constructor(props) {
        super();
        this.sheet_id = props.match.params.sheetId;
        this.entry_id = props.match.params.entryId;
        this.backend = entryBackend;
    }

    componentWillMount() {
        this.setState({status: "fetching"});
        this.backend.getEntry(this.entry_id, this.sheet_id).then((entry) => {
            this.setState({
                status: "fetched",
                entry: entry
            });
        });
    }

    render() {
        return (
            <div className="EntryDetail">
            
            </div>
        )
    }
}