import * as React from "react";

import Input from '../../global/components/Input';
import SubmitButton from '../../global/components/SubmitButton';
import Form from '../../global/components/Form';

const EditSheetForm = (props) => {
  let { handleSubmit, handleDetailChange, handleTitleChange } = props;
  let { title, details } = props;
  let styleHeading = { "marginLeft": "4%" };
  
  return (
    <div className="EditSheet">
      <h1 style={styleHeading}> Edit : {title} </h1>
      <Form className="form-horizontal" onSubmit={handleSubmit}>
        <Input value={title} onChange={handleTitleChange} usage="Title" />
        <Input value={details} onChange={handleDetailChange} usage="Details"/>
        <SubmitButton />
      </Form>
    </div>
  )
}

export default EditSheetForm;