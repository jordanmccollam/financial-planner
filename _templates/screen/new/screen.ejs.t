---
to: client/src/screens/<%= name %>/<%= name %>.js
unless_exists: true
---
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import { Card } from '../../components';

import './_<%= h.changeCase.paramCase(name) %>.scss';

const logger = "<%= name %>:: ";

const <%= name %> = (props) => {
  let classes = {
		[`<%= h.changeCase.paramCase(name) %>`]: true
	};

  return (
    <div className={`${props.className} ${classnames(classes)}`}>
    
    </div>
  )
}

<%= name %>.propTypes = {
  className: PropTypes.string
}

<%= name %>.defaultProps = {
  className: ""
}

export default <%= name %>;


