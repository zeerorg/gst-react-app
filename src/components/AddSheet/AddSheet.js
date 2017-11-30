import React, { Component } from 'react';
import { sheetsBackend } from '../../backend/sheetbackend';
import TitleInput from './TitleInput';
import DetailInput from './DetailInput';
import SubmitButton from './SubmitButton';

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
    console.log(this.state);
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
          <TitleInput value={this.state.title} onChange={this.handleTitleChange} />
          <br />
          <DetailInput value={this.state.detail} onChange={this.handleDetailChange}/>
          <br />
          <SubmitButton />
        </form>
      </div>
    )
  }
}