import React, { Component } from 'react';
// eslint-disable-next-line
import Entry from '../entry_model';
import { entryBackend } from '../entry_backend';

import SmallLinkButton from '../../global/components/SmallLinkButton';
import Loader from '../../global/components/Loader/main';

export default class EntryListItem extends Component {
  constructor(props) {
    super();

    /** @type {string} */
    this.entry_id = props.entry_id;

    /** @type {string} */
    this.sheet_id = props.sheet_id;

    this.backend = entryBackend;
  }

  /**
   * Display loading element while entries are being fetched.
   * @param {string} sheet_id 
   * @param {string} entry_id 
   */
  populateEmptyListItem(sheet_id, entry_id) {
    return (
      <tr>
        <Loader />
      </tr>
    )
  }

  /**
   * Display the table entry
   * @param {Entry} entry - The Sheet object to be displayed
   */
  populateListItem(entry) {
    let deleteRedir = "/entry/" + entry.id;
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
        <td><SmallLinkButton btnColor="btn-info" icon="glyphicon-pencil" link={deleteRedir}/></td>
      </tr>
    )
  }

  componentWillMount() {
    this.setState({status: "fetching"});
    this.backend.getEntry(this.entry_id, this.sheet_id).then((entry) => {
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