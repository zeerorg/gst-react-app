import React from "react";

import Button from '../../global/components/Button';
import LinkButton from '../../global/components/LinkButton';
import ListItem from '../../Entry/components/ListItemStateless';

/**
 * Stateless component that takes props and displays the sheet page
 * props:
 * `sheet`
 * `entries`
 * `total`
 * `downloadHandler`
 * `deleteHandler`
 */
const SheetComponentPage = (props) => {
  let { sheet, entries, total } = props;
  let { downloadHandler, deleteHandler } = props;
  
  let newEntryLink = `/sheet/${sheet.id}/entry/new`;
  let editSheetLink = `/sheet/${sheet.id}/edit`;

  let style = {
    "margin-left": "4%"
  }

  let actionStyle = {
    "margin-bottom": "4%",
    "margin-left": "-2%"
  }
  return (
    <div className="Sheet" style={style}>
      <h1>{sheet.title}</h1>
      <p>{sheet.details}</p>
      <div class="sheet-actions" style={actionStyle}>
        <LinkButton btnColor="btn-info" icon="glyphicon-plus" link={newEntryLink} />
        <Button btnColor="btn-danger" icon="glyphicon-remove" onClick={deleteHandler}/>
        <LinkButton btnColor="btn-warning" icon="glyphicon-edit" link={editSheetLink} />
        <Button btnColor="btn-success" icon="glyphicon-download" onClick={downloadHandler} />
      </div>
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

export default SheetComponentPage;