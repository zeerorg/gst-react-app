import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default class DateInput extends React.Component {
    render() {
      return (
        <div className="DatePicker" style={{paddingLeft: "300px"}}>
        <span>
            Date: 
        <DatePicker
          selected={this.props.value}
          onChange={this.props.onChange}
        />
        </span>
        </div>
        );
    }
}