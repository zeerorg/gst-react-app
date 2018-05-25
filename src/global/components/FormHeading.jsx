import React from "react";

const FormHeading = (props) => {
  let styleHeading = { marginLeft: "5%" };
  return (
    <div className="row">
      <h1 style={styleHeading} className="col-sm-offset-4 col-sm-5">{props.children}</h1>
    </div>
  )
}

export default FormHeading;