import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SheetListItem from './SheetListItem';
import { sheetsBackend } from '../../backend/sheetbackend';

export default class SheetList extends Component {

  constructor() {
    super();
    this.sheetsData = sheetsBackend;
  }

  loadingPage() {
    return (
      <div className="SheetList">
        <div className="loader"></div>
      </div>
    )
  }

  sheetList(/* List <Sheet> */sheets) {
    return (
      <div className="SheetList">
        <h1>
          Sheets &nbsp;&nbsp;&nbsp;
          <Link to="/sheet/new" className="btn btn-info btn-lg">
            
              <span className="glyphicon glyphicon-plus"></span>
          </Link>
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