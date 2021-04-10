import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';

import './_button.scss';

const logger = "Button:: ";

const Button = (props) => {
  let classes = {
		[`button`]: true,
    [`button-full`]: props.full,
    [`button-${props.kind}`]: true
	};

  return (
    <div onClick={props.onClick} className={`${props.className} ${classnames(classes)}`}>
    
      {props.children}
    </div>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  className: PropTypes.string,
  full: PropTypes.bool,
  onClick: PropTypes.func,
  kind: PropTypes.oneOf(['default', 'ghost'])
}

Button.defaultProps = {
  className: "",
  children: "Default Button",
  full: false,
  onClick: () => console.log(logger + 'onClick'),
  kind: 'default'
}

export default Button;


