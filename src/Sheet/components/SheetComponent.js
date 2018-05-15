import React, { Component } from 'react';
import FileSaver from 'file-saver';
// eslint-disable-next-line
import { withRouter } from 'react-router';

import AsyncLoad from '../../global/components/AsyncLoad';
import Loader from '../../global/components/Loader/main';
import SheetComponentPage from './SheetComponentPage';

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

    this.state = { status: "fetching", sheet: null, total: null,  }
  }

  async deleteSheet() {
    await this.sheetsData.deleteSheet(this.id, this.state.sheet.entries);
    this.props.history.goBack();
  }

  async downloadSheet(entries, title, total) {
    let data = "sno,type,gst no,invoice no,invoice date,invoice type,pos,invoice value,taxable value,rate,igst,cgst,sgst";
    for (let curr of entries.sort((a, b) => a.inv_date > b.inv_date)) {
      data = `${data}\n${curr.sr_no},${curr.type},${curr.gst_no},${curr.inv_no},${curr.getDate()},${curr.inv_type},${curr.pos},${curr.inv_val},${curr.taxable_val},${curr.rate},${curr.igst},${curr.cgst},${curr.sgst}`
    }
    data = `${data}\ntotal,invoice value,taxable value,igst,cgst,sgst\ntotal,${total.inv_val},${total.taxable_val},${total.igst},${total.cgst},${total.sgst}`;
    FileSaver.saveAs(new Blob([data], {type: "text/csv;charset=utf-8"}), `${title}.csv`);
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
    return entries.sort((a, b) => a.inv_date > b.inv_date)
  }

  render() {
    return (
      <AsyncLoad promise={sheetsBackend.getSheetDetail(this.id)} LoadComponent={Loader}>
        {(sheet, error) =>
          <AsyncLoad promise={Promise.all(sheet.entries.map(entryBackend.getEntry))} LoadComponent={Loader}>
            {(entries, error) => {
              let total = this.getTotal(entries);
              let sortedEntries = this.sortEntries(entries);
              return <SheetComponentPage
                sheet={sheet}
                entries={sortedEntries}
                total={total}
                downloadHandler={() => this.downloadSheet(entries, sheet.title, total)}
                deleteHandler={() => {}}
              />              
            }}
          </AsyncLoad>
        }
      </AsyncLoad>
    )
  }
}
