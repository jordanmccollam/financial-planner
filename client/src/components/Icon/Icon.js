import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import * as Icons from './IconExports';

import './_icon.scss';

const logger = "Icon:: ";

const Icon = (props) => {
  const DynamicIcon = Icons[props.icon]
  let classes = {
		[`icon`]: true
	};

  return (
    <DynamicIcon className={`${props.className} ${classnames(classes)}`} size={props.size} style={{color: props.color}} />
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  icon: PropTypes.string,
  color: PropTypes.string
}

Icon.defaultProps = {
  className: "",
  size: null,
  icon: 'GiTakeMyMoney',
  color: 'inherit'
}

export default Icon;


