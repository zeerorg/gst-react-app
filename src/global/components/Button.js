import React, { Component } from 'react';

export default class Button extends Component {
    
    render() {
        let classes = "btn btn-md " + this.props.btnColor;
        let icon = "glyphicon " + this.props.icon;
        let style = {
            "margin-left": "2%",
            "margin-right": "2%"
        }
        return (
            <span style={style}>
                <button type="button" className={classes} onClick={this.props.onClick}>
                    <span className={icon}></span>
                </button>
            </span>
        )
    }
}