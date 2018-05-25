import React from 'react';

const Form = (props) => {
  let formStyle = { marginLeft: "3vw", marginRight: "3vw" }
  return (
    <div className="row">
      <form className="form-horizontal" onSubmit={props.onSubmit} style={formStyle}>
        {props.children}
      </form>
    </div>
  )
}

export default Form;