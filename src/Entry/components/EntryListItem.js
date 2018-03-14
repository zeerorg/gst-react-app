import React, { Component } from 'react';
// eslint-disable-next-line
import Entry from '../entry_model';
import { entryBackend } from '../entry_backend';

import Loader from '../../global/components/Loader/main';
import ListItem from './ListItemStateless';

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
        <td> <Loader /> </td>
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
      <ListItem entry={entry} deleteRedir={deleteRedir} />
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