import React, { Component } from 'react';

export default class Button extends Component {
    
    render() {
        let classes = "btn btn-lg " + this.props.btnColor;
        let icon = "glyphicon " + this.props.icon;
        return (
            <span>
                &nbsp;
                <button type="button" className={classes} onClick={this.props.onClick}>
                    <span className={icon}></span>
                </button>
                &nbsp;
            </span>
        )
    }
}