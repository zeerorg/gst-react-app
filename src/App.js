import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SheetList from './components/SheetList';
import Sheet from './components/Sheet';
import AddSheet from './components/AddSheet/AddSheet';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
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
