import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { entryBackend } from '../../backend/entrybackend';

export default class EntryListItem extends Component {
  constructor(props) {
    super();
    this.entry_id = props.entry_id;
    this.sheet_id = props.sheet_id;
  }

  populateEmptyListItem(sheet_id, entry_id) {
    //let link = "/sheet/" + sheet_id + "/entry/" + entry_id;
    return (
      // <Link to={link} className="list-group-item">
      //   {entry_id}
      // </Link>
      <tr>
        <td>fetching.....</td>
      </tr>
    )
  }

  populateListItem(entry) {
    //let link = "/sheet/" + entry.sheet_id + "/entry/" + entry.id;
    return (
      // <Link to={link} className="list-group-item">
      //   {entry.gst_no} : &nbsp; {entry.inv_date.toString()}
      // </Link>
      <tr>
        <td>{entry.sr_no}</td>
        <td>{entry.type}</td>
        <td>{entry.gst_no}</td>
        <td>{entry.inv_no}</td>
        <td>{entry.inv_date.toString()}</td>
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