import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SheetList from './components/SheetList/SheetList';
import Sheet from './components/SheetDetail/Sheet';
import AddSheet from './components/AddSheet/AddSheet';
import AddEntry from './components/AddEntry/AddEntry';
import EntryDetail from './components/EntryDetail/EntryDetail';

class App extends Component {

  render() {
    return (
      <BrowserRouter className="App">
        <Switch>
          <Route exact path='/' component={SheetList}/>
          <Route exact path='/sheet/new' component={AddSheet}/>
          <Route path='/sheet/:sheetId/entry/new' component={AddEntry} />
          <Route path='/sheet/:sheetId/entry/:entryId' component={EntryDetail} />
          <Route path='/sheet/:id' component={Sheet}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
