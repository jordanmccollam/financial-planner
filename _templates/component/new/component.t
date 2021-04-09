---
to: client/src/components/<%= name %>/<%= name %>.js
unless_exists: true
---
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';

import './_<%= h.changeCase.paramCase(name) %>.scss';

const logger = "<%= name %>:: ";

const <%= name %> = (props) => {
  let classes = {
		[`<%= h.changeCase.paramCase(name) %>`]: true
	};

  return (
    <div className={`${props.className} ${classnames(classes)}`}>
    
      {props.children}
    </div>
  )
}

<%= name %>.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  className: PropTypes.string
}

<%= name %>.defaultProps = {
  className: ""
}

export default <%= name %>;


