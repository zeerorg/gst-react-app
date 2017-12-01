import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { entryBackend } from '../../backend/entrybackend';

export default class EntryListItem extends Component {
  constructor(props) {
    super();
    this.entry_id = props.entry_id;
    this.sheet_id = props.sheet_id;
  }

  populateEmptyListItem(sheet_id, entry_id) {
    let link = "/sheet/" + sheet_id + "/entry/" + entry_id;
    return (
      <Link to={link} className="list-group-item">
        {entry_id}
      </Link>
    )
  }

  populateListItem(entry) {
    let link = "/sheet/" + entry.sheet_id + "/entry/" + entry.id;
    return (
      <Link to={link} className="list-group-item">
        {entry.gst_no} : &nbsp; {entry.inv_date.toString()}
      </Link>
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