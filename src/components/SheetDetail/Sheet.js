import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { sheetsBackend } from '../../backend/sheetbackend';
import EntryListItem from './EntryListItem';

export default class SheetComponent extends Component {

  constructor(props) {
    super();
    this.id = props.match.params.id;
    this.sheetsData = sheetsBackend;
  }
  
  blankComponent() {
    return (
      <div className="Sheet">
      </div>
    )
  }

  populatedComponent(sheet) {
    return (
      <div className="Sheet">
        <h1>{sheet.title}</h1>
        <Link to="/entry/new" className="btn btn-info btn-lg">
          <span className="glyphicon glyphicon-plus"></span>
        </Link>
        <a href="#" className="btn btn-danger btn-lg">
          <span className="glyphicon glyphicon-remove-circle"></span>
        </a>
        <a href="#" className="btn btn-warning btn-lg">
          <span className="glyphicon glyphicon-edit"></span>
        </a>
        <p>{sheet.details}</p>
        <ul className="list-group">
        { 
          sheet.entries.map(entry_id => (
            <EntryListItem entry_id={entry_id} key={entry_id} />
          ))
        }
        </ul>
      </div>
    )
  }

  componentWillMount() {
    this.setState({status: "fetching"});
    sheetsBackend.getSheetDetail(this.id).then((sheet) => {
      this.setState({sheet: sheet, status: "completed"});
    })
  }

  render() {
    if(this.state.status === "fetching") {
      return this.blankComponent();
    }
    return this.populatedComponent(this.state.sheet);
  }
}