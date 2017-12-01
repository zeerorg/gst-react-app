import React, { Component } from 'react';
import { sheetsBackend } from '../../backend/sheetbackend';
import EntryListItem from './EntryListItem';
import Button from './Button';
import LinkButton from '../mini/LinkButton';

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
        <h1>
          {sheet.title}
          <LinkButton btnColor="btn-info" icon="glyphicon-plus" link="/entry/new" />
          <Button btnColor="btn-danger" icon="glyphicon-remove" />
          <Button btnColor="btn-warning" icon="glyphicon-edit" />
        </h1>
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