import React, { Component } from 'react';
import { sheetsBackend } from '../sheet_backend';
// eslint-disable-next-line
import { withRouter } from 'react-router';
import Input from '../../global/components/Input';
import SubmitButton from '../../global/components/SubmitButton';

/** Add sheet */
export default class AddSheet extends Component {
  constructor(props) {
    super(props);
    this.sheetsData = sheetsBackend;
    this.uid = props.uid;

    /** State has value 'Title', 'Details';  There is a function that will handle on submit events */
    this.state = {
      title: '',
      detail: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDetailChange = this.handleDetailChange.bind(this);
  }

  handleSubmit(event) {
    this.sheetsData.addNewSheet(this.state.title, this.state.detail, this.uid).then(val => {
      this.props.history.goBack();
    });
    event.preventDefault();
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleDetailChange(event) {
    this.setState({detail: event.target.value});
  }

  render() {
    let styleHeading = { "margin-left" : "5%" };
    return (
      <div className="AddSheet">
        <h1 style={styleHeading}> Add new Sheet </h1>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <Input value={this.state.title} onChange={this.handleTitleChange} usage="Title" />
          <Input value={this.state.detail} onChange={this.handleDetailChange} usage="Details"/>
          <SubmitButton />
        </form>
      </div>
    )
  }
}