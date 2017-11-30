import React, { Component } from 'react';

export default class DetailInput extends Component {
    
    render() {
        return (
            <div className="DetailInput from-group">
            <label htmlFor="inputDetail3" className="col-sm-2 control-label">Details</label>
            <div className="col-sm-10">
                <input 
                    type="text" 
                    className="form-control" 
                    id="inputDetail3" 
                    placeholder="Details" 
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </div>
            </div>
        )
    }
}