---
to: client/src/components/<%= name %>/<%= name %>.js
unless_exists: true
---
import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';

const logger = "<%= name %>:: ";

const <%= name %> = (props) => {
  const { children, className } = props;

  return (
    <div className={`${className} <%= h.changeCase.paramCase(name) %>`}>
    
      {children}
    </div>
  )
}

export default <%= name %>;


