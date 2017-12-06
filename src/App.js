import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SheetList from './Sheet/components/SheetList';
import SheetComponent from './Sheet/components/SheetComponent';
import AddSheet from './Sheet/components/AddSheet';
import AddEntry from './Entry/components/AddEntry';
import EntryDetail from './Entry/components/EntryDetail';

class App extends Component {

  render() {
    return (
      <BrowserRouter className="App">
        <Switch>
          <Route exact path='/' component={SheetList}/>
          <Route exact path='/sheet/new' component={AddSheet}/>
          <Route path='/sheet/:sheetId/entry/new' component={AddEntry} />
          <Route path='/sheet/:sheetId/entry/:entryId' component={EntryDetail} />
          <Route path='/sheet/:id' component={SheetComponent}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
