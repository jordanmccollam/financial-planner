import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const logger = "DatePicker:: ";

const CustomDatePicker = (props) => {
  const { className, date, onChange } = props;

  return (
    <DatePicker selected={date} onChange={onChange} className={`${className} date-picker`} />
  )
}

export default CustomDatePicker;


