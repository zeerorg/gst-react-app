import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SheetList from './Sheet/components/SheetList';
import SheetComponent from './Sheet/components/SheetComponent';
import AddSheet from './Sheet/components/AddSheet';
import AddEntry from './Entry/components/AddEntry';
import EntryDetail from './Entry/components/EntryDetail';
import Loader from './global/components/Loader/main';
import EditSheet from './Sheet/components/EditSheet';

import AuthBackend from './Auth/auth_backend';

class App extends Component {

  constructor() {
    super();

    this.auth = new AuthBackend();
    this.state = { "status": false, "uid": "" }
  }

  loadingComponent() {
    return (
      <div className="App">
        <Loader />
      </div>
    )
  }

  populateComponent() {
    return (
      <BrowserRouter className="App">
        <Switch>
          <Route exact path='/' render={(routeProps) => {return <SheetList {...routeProps} {...{uid: this.state.uid}} />}}/>
          <Route exact path='/sheet/new' render={(routeProps) => {return <AddSheet {...routeProps} {...{uid: this.state.uid}} />}}/>
          <Route path='/sheet/:sheetId/entry/new' component={AddEntry} />
          <Route path='/entry/:entryId' component={EntryDetail} />
          <Route path='/sheet/:id/edit' component={EditSheet} />
          <Route path='/sheet/:id' component={SheetComponent}/>
        </Switch>
      </BrowserRouter>
    )
  }

  componentDidMount() {
    this.auth.statusCall(user => {
      if (!user) {
        this.auth.googleSignIn();
      } else {
        this.setState({ "status": true, "uid": user.uid })
      }
    })
  }

  render() {
    if(!this.state.status)
      return this.loadingComponent();
    return this.populateComponent();
  }
}

export default App;
