import React from 'react';
import { Link } from 'react-router-dom';
/**
 * Takes an entry and creates a table row from it.
 * editRedirect :- string, a link to redirect to when edit button is clicked.
 */
const ListItem = (props) => {
  let { entry, editRedirect } = props;
  return (
    <tr class="ListItemStateless">
      <td>{entry.sr_no}</td>
      <td>{entry.type}</td>
      <td>{entry.gst_no}</td>
      <td>{entry.inv_no}</td>
      <td>{entry.getDate()}</td>
      <td>{entry.inv_type}</td>
      <td>{entry.pos}</td>
      <td>{entry.inv_val}</td>
      <td>{entry.taxable_val}</td>
      <td>{entry.rate}</td>
      <td>{entry.igst}</td>
      <td>{entry.cgst}</td>
      <td>{entry.sgst}</td>
      <td><Link to={editRedirect}>Edit</Link></td>
    </tr>
  )
}

export default ListItem;
