import React, { Component } from 'react';

export default class Input extends Component {
    
    render() {
        let htmlFor = "input" + this.props.usage + "3";
        return (
            <div className="TitleInput from-group">
                <label htmlFor={htmlFor} className="col-sm-2 control-label">{this.props.usage}</label>
                <div className="col-sm-10">
                    <input 
                        type="text" 
                        className="form-control" 
                        id={htmlFor}
                        placeholder={this.props.usage} 
                        value={this.props.value} 
                        onChange={this.props.onChange}
                    />
                </div>
            </div>
        )
    }
}