import React, { Component } from 'react';
import moment from 'moment';
// eslint-disable-next-line
import { withRouter } from 'react-router';

import DateInput from '../../global/components/DateInput';
import SubmitButton from '../../global/components/SubmitButton';
import Loader from '../../global/components/Loader/main';
import Input from '../../global/components/Input';
import DeleteButton from '../../global/components/DeleteButton';
import Form from '../../global/components/Form';
import FormHeading from '../../global/components/FormHeading';

import { entryBackend } from '../entry_backend';

/**
 * Displays the entry details in a form to be edited
 * Entry ID is retrieved from URL 
 */
export default class EntryDetail extends Component {

    constructor(props) {
        super();
        this.entry_id = props.match.params.entryId;
        this.backend = entryBackend;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
    }

    componentWillMount() {
        this.setState({status: "fetching"});
        this.backend.getEntry(this.entry_id).then((entry) => {
            console.log(entry);
            entry["inv_date"] = moment(entry["inv_date"])
            this.setState({
                status: "fetched",
                entry: entry
            });
        });
    }

    loadingData() {
        return  (
            <div className="EntryDetail">
                <Loader />
            </div>
        )
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        let entry = this.state.entry;
        entry[name] = value;
        this.setState({entry: entry});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.backend.updateEntry(this.state.entry);
        this.props.history.goBack();
    }

    handleDateChange(date) {
        console.log(date);
        let entry = this.state.entry;
        entry["inv_date"] = moment(date);
        this.setState({entry: entry});
    }

    deleteEntry() {
        this.backend.deleteEntry(this.state.entry.id);
        this.props.history.goBack();
    }

    /**
     * 
     * @param {Entry} entry
     */
    populateItem(entry) {
        return (
            <div className="EntryDetail">
                <FormHeading>Edit entry {this.state.entry.sr_no}</FormHeading>
                <div className="row">
                    <Form onSubmit={this.handleSubmit}>
                        <DateInput value={this.state.entry.inv_date.toDate()} onChange={this.handleDateChange} usage="Date" />
                        <Input usage="Serial Number" name="sr_no" value={this.state.entry.sr_no} onChange={this.handleChange} />
                        <Input usage="Type" name="type" value={this.state.entry.type} onChange={this.handleChange} />
                        <Input usage="GST Number" name="gst_no" value={this.state.entry.gst_no} onChange={this.handleChange} />
                        <Input usage="Invoice Number" name="inv_no" value={this.state.entry.inv_no} onChange={this.handleChange} />
                        <Input usage="Invoice Type" name="inv_type" value={this.state.entry.inv_type} onChange={this.handleChange} />
                        <Input usage="Invoice Value" name="inv_val" value={this.state.entry.inv_val} onChange={this.handleChange} type="number"/>
                        <Input usage="POS" name="pos" value={this.state.entry.pos} onChange={this.handleChange} />
                        <Input usage="Taxable Value" name="taxable_val" value={this.state.entry.taxable_val} onChange={this.handleChange} type="number"/>
                        <Input usage="Rate" name="rate" value={this.state.entry.rate} onChange={this.handleChange} type="number"/>
                        <Input usage="IGST" name="igst" value={this.state.entry.igst} onChange={this.handleChange} type="number"/>
                        <Input usage="CGST" name="cgst" value={this.state.entry.cgst} onChange={this.handleChange} type="number"/>
                        <Input usage="SGST" name="sgst" value={this.state.entry.sgst} onChange={this.handleChange} type="number"/>
                        <SubmitButton />
                        <DeleteButton onClick={this.deleteEntry} />
                    </Form>
                </div>
            </div>
        )
    }

    render() {
        if(this.state.status === "fetching")
            return this.loadingData()
        return this.populateItem(this.state.entry);
    }
}
