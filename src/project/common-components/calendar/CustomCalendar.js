import React, { useState, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

import CustomCalendarHeader from './CustomCalendarHeader';
import CalendarInput from './CalendarInput';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomCalendar.css';
import styled from "styled-components";

import ko from 'date-fns/locale/ko';
registerLocale('ko', ko);

// const StartDatePickerInput = styled(CustomInput)`
//     height: 30px;
//     width: 110px;
//     border: 1px solid ${defaultStyle.backgroundColor1};
//     border-radius: 0;
//     border-right-style: none;

//     border-top-left-radius: 4px;
//     border-bottom-left-radius: 4px;

//     // blur
//     position: relative;
//     z-index: 10;
// `;

const Container = styled.div`
  display: flex;
`;

function CustomCalendar({
  customInput = null,
  defaultDate,
  onDateChange,
  icon = null,
}) {
  const dateObj = new Date(defaultDate);
  const ref = useRef();
  const open = useRef(false);
  const onInputClick = () => {
    if (open.current) {
      ref.current.setOpen(false);
    } else {
      ref.current.setOpen(open);
    }
    open.current = !open.current;
  };
  const onClickOutside = () => {
    open.current = false;
  };

  return (
    <Container>
      <DatePicker
        ref={ref}
        locale="ko"
        selected={dateObj}
        dateFormat="yyyy-MM-dd"
        // showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        // shouldCloseOnSelect={false}
        //onSelect={this.handleSelect} //when day is clicked
        onChange={(date) => onDateChange(date)} //only when value has changed
        customInput={
          customInput ? (
            <CalendarInput customInput={customInput} ic={icon} />
          ) : null
        }
        renderCustomHeader={CustomCalendarHeader}
        // onInputClick={onInputClick}
        onClickOutside={onClickOutside}
        // readOnly={true}
      ></DatePicker>
    </Container>
  );
}

export default CustomCalendar;
