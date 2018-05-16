import React, { Component } from 'react';
import moment from 'moment';
// eslint-disable-next-line
import { withRouter } from 'react-router';

import { entryBackend } from '../entry_backend';
import EntryHelper from '../entry_helper';

import Input from '../../global/components/Input';
import DateInput from '../../global/components/DateInput';
import SubmitButton from '../../global/components/SubmitButton';

/**
 *  To bo entered: serial number, gst number, invoice number, invoice date, pos, invoice value
 *  TODO: Add cancel button
 */
export default class AddEntry extends Component {
    constructor(props) {
        super();
        this.sheet_id = props.match.params.sheetId;
        this.backend = entryBackend;
        this.entryHelper = new EntryHelper();
        this.state = {
          sr_no: '',
          gst_no: '',
          inv_no: '',
          pos: 'Delhi',
          tax_val: 0,
          inv_date: new moment()
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.handleSerialChange = this.handleSerialChange.bind(this);
        this.handleInvNoChange = this.handleInvNoChange.bind(this);
        this.handlePosChange = this.handlePosChange.bind(this);
        this.handleTaxValChange = this.handleTaxValChange.bind(this);
        this.handleGstChange = this.handleGstChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
      }
    
      handleSubmit(event) {
        let entry = this.entryHelper.toEntryfromMinimal(this.sheet_id, this.state.sr_no, this.state.gst_no, this.state.inv_no, this.state.pos, this.state.tax_val, this.state.inv_date);
        this.backend.addNewEntry(entry);
        this.props.history.goBack();
        event.preventDefault();
      }
    
      handleGstChange(event) {
        this.setState({gst_no: event.target.value});
      }
    
      handleSerialChange(event) {
        this.setState({sr_no: event.target.value});
      }

      handlePosChange(event) {
        this.setState({pos: event.target.value});
      }

      handleTaxValChange(event) {
        this.setState({tax_val: event.target.value});
      }

      handleInvNoChange(event) {
        this.setState({inv_no: event.target.value});
      }

      handleDateChange(date) {
          console.log(date);
          this.setState({inv_date: moment(date)});
      }

      render() {
        let styleHeading = {
          "margin-left": "4%"
        }
        return (
          <div className="AddSheet">
            <h1 style={styleHeading}> Add new Entry </h1>
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <DateInput value={this.state.inv_date.toDate()} onChange={this.handleDateChange} usage="Date" />
              <Input value={this.state.sr_no} onChange={this.handleSerialChange} usage="Serial Number" />              
              <Input value={this.state.gst_no} onChange={this.handleGstChange} usage="GST Number" />
              <Input value={this.state.inv_no} onChange={this.handleInvNoChange} usage="Invoice Number" />              
              <Input value={this.state.pos} onChange={this.handlePosChange} usage="POS"/>
              <Input type="number" value={this.state.tax_val} onChange={this.handleTaxValChange} usage="Taxable Value" />
              <SubmitButton />
            </form>
            <br/>
          </div>
        )
      }
}
