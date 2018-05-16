import React from 'react';

const SubmitButton = (props) => {
    let style = {
        "margin-top": "7%",
        "margin-bottom": "7%"
    }
    return (
        <div className="SubmitButton from-group" style={style}>
            <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default btn-primary btn-block">Submit</button>
            </div>
        </div>
    )
}

export default SubmitButton;