import React from 'react';

const SubmitButton = (props) => {
    let style = {
        "marginTop": "1vh",
        "marginBottom": "1vh"
    }
    return (
        <div className="SubmitButton from-group row" style={style}>
            <div className="col-sm-offset-4 col-sm-5">
                <button type="submit" className="btn btn-default btn-primary btn-block">Submit</button>
            </div>
        </div>
    )
}

export default SubmitButton;