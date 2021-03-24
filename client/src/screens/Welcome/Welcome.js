import React, { useState, useEffect } from "react";
import { Card } from '../../components';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { AiOutlineLogin } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';

const logger = "Welcome:: ";

const Welcome = (props) => {
  const { signIn } = props;

  return (
    <Container fluid className="welcome">
      <Row className="full justify-content-center align-items-center">
          <Col md={5}>
              <Card>
                  <div className="text-center border-bottom border-primary">
                      <h3>Financial Planner <GiTakeMyMoney /></h3>
                  </div>

                  <div className="mt-3 mx-lg-5">
                      <Button onClick={signIn} block variant="primary" >Sign In <AiOutlineLogin size={25} /></Button>
                  </div>
              </Card>
          </Col>
      </Row>
    </Container>
  )
}

export default Welcome;


