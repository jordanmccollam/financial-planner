import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import { Card } from '../../components';

import './_welcome.scss';

const logger = "Welcome:: ";

const Welcome = (props) => {
  let classes = {
		[`welcome`]: true
	};

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={4}>
        <Card >
          <>
            <h1 className="text-center">Financial Planner</h1>
            
          </>
        </Card>
      </Col>
    </Row>
  )
}

Welcome.propTypes = {
  className: PropTypes.string
}

Welcome.defaultProps = {
  className: ""
}

export default Welcome;


