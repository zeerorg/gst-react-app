import React, { Component } from 'react';

export default class Button extends Component {
    
    render() {
        let classes = "btn btn-md " + this.props.btnColor;
        let icon = "glyphicon " + this.props.icon;
        let style = {
            "marginLeft": "2%",
            "marginRight": "2%"
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