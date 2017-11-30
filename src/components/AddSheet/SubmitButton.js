import React, { Component } from 'react';

export default class SubmitButton extends Component {
    
    render() {
        return (
            <div className="SubmitButton from-group">
            <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default">Submit</button>
            </div>
            </div>
        )
    }
}