import React, { Component } from 'react';
import { sheetsBackend } from '../../backend/sheetbackend';
// eslint-disable-next-line
import { withRouter } from 'react-router'
import Input from '../mini/Input';
import SubmitButton from '../mini/SubmitButton';

/* Add sheet */
/* State has value 'Title', 'Details';  There is a function that will handle on submit events */
export default class AddSheet extends Component {
  constructor() {
    super();
    this.sheetsData = sheetsBackend;

    this.state = {
      title: '',
      detail: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDetailChange = this.handleDetailChange.bind(this);
  }

  handleSubmit(event) {
    this.props.history.goBack();
    this.sheetsData.addNewSheet(this.state.title, this.state.detail);
    event.preventDefault();
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleDetailChange(event) {
    this.setState({detail: event.target.value});
  }

  render() {
    return (
      <div className="AddSheet">
        <h1> Add new Sheet </h1>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <br />
          <Input value={this.state.title} onChange={this.handleTitleChange} usage="Title" />
          <br />
          <Input value={this.state.detail} onChange={this.handleDetailChange} usage="Details"/>
          <br />
          <SubmitButton />
        </form>
      </div>
    )
  }
}