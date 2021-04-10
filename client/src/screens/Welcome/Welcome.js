import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import classnames from "classnames"
import { Container, Row, Col } from 'react-bootstrap'
import { Card, Icon, Logo, Button } from '../../components';

import './_welcome.scss';

const logger = "Welcome:: ";

const Welcome = (props) => {
  let classes = {
		[`welcome`]: true
	};

  return (
    <Row className={`${props.className} ${classnames(classes)}`}>
      <Col lg={4}>
        <Card className="py-2" >
          <>
            <Logo className="center" />
            <div className="border-bottom" />

            <div className="px-5 my-4">
              <Button full onClick={props.signIn} ><>Sign In <Icon icon="AiOutlineLogin" size={30} className="ml-1" /></></Button>
            </div>
          </>
        </Card>
      </Col>
    </Row>
  )
}

Welcome.propTypes = {
  className: PropTypes.string,
  signIn: PropTypes.func
}

Welcome.defaultProps = {
  className: "",
  signIn: () => console.log(logger + 'signIn')
}

export default Welcome;


