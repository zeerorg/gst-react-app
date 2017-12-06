import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Button extends Component {

    render() {
        let btnClasses = "btn btn-lg " + this.props.btnColor;
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