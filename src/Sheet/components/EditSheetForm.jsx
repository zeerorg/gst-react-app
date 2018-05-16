import * as React from "react";

import Input from '../../global/components/Input';
import SubmitButton from '../../global/components/SubmitButton';

const EditSheetForm = (props) => {
  let { handleSubmit, handleDetailChange, handleTitleChange } = props;
  let { title, details } = props;
  let styleHeading = { "margin-left": "4%" };
  
  return (
    <div className="EditSheet">
      <h1 style={styleHeading}> Edit : {title} </h1>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <Input value={title} onChange={handleTitleChange} usage="Title" />
        <Input value={details} onChange={handleDetailChange} usage="Details"/>
        <SubmitButton />
      </form>
    </div>
  )
}

export default EditSheetForm;