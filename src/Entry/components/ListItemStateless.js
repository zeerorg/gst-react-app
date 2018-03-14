import React from 'react';
import SmallLinkButton from '../../global/components/SmallLinkButton';

const ListItem = ({ entry, deleteRedir }) => {
  return (
    <tr>
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
      <td><SmallLinkButton btnColor="btn-info" icon="glyphicon-pencil" link={deleteRedir}/></td>
    </tr>
  )
}

export default ListItem;