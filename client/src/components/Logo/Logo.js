import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { Icon } from '../index'

import './_logo.scss';

const logger = "Logo:: ";

const Logo = (props) => {
  let classes = {
		[`logo`]: true,
    [`logo-${props.size}`]: true
	};

  return (
    <div className={`${props.className}`}>
      <h1 className={`${classnames(classes)}`}>
        Bills n'
        <div className="logo-group-container">
          <div className="logo-group">
            <Icon icon="FaFileInvoiceDollar" size={props.size === 'sm' ? 40 : 55} className="logo-group-icon" />
            <div className="logo-group-overlay">heet</div>
          </div>
        </div>
      </h1>
    </div>
  )
}

Logo.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md'])
}

Logo.defaultProps = {
  className: "",
  size: 'md'
}

export default Logo;


