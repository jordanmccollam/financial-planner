import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Row, Col } from 'react-bootstrap';
import { Tooltip } from 'react-lightweight-tooltip';

import './_tooltip.scss';

const logger = "Tooltip:: ";

const CustomTooltip = (props) => {
  let classes = {
		[`tooltip`]: true,
    [`tooltip-${props.position}`]: true
	};

  const tooltipStyles = {
    content: {
      backgroundColor: 'transparent',
      color: '#FFF',
    },
    tooltip: {
      backgroundColor: props.color,
      borderRadius: '5px',
      minWidth: 'max-content',
      bottom: props.position === 'top' ? '100%' : '-200%'
    },
    arrow: {
      bottom: props.position === 'top' ? '-5px' : '100%',
      borderTop: props.position === 'top' ? `solid ${props.color} 5px` : 'auto',
      borderBottom: props.position === 'bottom' ? `solid ${props.color} 5px` : 'auto',
    }
  }

  return (
    <Tooltip className={`${props.className} ${classnames(classes)}`} content={props.content} styles={tooltipStyles} >
      {props.children}
    </Tooltip>
  )
}

CustomTooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  className: PropTypes.string,
  content: PropTypes.string,
  color: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom'])
}

CustomTooltip.defaultProps = {
  className: "",
  content: 'Tooltip',
  children: <>Hover over me</>,
  color: '#25387fd3',
  position: 'top'
}

export default CustomTooltip;


