import React, { Component } from 'react';
// eslint-disable-next-line
import Entry from '../../models/entry';
import { entryBackend } from '../../backend/entrybackend';

export default class EntryListItem extends Component {
  constructor(props) {
    super();

    /** @type {string} */
    this.entry_id = props.entry_id;

    /** @type {string} */
    this.sheet_id = props.sheet_id;
  }

  /**
   * Display loading element while entries are being fetched.
   * @param {string} sheet_id 
   * @param {string} entry_id 
   */
  populateEmptyListItem(sheet_id, entry_id) {
    return (
      <tr>
        <td>fetching.....</td>
      </tr>
    )
  }

  /**
   * Display the table entry
   * @param {Entry} entry - The Sheet object to be displayed
   */
  populateListItem(entry) {
    return (
      <tr>
        <td>{entry.sr_no}</td>
        <td>{entry.type}</td>
        <td>{entry.gst_no}</td>
        <td>{entry.inv_no}</td>
        <td>{entry.getDate()}</td>
        <td>{entry.inv_type}</td>
        <td>{entry.pos}</td>
        <td>{entry.inv_val}</td>
        <td>{entry.taxable_val}</td>
        <td>{entry.rate}</td>
        <td>{entry.igst}</td>
        <td>{entry.cgst}</td>
        <td>{entry.sgst}</td>
      </tr>
    )
  }

  componentWillMount() {
    this.setState({status: "fetching"});
    entryBackend.getEntry(this.entry_id, this.sheet_id).then((entry) => {
      this.setState(
        {
          entry: entry,
          status: "fetched"
        }
      );
    })
  }

  render() {
    if(this.state.status === "fetching")
      return this.populateEmptyListItem(this.sheet_id, this.entry_id);
    return this.populateListItem(this.state.entry);
  }
}