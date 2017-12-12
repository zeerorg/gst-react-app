import React, { Component } from 'react';
import { sheetsBackend } from '../sheet_backend';
import SheetListItem from './SheetListItem';
import LinkButton from '../../global/components/LinkButton';
import Loader from '../../global/components/Loader/main';

export default class SheetList extends Component {

  constructor() {
    super();
    this.sheetsData = sheetsBackend;
  }

  loadingPage() {
    return (
      <div className="SheetList">
        <Loader />
      </div>
    )
  }

  /**
   * 
   * @param {Array<Sheet>} sheets 
   */
  sheetList(sheets) {
    return (
      <div className="SheetList">
        <h1>
          Sheets &nbsp;&nbsp;&nbsp;
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
    )
  }

  componentWillMount() {
    const data = {data: "fetching"};
    this.setState(data);
    this.sheetsData.getAllSheets().then(sheets => {
      this.setState({data: sheets});
    });
  }

  render() {
    if(this.state.data === "fetching") {
      return this.loadingPage();
    }
    return this.sheetList(this.state.data);
  }
}