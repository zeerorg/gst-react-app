import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SheetList from './Sheet/components/SheetList';
import SheetComponent from './Sheet/components/SheetComponent';
import AddSheet from './Sheet/components/AddSheet';
import AddEntry from './Entry/components/AddEntry';
import EntryDetail from './Entry/components/EntryDetail';
import Loader from './global/components/Loader/main';
import EditSheet from './Sheet/components/EditSheet';

import Authentication from './Auth/auth_middle';
import { ANONYMOUS, LOGGED } from './Auth/AuthStore';

class App extends Component {

  constructor() {
    super();

    this.auth = new Authentication();
    this.state = this.auth.getState();
    this.stateUpdater = this.stateUpdater.bind(this);
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
          <Route exact path='/' render={(routeProps) => {return <SheetList {...routeProps} {...{auth: this.auth}} />}}/>
          <Route exact path='/sheet/new' render={(routeProps) => {return <AddSheet {...routeProps} {...{auth: this.auth}} />}}/>
          <Route path='/sheet/:sheetId/entry/new' component={AddEntry} />
          <Route path='/entry/:entryId' component={EntryDetail} />
          <Route path='/sheet/:id/edit' component={EditSheet} />
          <Route path='/sheet/:id' component={SheetComponent}/>
        </Switch>
      </BrowserRouter>
    )
  }

  stateUpdater() {
    if(this.auth.getStatus() === ANONYMOUS) {
      this.setState({
        loginStatus: ANONYMOUS
      });
    } else if (this.auth.getStatus() === LOGGED) {
      this.setState(this.auth.getState())
    }
  }

  componentDidMount() {
    this.unsubscribe = this.auth.subscribe(this.stateUpdater);
    if(this.auth.getStatus() === ANONYMOUS)
      this.auth.googleSignIn();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if(this.state.status !== LOGGED)
      return this.loadingComponent();
    return this.populateComponent();
  }
}

export default App;
