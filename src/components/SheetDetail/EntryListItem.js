import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { entryBackend } from '../../backend/entrybackend';

export default class EntryListItem extends Component {
  constructor(props) {
    super();
    this.entry_id = props.entry_id;
  }

  populateEmptyListItem(entry_id) {
    let link = "/entry/" + entry_id;
    return (
      <Link to={link} className="list-group-item">
        {entry_id}
      </Link>
    )
  }

  populateListItem(entry) {
    let link = "/entry/" + entry.id;
    return (
      <Link to={link} className="list-group-item">
        {entry.gst_no} : &nbsp; {entry.inv_date.toString()}
      </Link>
    )
  }

  componentWillMount() {
    this.setState({status: "fetching"});
    entryBackend.getEntry(this.entry_id).then((entry) => {
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
      return this.populateEmptyListItem(this.entryid);
    return this.populateListItem(this.state.entry);
  }
}