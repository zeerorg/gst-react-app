import React, { Component } from 'react';
// eslint-disable-next-line
import { withRouter } from 'react-router'
import { sheetsBackend } from '../sheet_backend';
import EntryListItem from '../../Entry/components/EntryListItem';
import Button from '../../global/components/Button';
import LinkButton from '../../global/components/LinkButton';
import Loader from '../../global/components/Loader/main';

export default class SheetComponent extends Component {

  constructor(props) {
    super();
    this.id = props.match.params.id;
    this.sheetsData = sheetsBackend;
    this.deleteSheet = this.deleteSheet.bind(this);
  }

  deleteSheet() {
    this.sheetsData.deleteSheet(this.id, this.state.sheet.entries);
    this.props.history.goBack();
  }
  
  blankComponent() {
    return (
      <div className="Sheet">
        <Loader />
      </div>
    )
  }

  populatedComponent(sheet) {
    let link = "/sheet/" + sheet.id + "/entry/new";
    return (
      <div className="Sheet">
        <h1>
          {sheet.title}
          <LinkButton btnColor="btn-info" icon="glyphicon-plus" link={link} />
          <Button btnColor="btn-danger" icon="glyphicon-remove" onClick={this.deleteSheet}/>
          <Button btnColor="btn-warning" icon="glyphicon-edit" />
        </h1>
        <p>{sheet.details}</p>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>SNo</th>
              <th>Type</th>
              <th>GST No</th>
              <th>Inv No</th>
              <th>Inv Date</th>
              <th>Inv Type</th>
              <th>POS</th>
              <th>Inv val</th>
              <th>Taxable val</th>
              <th>Rate</th>
              <th>IGST</th>
              <th>CGST</th>
              <th>SGST</th>
            </tr>
          </thead>
          <tbody>
          { 
            sheet.entries.map(entry_id => (
              <EntryListItem entry_id={entry_id} sheet_id={sheet.id} key={entry_id} />
            ))
          }
          </tbody>
        </table>
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