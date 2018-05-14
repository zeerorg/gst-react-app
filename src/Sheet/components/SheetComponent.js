import React, { Component } from 'react';
import FileSaver from 'file-saver';
// eslint-disable-next-line
import { withRouter } from 'react-router';

import Button from '../../global/components/Button';
import LinkButton from '../../global/components/LinkButton';
import Loader from '../../global/components/Loader/main';
import ListItem from '../../Entry/components/ListItemStateless';

import { sheetsBackend } from '../sheet_backend';
import { entryBackend } from '../../Entry/entry_backend';

/**
 * Takes a sheet id from the url and fetches the sheet from firebase.
 * This then renders "ListItem" from data which was fetched
 * TODO: divide this component into smaller components
 */
export default class SheetComponent extends Component {

  constructor(props) {
    super();
    this.id = props.match.params.id;
    this.sheetsData = sheetsBackend;
    this.deleteSheet = this.deleteSheet.bind(this);

    this.state = {
      status: "fetching"
    }
  }

  async deleteSheet() {
    await this.sheetsData.deleteSheet(this.id, this.state.sheet.entries);
    this.props.history.goBack();
  }

  async downloadSheet(entries, title, total) {
    console.log(entries);
    let allEntries = await Promise.all(entries.map(entryBackend.getEntry));
    allEntries.sort((a, b) => Number(a.sr_no) - Number(b.sr_no));
    let data = allEntries.reduce((acc, curr) => {
      return `${acc}\n${curr.sr_no},${curr.type},${curr.gst_no},${curr.inv_no},${curr.getDate()},${curr.inv_type},${curr.pos},${curr.inv_val},${curr.taxable_val},${curr.rate},${curr.igst},${curr.cgst},${curr.sgst}`
    }, "sno,type,gst no,invoice no,invoice date,invoice type,pos,invoice value,taxable value,rate,igst,cgst,sgst");
    data = `${data}\ntotal,invoice value,taxable value,igst,cgst,sgst\ntotal,${total.inv_val},${total.taxable_val},${total.igst},${total.cgst},${total.sgst}`;
    FileSaver.saveAs(new Blob([data], {type: "text/csv;charset=utf-8"}), `${title}.csv`);
  }
  
  blankComponent() {
    return (
      <div className="Sheet">
        <Loader />
      </div>
    )
  }

  populatedComponent(sheet, entries, total) {
    let link = "/sheet/" + sheet.id + "/entry/new";
    return (
      <div className="Sheet">
        <h1>
          {sheet.title}
          <LinkButton btnColor="btn-info" icon="glyphicon-plus" link={link} />
          <Button btnColor="btn-danger" icon="glyphicon-remove" onClick={this.deleteSheet}/>
          <LinkButton btnColor="btn-warning" icon="glyphicon-edit" link={`/sheet/${sheet.id}/edit`} />
          {/* <Button btnColor="btn-warning" icon="glyphicon-edit" /> */}
          <Button btnColor="btn-success" icon="glyphicon-download" onClick={() => { this.downloadSheet(sheet.entries, sheet.title, total) }} />
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
          {/*<EntryList entries={entries} /> */}
          {
            entries.map(entry => <ListItem entry={entry} editRedirect={`/entry/${entry.id}`} key={entry.id} />)
          }
          </tbody>
        </table>
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Total</th>
                <th>Invoice value</th>
                <th>Taxable Value</th>
                <th>SGST</th>
                <th>CGST</th>
                <th>IGST</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>{total.inv_val}</td>
                <td>{total.taxable_val}</td>
                <td>{total.sgst}</td>
                <td>{total.cgst}</td>
                <td>{total.igst}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  componentDidMount() {
    let sheet;
    this.setState({status: "fetching"});
    sheetsBackend.getSheetDetail(this.id).then((sh) => {
      sheet = sh;
      return Promise.all(sheet.entries.map(entryBackend.getEntry))
    }).then(entries => {
      this.setState({
        sheet: sheet,
        entries: entries.sort((a, b) => a.inv_date>b.inv_date ? 1 : a.inv_date<b.inv_date ? -1 : 0),
        total: entries.reduce((acc, curr) => {
          acc.inv_val += curr.inv_val;
          acc.taxable_val += curr.taxable_val;
          acc.igst += curr.igst;
          acc.cgst += curr.cgst;
          acc.sgst += curr.sgst;
          return acc
        }, {
          inv_val: 0,
          taxable_val: 0,
          igst: 0,
          cgst: 0,
          sgst: 0
        }),
        status: "completed"
      });
    });
  }

  render() {
    if(this.state.status === "fetching") {
      return this.blankComponent();
    }
    return this.populatedComponent(this.state.sheet, this.state.entries, this.state.total);
  }
}
