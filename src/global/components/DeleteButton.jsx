import React from 'react';

/**
 * TODO: Add a warning dailog before delete
 * 
 * @param {*} props 
 */
const DeleteButton = (props) => {
    let style = {
        "marginTop": "2vh",
        "marginBottom": "2vh"
    }
    return (
        <div className="DeleteButton row" style={style}>
            <div className="col-sm-offset-4 col-sm-5">
                <button
                    type="button"
                    className="btn btn-default btn-danger btn-block"
                    onClick={props.onClick}
                >
                Delete    
                </button>
            </div>
        </div>
    )
}

export default DeleteButton;