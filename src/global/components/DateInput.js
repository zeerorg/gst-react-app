import React from 'react';
import Input from '../../global/components/Input';

/*global $*/
/*eslint no-undef: "error"*/

export default class DateInput extends React.Component {

    render() {
      console.log(this.props);
      return (
        <Input 
          usage="Date"
          name="date"
          extraClasses="datepicker"
        />
        );
    }

    componentDidMount() {
      let { onChange, value } = this.props;
      $(".datepicker").datepicker({
        onSelect: function(dateText) {
          onChange(this.value);
        },
        dateFormat: 'dd/mm/yy'
      });
      $(".datepicker").datepicker("setDate", value);
    }
}