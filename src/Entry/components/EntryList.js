import { default as React, Component, Fragment } from 'react';
import { entryBackend } from '../entry_backend';

import Loader from '../../global/components/Loader/main';
import ListItem from './ListItemStateless';

export default class EntryList extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      status: 'fetching'
    };
  }

  componentDidMount() {
    this.setState({status: 'fetching'});
    
    let allEntriesPromise = Promise.all(this.props.entries.map(entryBackend.getEntry));
    allEntriesPromise.then(entries => {
      entries.sort((a, b) => Number(a.sr_no) - Number(b.sr_no));
      this.setState({entries: entries, status: 'completed'});
    })
  }

  render() {
    if(this.state.status === 'fetching') {
      return (
        <Loader/>
      )
    }
    else {
      return (
        <Fragment>
          { 
            this.state.entries.map(entry => (
              <ListItem entry={entry} deleteRedir={"/"} />
            ))
          }
        </Fragment>
      )
    }
  }
}