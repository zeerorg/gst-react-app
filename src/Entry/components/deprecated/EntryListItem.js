import React, { Component } from 'react';

import Loader from '../../global/components/Loader/main';
import ListItem from './ListItemStateless';

/**
 * Fetches an entry from entry_id and displays it.
 * needs entry_id
 * backend is default prop
 */
class EntryListItem extends Component {

  constructor(props) {
    super();

    /** @type {string} */
    this.entry_id = props.entry_id;

    this.backend = props.backend;

    // initial state
    this.state = { 
      'status': 'fetching'  
    }
  }

  /**
   * Display loading element while entry are being fetched.
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
      <ListItem entry={entry} editRedirect={deleteRedir} />
    )
  }

  componentDidMount() {
    if (this.state['status'] === 'fetched') return;
    this.backend.getEntry(this.entry_id).then((entry) => {
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
      return this.populateEmptyListItem(this.entry_id);
    return this.populateListItem(this.state.entry);
  }
}

import { entryBackend } from '../entry_backend';
EntryListItem.defaultProps = {
  backend: entryBackend
}

export default EntryListItem;
