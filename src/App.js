import React, { Component } from 'react';
import SheetsBackend from './backend/sheetbackend';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.sheetsData = new SheetsBackend();
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1> DATA : </h1>
        <p> {this.state.data.toString()} </p>
      </div>
    );
  }
}

export default App;
