import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Button extends Component {

    render() {
        let btnClasses = "btn btn-md " + this.props.btnColor;
        let icon = "glyphicon " + this.props.icon;
        let style = {
            "marginLeft": "2%",
            "marginRight": "2%",
        }
        return (
            <span style={style}>
                <Link to={this.props.link} className={btnClasses}>
                    <span className={icon}></span>
                </Link>
            </span>
        )
    }
}