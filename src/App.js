import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SheetList from './components/SheetList/SheetList';
import Sheet from './components/SheetDetail/Sheet';
import AddSheet from './components/AddSheet/AddSheet';
//import Entry from './components/Entry/Entry';
//import AddEntry from './components/AddEntry/AddEntry';

class App extends Component {

  render() {
    return (
      <BrowserRouter className="App">
        <Switch>
          <Route exact path='/' component={SheetList}/>
          <Route exact path='/sheet/new' component={AddSheet}/>
          <Route path='/sheet/:id' component={Sheet}/>
          
          
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
