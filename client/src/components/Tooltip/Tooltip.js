import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';

const logger = "TooltipBtn";

const CustomTooltip = (props) => {
  const { children, className, id, type, message, place } = props;

  return (
    <div>
      <div className={`${className} custom-tooltip`} data-tip data-for={id} data-place={place ? place : 'top'}>
        {children}
      </div>
      <ReactTooltip id={id} type={type} effect="solid" backgroundColor="#f8f9fa">
        <span>{message}</span>
      </ReactTooltip>
    </div>
  )
}

export default CustomTooltip;


