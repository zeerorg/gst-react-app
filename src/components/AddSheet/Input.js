import React, { Component } from 'react';

export default class InputComponent extends Component {
    
    render() {
        return (
            <div className="TitleInput from-group">
                <label htmlFor="inputTitle3" className="col-sm-2 control-label">{this.props.usage}</label>
                <div className="col-sm-10">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="inputTitle3" 
                        placeholder={this.props.usage} 
                        value={this.props.value} 
                        onChange={this.props.onChange}
                    />
                </div>
            </div>
        )
    }
}