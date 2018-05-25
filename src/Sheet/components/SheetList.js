import React from 'react';

import AsyncLoad from '../../global/components/AsyncLoad';
import SheetListItem from './SheetListItem';
import LinkButton from '../../global/components/LinkButton';
import Loader from '../../global/components/Loader/main';

import { sheetsBackend } from '../sheet_backend';

/**
 * Returns a list of sheets which the user has created
 */

const SheetList = (props) => {
  let uid = props.uid;
  let styleHeading = { "marginLeft": "4%" };

  return (
    <AsyncLoad promise={sheetsBackend.getAllSheets(uid)} LoadComponent={Loader}>
    {(sheets, error) => 
      <div className="SheetList">
        <h1 style={styleHeading}>
          Sheets &nbsp;
          <LinkButton btnColor="btn-info" icon="glyphicon-plus" link="/sheet/new" />
        </h1>
        <br/>
        <ul className="list-group">
        { 
          sheets.map(sheet => (
            <SheetListItem sheet={sheet} key={sheet.id} />
          ))
        }
        </ul>
      </div>
    }
    </AsyncLoad>
  )
}

export default SheetList;
