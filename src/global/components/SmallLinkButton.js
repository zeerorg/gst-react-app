import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SmallLinkButton extends Component {

    render() {
        let btnClasses = "btn btn-sm " + this.props.btnColor;
        let icon = "glyphicon " + this.props.icon;
        return (
            <span>
            &nbsp;
            <Link to={this.props.link} className={btnClasses}>
                <span className={icon}></span>
            </Link>
            &nbsp;
            </span>
        )
    }
}