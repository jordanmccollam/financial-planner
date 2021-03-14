---
to: client/src/screens/<%= name %>/<%= name %>.js
unless_exists: true
---
import React, { useState, useEffect } from "react";
import { Card } from '../../components';

const logger = "<%= name %>:: ";

const <%= name %> = (props) => {

  return (
    <div className="<%= h.changeCase.paramCase(name) %>">
    
    </div>
  )
}

export default <%= name %>;


