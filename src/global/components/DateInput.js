import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default class DateInput extends React.Component {
    render() {
      return <DatePicker
          selected={this.props.value}
          onChange={this.props.onChange}
      />;
    }
}