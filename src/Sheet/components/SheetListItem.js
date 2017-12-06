import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SheetListItem extends Component {
  constructor(props) {
    super();
  }

  render() {
    let link = "/sheet/" + this.props.sheet.id;
    return (
      <Link to={link} className="list-group-item">
        {this.props.sheet.title}
      </Link>
    )
  }
}