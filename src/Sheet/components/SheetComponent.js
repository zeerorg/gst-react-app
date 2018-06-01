import React, { Component } from 'react';
// eslint-disable-next-line
import { withRouter } from 'react-router';

import AsyncLoad from '../../global/components/AsyncLoad';
import Loader from '../../global/components/Loader/main';
import SheetComponentPage from './SheetComponentPage';

import { sheetsBackend } from '../sheet_backend';
import { entryBackend } from '../../Entry/entry_backend';

import * as xlsx from 'xlsx';

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

    this.startState = { status: "fetching", sheet: null, total: null, delete: {flag: false, inprocess: false} };
    this.state = this.startState
  }

  deleteSheet(sheet_id, entries) {
    this.sheetsData.deleteSheet(sheet_id, entries).then(() => this.props.history.goBack());
    this.setState({ ...this.state, delete : { inprocess: true }})
  }

  async downloadXLSX(entries, title, total) {
    let data = "sno,type,gst no,invoice no,invoice date,invoice type,pos,invoice value,taxable value,rate,igst,cgst,sgst";
    data = [data.split(",")];
    for (let entry of entries) {
      const entryKeys = ["sr_no", "type", "gst_no", "inv_no", "inv_date", "inv_type", "inv_val", "pos", "taxable_val", "rate", "igst", "cgst", "sgst"];
      data.push(Array.from(entryKeys.map(key => entry[key])));
    }
    data.push([])
    data.push(["Invoice Value", "Taxable Value", "IGST", "CGST", "SGST"])
    data.push(["inv_val", "taxable_val", "igst", "cgst", "sgst"].map(key => total[key]))

    let ws_name = title;
    let wb = xlsx.utils.book_new();
    let ws = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, ws_name);
    xlsx.writeFile(wb, `${title}.xlsx`);
  }
  

  getTotal(entries) {
    let total = {"inv_val": 0, "taxable_val": 0, "igst": 0, "cgst": 0, "sgst": 0};
    for (let entry of entries) {
      for (let key in total) {
        total[key] = total[key] + Number(entry[key]);
      }
    }
    return total;
  }

  sortEntries(entries) {
    return entries.sort((a, b) => Number(a.sr_no) > Number(b.sr_no))
  }

  render() {
    if (this.state.delete.inprocess) {
      return <Loader />
    }

    if (this.state.delete.flag) { 
      return (
        <React.Fragment>
          <button onClick={() => this.deleteSheet(this.state.delete.id, this.state.delete.entries)}>Yes</button>
          <button onClick={() => this.setState(this.startState)}>No</button>
        </React.Fragment>
      )
     }
    return (
      <AsyncLoad promise={sheetsBackend.getSheetDetail(this.id)} LoadComponent={Loader}>
        {(sheet, error) =>
          <AsyncLoad promise={Promise.all(sheet.entries.map(entryBackend.getEntry))} LoadComponent={Loader}>
            {(entries, error) => {
              let total = this.getTotal(entries);
              let sortedEntries = this.sortEntries(entries);
              // console.log(entries);
              return <SheetComponentPage
                sheet={sheet}
                entries={sortedEntries}
                total={total}
                downloadHandler={() => this.downloadXLSX(entries, sheet.title, total)}
                deleteHandler={() => this.setState({ ...this.state, delete: { flag: true, id: sheet.id, entries } })}
              />              
            }}
          </AsyncLoad>
        }
      </AsyncLoad>
    )
  }
}
