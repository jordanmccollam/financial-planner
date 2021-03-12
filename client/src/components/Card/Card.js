import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';

const logger = "Card";

const Card = (props) => {
  const { children, className } = props;

  return (
    <div className={`${className} card`}>
    
      {children}
    </div>
  )
}

export default Card;


