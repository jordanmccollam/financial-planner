import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Card } from '../../components';

const logger = "CreateSheet:: ";

const CreateSheet = (props) => {

  return (
    <div className="create-sheet">
      <Row className="justify-content-center align-items-center pt-4">
        <Col lg={6}>
          <Card>
            <h5 className="title">Step 1: Name your first sheet.</h5>
            <Form.Control placeholder="My First Sheet" className="mt-2" />
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center pt-4">
        <Col lg={6}>
          <Card className="py-5">
            <Row className="align-items-center justify-content-center">
              <Col sm={7} lg={8} className="d-flex flex-column text-center align-items-center">
                <h4 className="title">Easy!</h4>
                <p>Now we'll show you your sheet and how you can add your first expense to start seeing some helpful numbers.</p>
                <Button>Sounds good!</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CreateSheet;


