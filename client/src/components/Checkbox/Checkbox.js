import React, { useState, useEffect } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import { BsCheckBox, BsSquare, BsDashSquare } from 'react-icons/bs';

const logger = "Checkbox:: ";

const defaultSize = 13;

const Checkbox = (props) => {
  const { className, size, checked, onCheck } = props;

  return (
    checked ? (
      <BsCheckBox onClick={onCheck} size={size ? size + 2 : defaultSize + 2} className={`${className} checkbox`} />
    ) : (
      <BsSquare onClick={onCheck} size={size ? size : defaultSize} className={`${className} checkbox`} />
    )
  )
}

export default Checkbox;


