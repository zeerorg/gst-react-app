import React, { Component } from 'react';

import AsyncLoad from '../../global/components/AsyncLoad';
import EditSheetForm from './EditSheetForm';

// eslint-disable-next-line
import { withRouter } from 'react-router';
import { sheetsBackend } from '../sheet_backend';

/**
 * Create a form which populates the input with previous data.
 * Let user edit that data
 * When submit is clicked, upload the details.
 * Props required:
 * 1. `match.params.id` : string, the sheet id
 */
export default class EditSheet extends Component {
  constructor(props) {
    super(props);
    this.sheet_id = props.match.params.id;
    this.state = { "title": "", "details": "", "fetched": false };
  }

  inputChangeHandler = field => event => this.setState({ ...this.state, [field]: event.target.value}, () => console.log(this.state))

  handleSubmit = event => {
    sheetsBackend.editSheet(this.sheet_id, this.state.title, this.state.details)
                 .then(() => this.props.history.goBack());
    event.preventDefault();
  }

  componentDidMount() {
    if (!this.state.fetched) {
      sheetsBackend.getSheetDetail(this.sheet_id)
                 .then(sheet => this.setState({ ...this.state, "fetched": true, "title": sheet.title, "details": sheet.details}))
    }
  }

  render() {
    let { fetched, title, details } = this.state;

    if (!fetched) { return <h1> Loading </h1> }

    return (
      <EditSheetForm 
        handleSubmit={this.handleSubmit}
        handleTitleChange={this.inputChangeHandler("title")}
        handleDetailChange={this.inputChangeHandler("details")}
        title={title}
        details={details}
      />
    )
  }
}