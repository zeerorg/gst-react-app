import React, { Component } from 'react';

export default class SmallButton extends Component {
    
    render() {
        let classes = "btn btn-sm " + this.props.btnColor;
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