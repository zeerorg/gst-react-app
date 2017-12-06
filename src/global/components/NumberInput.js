import React, { Component } from 'react';

export default class NumberInput extends Component {
    
    render() {
        let htmlFor = "input" + this.props.usage + "3";
        return (
            <div className="NumberInput from-group">
                <label htmlFor={htmlFor} className="col-sm-2 control-label">{this.props.usage}</label>
                <div className="col-sm-10">
                    <input 
                        type="number" 
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