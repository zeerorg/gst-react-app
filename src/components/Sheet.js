import React, { Component } from 'react';
import { sheetsBackend } from '../backend/sheetbackend';

export default class SheetList extends Component {

  constructor(props) {
    super();
    this.id = this.props.match.params.id;
    this.sheetsData = sheetsBackend;
  }

  componentWillMount() {
    const data = {data: "fetching"};
    this.setState(data);
    this.sheetsData.getAllSheets().then(sheets => {
      this.setState({data: sheets});
    });
  }

  render() {
    return (
        <div className="Sheet">
        
        </div>
    )
  }
}