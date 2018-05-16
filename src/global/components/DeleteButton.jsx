import React from 'react';

/**
 * TODO: Add a warning dailog before delete
 * 
 * @param {*} props 
 */
const DeleteButton = (props) => {
    let style = {
        "margin-top": "7%",
        "margin-bottom": "7%"
    }
    return (
        <div className="DeleteButton" style={style}>
            <div className="col-sm-offset-2 col-sm-10">
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