import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { Icon } from '../index';

import './_checkbox.scss';

const logger = "Checkbox:: ";

const Checkbox = (props) => {
  let classes = {
		[`checkbox`]: true
	};

  return (
    <div className={`${props.className} ${classnames(classes)}`} onClick={props.onCheck}>
      {props.checked ? (
        <Icon icon="BsCheckBox" size={props.size + 2} />
      ) : (
        <Icon icon="BsSquare" size={props.size} />
      )}
    </div>
  )
}

Checkbox.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  onCheck: PropTypes.func,
  checked: PropTypes.bool
}

Checkbox.defaultProps = {
  className: "",
  size: 13,
  onCheck: () => console.log(logger + 'onCheck'),
  checked: false
}

export default Checkbox;


